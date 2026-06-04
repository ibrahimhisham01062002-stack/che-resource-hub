import os
import json
import shutil
import asyncio
from typing import Optional, List
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, BackgroundTasks, Response, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv
from fastapi.concurrency import run_in_threadpool
import io
from google.oauth2 import service_account
from googleapiclient.discovery import build
from googleapiclient.http import MediaIoBaseUpload, MediaIoBaseDownload


load_dotenv()

import pypdf

HF_TOKEN = os.getenv("HF_TOKEN")
HF_API_URL = "https://router.huggingface.co/v1/chat/completions"

def extract_text_from_pdf(pdf_bytes: bytes, max_chars: int = 40000) -> str:
    pdf_file = io.BytesIO(pdf_bytes)
    reader = pypdf.PdfReader(pdf_file)
    extracted_text = []
    total_chars = 0
    
    for page in reader.pages:
        text = page.extract_text() or ""
        extracted_text.append(text)
        total_chars += len(text)
        if total_chars >= max_chars:
            break
            
    return "\n".join(extracted_text)[:max_chars]

async def query_qwen_summary(text: str, filename: str) -> str:
    if not HF_TOKEN:
        raise HTTPException(status_code=500, detail="Hugging Face API token (HF_TOKEN) is not configured in environment variables")
        
    headers = {
        "Authorization": f"Bearer {HF_TOKEN}",
        "Content-Type": "application/json"
    }
    
    prompt = (
        f"You are an expert tutor for Chemical Engineering students.\n"
        f"Provide a highly descriptive, detailed, and structured study summary "
        f"of the following textbook/document named '{filename}'.\n\n"
        f"CRITICAL FORMATTING REQUIREMENT FOR MATHEMATICAL FORMULAS:\n"
        f"- For all equations, variables, physical notations, and constants, you MUST use standard LaTeX delimiters for MathJax to render them correctly on the website.\n"
        f"- Use '$$ ... $$' or '\\[ ... \\]' for separate block equations (display equations).\n"
        f"- Use '$ ... $' or '\\( ... \\)' for inline variables, inline equations, or physical constants (e.g. $K_s$ or $\\mu$). Never output un-delimited LaTeX commands like \\mu or \\frac, and never use brackets like [\\mu] or (\\mu) without dollar signs.\n\n"
        f"Structure your response strictly with the following 4 sections in beautiful GitHub Markdown:\n\n"
        f"### 1. Topic-by-Topic Outline & Summary\n"
        f"Walk through the document content chronologically, summarizing the topics from section to section.\n\n"
        f"### 2. Key Concepts & Explanations\n"
        f"Identify and define the fundamental chemical engineering concepts, theories, and processes presented.\n\n"
        f"### 3. Formulas & Notations Dictated\n"
        f"Provide a descriptive analysis of all key mathematical equations, variables, and physical notations. Explain what every variable stands for and its physical significance.\n\n"
        f"### 4. Comparative Analysis Table\n"
        f"Create a markdown table comparing/contrasting the different methods, methodologies, reactors, processes, or theories analyzed in the text (including assumptions, parameters, advantages, and limitations).\n\n"
        f"Content:\n{text}"
    )
    
    payload = {
        "model": "Qwen/Qwen2.5-72B-Instruct",
        "messages": [
            {"role": "user", "content": prompt}
        ],
        "temperature": 0.3,
        "max_tokens": 2000
    }
    
    resp = await http_client.post(HF_API_URL, headers=headers, json=payload, timeout=120.0)
    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Hugging Face API Error: {resp.text}")
        
    result = resp.json()
    return result["choices"][0]["message"]["content"]

# Google Drive service initializer
def get_gdrive_service():
    project_id = os.getenv("GDRIVE_PROJECT_ID")
    private_key_id = os.getenv("GDRIVE_PRIVATE_KEY_ID")
    private_key = os.getenv("GDRIVE_PRIVATE_KEY")
    client_email = os.getenv("GDRIVE_CLIENT_EMAIL")
    
    if not (project_id and private_key_id and private_key and client_email):
        return None
        
    # Standardize the private key by replacing escaped newlines
    private_key = private_key.replace("\\n", "\n")
    
    info = {
        "type": "service_account",
        "project_id": project_id,
        "private_key_id": private_key_id,
        "private_key": private_key,
        "client_email": client_email,
        "token_uri": "https://oauth2.googleapis.com/token",
    }
    
    creds = service_account.Credentials.from_service_account_info(
        info, 
        scopes=["https://www.googleapis.com/auth/drive"]
    )
    return build("drive", "v3", credentials=creds)

def sync_upload_to_gdrive(file_bytes: bytes, filename: str) -> str:
    service = get_gdrive_service()
    if not service:
        raise ValueError("Google Drive credentials are not configured in environment variables.")
        
    folder_id = os.getenv("GDRIVE_FOLDER_ID")
    if not folder_id:
        raise ValueError("Google Drive Folder ID (GDRIVE_FOLDER_ID) is not configured.")
        
    file_metadata = {
        "name": filename,
        "parents": [folder_id]
    }
    
    media = MediaIoBaseUpload(
        io.BytesIO(file_bytes),
        mimetype="application/octet-stream",
        resumable=True
    )
    
    file = service.files().create(
        body=file_metadata,
        media_body=media,
        fields="id"
    ).execute()
    
    return file.get("id")

async def upload_file_to_gdrive(file_bytes: bytes, filename: str) -> str:
    return await run_in_threadpool(sync_upload_to_gdrive, file_bytes, filename)

def sync_delete_from_gdrive(file_id: str):
    service = get_gdrive_service()
    if not service:
        return
    try:
        service.files().delete(fileId=file_id).execute()
    except Exception as e:
        print(f"Failed to delete file {file_id} from Google Drive: {str(e)}")

async def delete_from_gdrive(file_id: str):
    await run_in_threadpool(sync_delete_from_gdrive, file_id)

async def stream_gdrive_file(file_id: str):
    service = await run_in_threadpool(get_gdrive_service)
    if not service:
        raise ValueError("Google Drive credentials are not configured.")
    
    request = service.files().get_media(fileId=file_id)
    file_io = io.BytesIO()
    downloader = MediaIoBaseDownload(file_io, request, chunksize=1024*1024)
    done = False
    last_position = 0
    
    while not done:
        status, done = await run_in_threadpool(downloader.next_chunk)
        current_position = file_io.tell()
        file_io.seek(last_position)
        chunk = file_io.read(current_position - last_position)
        file_io.seek(current_position)
        last_position = current_position
        yield chunk


http_client = None

import threading
file_lock = threading.Lock()

async def safe_telegram_request(method: str, url: str, **kwargs) -> httpx.Response:
    global http_client
    if http_client is None:
        limits = httpx.Limits(max_keepalive_connections=50, max_connections=100, keepalive_expiry=30.0)
        http_client = httpx.AsyncClient(limits=limits, timeout=120.0)
        
    max_retries = 5
    backoff = 1.0
    for attempt in range(max_retries):
        try:
            resp = await http_client.request(method, url, **kwargs)
            if resp.status_code == 429:
                try:
                    res = resp.json()
                    retry_after = res.get("parameters", {}).get("retry_after", 3)
                except Exception:
                    retry_after = 3
                print(f"Telegram rate limit hit (429) on attempt {attempt+1}. Sleeping {retry_after}s...")
                await asyncio.sleep(retry_after)
                continue
                
            if resp.status_code == 200:
                try:
                    res = resp.json()
                    if not res.get("ok") and res.get("error_code") == 429:
                        retry_after = res.get("parameters", {}).get("retry_after", 3)
                        print(f"Telegram API 429 inside JSON response on attempt {attempt+1}. Sleeping {retry_after}s...")
                        await asyncio.sleep(retry_after)
                        continue
                except Exception:
                    pass
            return resp
        except (httpx.ConnectError, httpx.TimeoutException, httpx.RequestError) as exc:
            if attempt == max_retries - 1:
                raise exc
            sleep_time = backoff * (2 ** attempt)
            print(f"Telegram connection/network issue ({type(exc).__name__}) on attempt {attempt+1}. Retrying in {sleep_time}s...")
            await asyncio.sleep(sleep_time)
            
    return await http_client.request(method, url, **kwargs)

app = FastAPI(title="Chemical Engineering Study Resource Hub API")

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
async def startup_event():
    global http_client
    limits = httpx.Limits(max_keepalive_connections=50, max_connections=100, keepalive_expiry=30.0)
    http_client = httpx.AsyncClient(limits=limits, timeout=120.0)
    # Run the database restoration in the background to avoid blocking server boot-up
    asyncio.create_task(async_sync_database_from_telegram())


# Root workspace directory
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(WORKSPACE_DIR, "backend", "data")
COURSES_CONF_PATH = os.path.join(WORKSPACE_DIR, "backend", "courses.json")

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Helper to load course config
def load_courses_config():
    with file_lock:
        if not os.path.exists(COURSES_CONF_PATH):
            raise HTTPException(status_code=500, detail="courses.json configuration missing")
        with open(COURSES_CONF_PATH, "r", encoding="utf-8") as f:
            return json.load(f)

db_backup_lock = asyncio.Lock()
db_backup_pending = False

async def async_sync_database_to_telegram():
    global db_backup_pending
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHANNEL_ID:
        print("Telegram not configured. Skipping database cloud backup.")
        return
        
    if db_backup_lock.locked():
        db_backup_pending = True
        print("Database backup already in progress. Queueing next sync...")
        return
        
    async with db_backup_lock:
        try:
            print("Starting background database backup to Telegram channel...")
            if not os.path.exists(COURSES_CONF_PATH):
                print("courses.json does not exist. Cannot back up.")
                return
                
            with file_lock:
                with open(COURSES_CONF_PATH, "rb") as f:
                    file_content = f.read()
                
            # 1. Upload the courses.json as a new document
            url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument"
            files = {
                "document": ("courses.json", file_content)
            }
            data = {
                "chat_id": TELEGRAM_CHANNEL_ID
            }
            resp = await safe_telegram_request("POST", url, data=data, files=files)
            if resp.status_code != 200:
                print(f"Database upload to Telegram failed: {resp.text}")
                return
            res = resp.json()
            if not res.get("ok"):
                print(f"Telegram returned error on database upload: {res.get('description')}")
                return
                
            message_id = res["result"]["message_id"]
            
            # 2. Pin the new courses.json document message
            pin_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/pinChatMessage"
            pin_data = {
                "chat_id": TELEGRAM_CHANNEL_ID,
                "message_id": message_id,
                "disable_notification": True
            }
            pin_resp = await safe_telegram_request("POST", pin_url, json=pin_data)
            if pin_resp.status_code == 200 and pin_resp.json().get("ok"):
                print(f"Successfully uploaded and pinned new database (message_id: {message_id}) on Telegram channel!")
            else:
                print(f"Failed to pin the new database message: {pin_resp.text}")
        except Exception as e:
            print(f"Error during background database cloud sync to Telegram: {str(e) or repr(e)}")
        finally:
            # If another backup was requested while the lock was held, execute it now
            if db_backup_pending:
                db_backup_pending = False
                asyncio.create_task(async_sync_database_to_telegram())

async def async_sync_database_from_telegram():
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHANNEL_ID:
        print("Telegram not configured. Skipping startup database sync.")
        return
    try:
        print("Fetching channel info to find pinned database...")
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getChat?chat_id={TELEGRAM_CHANNEL_ID}"
        resp = await safe_telegram_request("GET", url)
        if resp.status_code != 200:
            print(f"Failed to get channel info: {resp.text}")
            return
        chat_data = resp.json()
        if not chat_data.get("ok"):
            print(f"Telegram API returned error for getChat: {chat_data.get('description')}")
            return
        
        pinned = chat_data["result"].get("pinned_message")
        if not pinned:
            print("No pinned database message found in channel. We will create one on the first save.")
            return
            
        doc = pinned.get("document")
        if not doc or doc.get("file_name") != "courses.json":
            print("Pinned message is not courses.json. Skipping sync.")
            return
            
        file_id = doc["file_id"]
        print(f"Found pinned database file_id: {file_id}. Downloading...")
        
        get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={file_id}"
        file_resp = await safe_telegram_request("GET", get_file_url)
        if file_resp.status_code != 200:
            print("Failed to get file details from Telegram.")
            return
        file_result = file_resp.json()
        if not file_result.get("ok"):
            print("Telegram getFile returned error.")
            return
            
        file_path = file_result["result"]["file_path"]
        download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        db_resp = await safe_telegram_request("GET", download_url)
        if db_resp.status_code == 200:
            try:
                json_data = db_resp.json()
                if "courses" in json_data:
                    with file_lock:
                        with open(COURSES_CONF_PATH, "w", encoding="utf-8") as f:
                            json.dump(json_data, f, indent=2, ensure_ascii=False)
                    print("Successfully restored courses.json database from Telegram pinned message!")
                else:
                    print("Downloaded database JSON is missing 'courses' root key. Skipping write.")
            except Exception as e:
                print(f"Downloaded database is not valid JSON: {str(e) or repr(e)}")
        else:
            print(f"Failed to download courses.json from Telegram: {db_resp.status_code}")
    except Exception as e:
        print(f"Error during startup database restore from Telegram: {str(e) or repr(e)}")

def save_courses_config(config):
    with file_lock:
        with open(COURSES_CONF_PATH, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2, ensure_ascii=False)
    # Queue the background cloud backup
    try:
        loop = asyncio.get_running_loop()
        if loop.is_running():
            loop.create_task(async_sync_database_to_telegram())
    except RuntimeError:
        pass


def find_course_key(course_id: str, courses: dict) -> Optional[str]:
    if not course_id:
        return None
    # 1. Exact match
    if course_id in courses:
        return course_id
    # 2. Case-insensitive normalized match
    norm_id = course_id.lower().replace(" ", "-").strip()
    for key in courses.keys():
        if key.lower().replace(" ", "-").strip() == norm_id:
            return key
    return None


# Helper to format file sizes
def format_size(bytes_size: int) -> str:
    if bytes_size >= 1024 * 1024:
        return f"{bytes_size / (1024 * 1024):.2f} MB"
    elif bytes_size >= 1024:
        return f"{bytes_size / 1024:.2f} KB"
    return f"{bytes_size} B"

# Helper to get file type based on extension
def get_file_type(filename: str) -> str:
    ext = os.path.splitext(filename)[1].lower()
    if ext == ".pdf":
        return "PDF"
    elif ext in [".hsc", ".bk0"]:
        return "HYSYS Simulation"
    elif ext in [".docx", ".doc"]:
        return "Word Document"
    elif ext in [".xlsx", ".xls"]:
        return "Excel Spreadsheet"
    elif ext in [".m", ".mat"]:
        return "MATLAB Script"
    elif ext in [".pptx", ".ppt"]:
        return "Powerpoint Presentation"
    return "Document / Asset"

# Scan files in a course directory
def scan_course_files(folder_name: str) -> List[dict]:
    course_path = os.path.join(WORKSPACE_DIR, folder_name)
    if not os.path.exists(course_path):
        return []
    
    scanned_files = []
    # Search files recursively, excluding hidden files/dirs
    for root, dirs, files in os.walk(course_path):
        # Skip hidden directories like .git or .gemini
        dirs[:] = [d for d in dirs if not d.startswith('.')]
        for file in files:
            if file.startswith('.'):
                continue
            full_path = os.path.join(root, file)
            rel_path = os.path.relpath(full_path, course_path).replace("\\", "/")
            stat = os.stat(full_path)
            
            scanned_files.append({
                "name": file,
                "path": rel_path,
                "size": format_size(stat.st_size),
                "bytes": stat.st_size,
                "type": get_file_type(file)
            })
    
    # Sort files alphabetically
    scanned_files.sort(key=lambda x: x["path"])
    return scanned_files

# Models
class NoteUpdate(BaseModel):
    notes: str

class LogItem(BaseModel):
    id: Optional[str] = None
    lecture: str
    date: str
    topics: str
    formulas: str

class LinkItem(BaseModel):
    id: Optional[str] = None
    title: str
    url: str
    category: str

class FolderCreate(BaseModel):
    name: str

class FolderRename(BaseModel):
    new_name: str

class CourseUpdate(BaseModel):
    code: str
    title: str
    description: str

# API ENDPOINTS

@app.get("/api/health")
@app.head("/api/health")
def health_check():
    return {"status": "healthy"}

@app.get("/api/courses")
def get_courses(response: Response):
    response.headers["Cache-Control"] = "public, max-age=300"
    config = load_courses_config()
    courses_data = []
    for key, course in config["courses"].items():
        files = course.get("files", [])
        courses_data.append({
            "id": course["id"],
            "code": course["code"],
            "title": course["title"],
            "description": course["description"],
            "folder": course["folder"],
            "level": course.get("level", ""),
            "term": course.get("term", ""),
            "syllabus": course.get("syllabus", []),
            "fileCount": len(files),
            "files": files,
            "folders": course.get("folders", ["Root"]),
            "video_folders": course.get("video_folders", ["Root"])
        })
    return courses_data

@app.get("/api/courses/{course_id}/notes")
def get_notes(course_id: str):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
    
    course = config["courses"][course_id]
    notes = course.get("notes")
    if notes is None:
        notes = course.get("default_notes", "# " + course["title"] + "\n\nStart writing notes...")
    return {"notes": notes}

@app.post("/api/courses/{course_id}/notes")
def save_notes(course_id: str, note_data: NoteUpdate):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
    
    config["courses"][course_id]["notes"] = note_data.notes
    save_courses_config(config)
    return {"status": "success", "message": "Notes saved successfully"}

@app.get("/api/courses/{course_id}/logs")
def get_logs(course_id: str):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
    
    course = config["courses"][course_id]
    logs = course.get("logs")
    if logs is None:
        logs = course.get("default_logs", [])
    return logs

@app.post("/api/courses/{course_id}/logs")
def add_log(course_id: str, item: LogItem):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
    
    course = config["courses"][course_id]
    if "logs" not in course:
        course["logs"] = list(course.get("default_logs", []))
        
    # Generate unique ID
    import uuid
    new_log = item.dict()
    new_log["id"] = f"log-{uuid.uuid4().hex[:8]}"
    course["logs"].append(new_log)
    
    # Sort logs by date (chronologically)
    course["logs"].sort(key=lambda x: x.get("date", ""))
    
    save_courses_config(config)
    return course["logs"]

@app.get("/api/courses/{course_id}/links")
def get_links(course_id: str):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
    
    course = config["courses"][course_id]
    links = course.get("links")
    if links is None:
        links = course.get("default_links", [])
    return links

@app.post("/api/courses/{course_id}/links")
def add_link(course_id: str, item: LinkItem):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
    
    course = config["courses"][course_id]
    if "links" not in course:
        course["links"] = list(course.get("default_links", []))
        
    import uuid
    new_link = item.dict()
    new_link["id"] = f"link-{uuid.uuid4().hex[:8]}"
    course["links"].append(new_link)
    
    save_courses_config(config)
    return course["links"]

@app.delete("/api/courses/{course_id}/links/{link_id}")
def delete_link(course_id: str, link_id: str):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
    
    course = config["courses"][course_id]
    if "links" not in course:
        course["links"] = list(course.get("default_links", []))
        
    course["links"] = [link for link in course["links"] if link.get("id") != link_id]
    
    save_courses_config(config)
    return course["links"]


# Stream files securely from the course folder
@app.get("/api/files/{course_id}/{filepath:path}")
def get_file(course_id: str, filepath: str):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    course_base = os.path.join(WORKSPACE_DIR, course["folder"])
    
    # Safe path checking to prevent directory traversal attacks
    absolute_filepath = os.path.abspath(os.path.join(course_base, filepath))
    if not absolute_filepath.startswith(os.path.abspath(course_base)):
        raise HTTPException(status_code=403, detail="Access denied")
        
    if not os.path.exists(absolute_filepath) or os.path.isdir(absolute_filepath):
        raise HTTPException(status_code=404, detail="File not found")
        
    return FileResponse(absolute_filepath)



TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
if TELEGRAM_BOT_TOKEN:
    TELEGRAM_BOT_TOKEN = TELEGRAM_BOT_TOKEN.strip().replace('"', '').replace("'", "")
    if TELEGRAM_BOT_TOKEN.lower().startswith("bot"):
        TELEGRAM_BOT_TOKEN = TELEGRAM_BOT_TOKEN[3:]

TELEGRAM_CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID")
if TELEGRAM_CHANNEL_ID:
    TELEGRAM_CHANNEL_ID = TELEGRAM_CHANNEL_ID.strip().replace('"', '').replace("'", "")
    # Fail-safe auto-correction for duplicate '100' prefix typo
    if TELEGRAM_CHANNEL_ID.startswith("-100100") and len(TELEGRAM_CHANNEL_ID) > 13:
        if TELEGRAM_CHANNEL_ID == "-1001003934336659":
            TELEGRAM_CHANNEL_ID = "-1003934336659"
        else:
            TELEGRAM_CHANNEL_ID = "-100" + TELEGRAM_CHANNEL_ID[7:]


async def get_file_id_from_message_id(message_id: int) -> str:
    # Forward message to the channel itself (creates a temporary duplicate post)
    forward_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/forwardMessage"
    payload = {
        "chat_id": TELEGRAM_CHANNEL_ID,
        "from_chat_id": TELEGRAM_CHANNEL_ID,
        "message_id": message_id
    }
    resp = await safe_telegram_request("POST", forward_url, json=payload)
    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Telegram forward failed: {resp.text}")
    
    msg_data = resp.json()["result"]
    new_msg_id = msg_data["message_id"]
    
    # Extract file_id from different message attachment types
    file_id = None
    if "document" in msg_data:
        file_id = msg_data["document"]["file_id"]
    elif "photo" in msg_data:
        file_id = msg_data["photo"][-1]["file_id"]
    elif "video" in msg_data:
        file_id = msg_data["video"]["file_id"]
    elif "audio" in msg_data:
        file_id = msg_data["audio"]["file_id"]
        
    # Delete the temporary duplicate message immediately to keep the channel clean
    delete_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/deleteMessage"
    await safe_telegram_request("POST", delete_url, json={
        "chat_id": TELEGRAM_CHANNEL_ID,
        "message_id": new_msg_id
    })
    
    if not file_id:
        raise HTTPException(status_code=400, detail="No downloadable file or document found in the Telegram message")
        
    return file_id

@app.get("/api/download/{course_id}/{file_index}")
async def download_file(course_id: str, file_index: int, request: Request, preview: Optional[bool] = None):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    files = course.get("files", [])
    if file_index < 0 or file_index >= len(files):
        raise HTTPException(status_code=404, detail="File not found in course list")
        
    file_item = files[file_index]
    file_name = file_item["name"]
    
    storage_type = file_item.get("storage_type")
    gdrive_file_id = file_item.get("gdrive_file_id")
    file_id = file_item.get("telegram_file_id")
    file_ids = file_item.get("telegram_file_ids")
    message_id = file_item.get("telegram_message_id")
    
    # Determine disposition: inline for active previewer iframe, attachment for direct download click
    disposition_type = "inline" if preview else "attachment"
    
    # 1. Determine storage type if not explicitly set
    if not storage_type:
        if file_ids:
            storage_type = "telegram_chunks"
        elif gdrive_file_id:
            storage_type = "gdrive"
        elif file_id or message_id is not None:
            storage_type = "telegram"
        else:
            storage_type = "local"
            
    content_type = "application/octet-stream"
    if file_name.lower().endswith(".pdf"):
        content_type = "application/pdf"
    elif file_name.lower().endswith(".zip"):
        content_type = "application/zip"
    elif file_name.lower().endswith((".png", ".jpg", ".jpeg")):
        content_type = "image/png" if file_name.lower().endswith(".png") else "image/jpeg"
    elif file_name.lower().endswith((".mp4", ".m4v")):
        content_type = "video/mp4"
    elif file_name.lower().endswith(".webm"):
        content_type = "video/webm"
    elif file_name.lower().endswith(".ogg"):
        content_type = "video/ogg"
    elif file_name.lower().endswith(".mov"):
        content_type = "video/quicktime"
    elif file_name.lower().endswith(".avi"):
        content_type = "video/x-msvideo"
    elif file_name.lower().endswith(".mkv"):
        content_type = "video/x-matroska"
        
    range_header = request.headers.get("range")
        
    # Case A: Telegram Chunks Storage (Multi-part upload)
    if storage_type == "telegram_chunks" or file_ids:
        try:
            if not file_ids and file_id:
                file_ids = [file_id]
                
            raw_bytes = file_item.get("bytes")
            if not raw_bytes:
                # If total bytes is missing, sum up from getFile sizes of all chunks (rare/fallback)
                raw_bytes = 0
                for fid in file_ids:
                    get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={fid}"
                    resp = await safe_telegram_request("GET", get_file_url)
                    if resp.status_code == 200:
                        res_json = resp.json()
                        if res_json.get("ok"):
                            raw_bytes += res_json["result"].get("file_size", 0)
            
            # Check for range request
            if range_header and range_header.startswith("bytes="):
                # Parse Range header
                start = 0
                end = None
                parts = range_header.replace("bytes=", "").split("-")
                if len(parts) == 2:
                    if parts[0].strip():
                        start = int(parts[0].strip())
                    if parts[1].strip():
                        end = int(parts[1].strip())
                
                if end is None or end >= raw_bytes:
                    end = raw_bytes - 1
                
                headers = {
                    "Content-Range": f"bytes {start}-{end}/{raw_bytes}",
                    "Accept-Ranges": "bytes",
                    "Content-Length": str(end - start + 1),
                    "Content-Disposition": f'{disposition_type}; filename="{file_name}"',
                    "Content-Type": content_type,
                    "X-Frame-Options": "ALLOWALL",
                    "Content-Security-Policy": "frame-ancestors *"
                }
                return StreamingResponse(
                    stream_telegram_chunks_range(file_ids, start, end, raw_bytes, CHUNK_SIZE_LIMIT),
                    status_code=206,
                    media_type=content_type,
                    headers=headers
                )
            
            # Standard sequential download
            headers = {
                "Accept-Ranges": "bytes",
                "Content-Disposition": f'{disposition_type}; filename="{file_name}"',
                "Content-Type": content_type,
                "X-Frame-Options": "ALLOWALL",
                "Content-Security-Policy": "frame-ancestors *"
            }
            if raw_bytes:
                headers["Content-Length"] = str(raw_bytes)
                
            return StreamingResponse(
                stream_telegram_chunks(file_ids),
                media_type=content_type,
                headers=headers
            )
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"Telegram chunked streaming failed: {str(e)}")
            
    # Case B: Google Drive Storage
    if storage_type == "gdrive":
        try:
            headers = {
                "Content-Disposition": f'{disposition_type}; filename="{file_name}"',
                "Content-Type": content_type,
                "X-Frame-Options": "ALLOWALL",
                "Content-Security-Policy": "frame-ancestors *"
            }
            raw_bytes = file_item.get("bytes")
            if raw_bytes:
                headers["Content-Length"] = str(raw_bytes)
                
            return StreamingResponse(
                stream_gdrive_file(gdrive_file_id),
                media_type=content_type,
                headers=headers
            )
        except Exception as e:
            raise HTTPException(status_code=502, detail=f"Google Drive streaming failed: {str(e)}")
            
    # Case C: Local Storage Fallback
    if storage_type == "local" or (not file_id and message_id is None and not gdrive_file_id and not file_ids):
        course_base = os.path.join(WORKSPACE_DIR, course["folder"])
        absolute_filepath = os.path.abspath(os.path.join(course_base, file_name))
        
        if not absolute_filepath.startswith(os.path.abspath(course_base)):
            raise HTTPException(status_code=403, detail="Access denied")
            
        if os.path.exists(absolute_filepath) and not os.path.isdir(absolute_filepath):
            return FileResponse(
                absolute_filepath, 
                media_type=content_type,
                headers={
                    "Content-Disposition": f'{disposition_type}; filename="{file_name}"',
                    "X-Frame-Options": "ALLOWALL",
                    "Content-Security-Policy": "frame-ancestors *"
                }
            )
            
    # Case D: Single-file Telegram Storage
    try:
        if not file_id and message_id is not None:
            # Dynamically resolve file_id from message_id
            file_id = await get_file_id_from_message_id(int(message_id))
            
        if not file_id:
            raise HTTPException(status_code=400, detail="No Telegram file_id or message_id mapped")
            
        # Fetch file path from Telegram
        get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={file_id}"
        resp = await safe_telegram_request("GET", get_file_url)
        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail="Failed to retrieve file details from Telegram Bot API")
            
        result = resp.json()
        if not result.get("ok"):
            raise HTTPException(status_code=502, detail="Telegram Bot API returned an error")
            
        file_path = result["result"]["file_path"]
        telegram_file_size = result["result"].get("file_size")
        
        # Determine total size
        total_size = telegram_file_size
        if not total_size:
            total_size = file_item.get("bytes")
            
        # Securely stream the binary file back to the browser
        download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        
        # Check for range request
        if range_header and range_header.startswith("bytes=") and total_size:
            # Parse Range header
            start = 0
            end = None
            parts = range_header.replace("bytes=", "").split("-")
            if len(parts) == 2:
                if parts[0].strip():
                    start = int(parts[0].strip())
                if parts[1].strip():
                    end = int(parts[1].strip())
            
            if end is None or end >= total_size:
                end = total_size - 1
            
            async def stream_range_generator():
                tg_headers = {"Range": f"bytes={start}-{end}"}
                async with http_client.stream("GET", download_url, headers=tg_headers) as r:
                    if r.status_code not in (200, 206):
                        yield b"Error streaming range from Telegram servers"
                        return
                    async for chunk in r.aiter_bytes():
                        yield chunk
            
            headers = {
                "Content-Range": f"bytes {start}-{end}/{total_size}",
                "Accept-Ranges": "bytes",
                "Content-Length": str(end - start + 1),
                "Content-Disposition": f'{disposition_type}; filename="{file_name}"',
                "Content-Type": content_type,
                "X-Frame-Options": "ALLOWALL",
                "Content-Security-Policy": "frame-ancestors *"
            }
            return StreamingResponse(
                stream_range_generator(),
                status_code=206,
                media_type=content_type,
                headers=headers
            )
            
        # Standard sequential download
        async def stream_generator():
            async with http_client.stream("GET", download_url) as r:
                if r.status_code != 200:
                    yield b"Error streaming from Telegram servers"
                    return
                async for chunk in r.aiter_bytes():
                    yield chunk
                    
        headers = {
            "Accept-Ranges": "bytes",
            "Content-Disposition": f'{disposition_type}; filename="{file_name}"',
            "Content-Type": content_type,
            "X-Frame-Options": "ALLOWALL",
            "Content-Security-Policy": "frame-ancestors *"
        }
        # Provide Content-Length from Telegram Bot API response (100% accurate)
        if total_size:
            headers["Content-Length"] = str(total_size)
            
        return StreamingResponse(
            stream_generator(),
            media_type=content_type,
            headers=headers
        )
    except Exception as e:
        # Fallback to a beautiful HTML guidance page for placeholders or Telegram errors
        return HTMLResponse(
            content=f"""
            <!DOCTYPE html>
            <html>
                <head>
                    <meta charset="utf-8">
                    <title>Telegram Connection Notice</title>
                    <style>
                        body {{
                            background-color: #0b0f19;
                            color: #cbd5e1;
                            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            height: 90vh;
                            margin: 0;
                            padding: 20px;
                            box-sizing: border-box;
                        }}
                        .card {{
                            background: rgba(30, 41, 59, 0.4);
                            backdrop-filter: blur(12px);
                            -webkit-backdrop-filter: blur(12px);
                            border: 1px solid rgba(99, 102, 241, 0.2);
                            border-radius: 16px;
                            padding: 32px;
                            max-width: 480px;
                            text-align: center;
                            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
                        }}
                        .icon {{
                            font-size: 40px;
                            color: #818cf8;
                            margin-bottom: 16px;
                            display: block;
                        }}
                        h3 {{
                            color: #ffffff;
                            margin-top: 0;
                            font-size: 18px;
                            font-weight: 700;
                            letter-spacing: -0.025em;
                        }}
                        p {{
                            font-size: 13px;
                            line-height: 1.6;
                            color: #94a3b8;
                            margin-bottom: 20px;
                        }}
                        .badge {{
                            background: rgba(99, 102, 241, 0.1);
                            color: #818cf8;
                            border: 1px solid rgba(99, 102, 241, 0.2);
                            padding: 4px 10px;
                            border-radius: 9999px;
                            font-size: 10px;
                            font-weight: 700;
                            text-transform: uppercase;
                            letter-spacing: 0.05em;
                            display: inline-block;
                            margin-bottom: 16px;
                        }}
                    </style>
                </head>
                <body>
                    <div class="card">
                        <span class="badge">Placeholder Reference</span>
                        <span class="icon">📁</span>
                        <h3>Telegram Attachment Required</h3>
                        <p>This pre-populated course asset (<strong>{file_name}</strong>) is a placeholder mapped to a sample Telegram ID.</p>
                        <p>To study your own handouts, simply upload files directly inside this course segment using our secure Drag-and-Drop Uploader to store them in your channel!</p>
                    </div>
                </body>
            </html>
            """,
            status_code=200,
            media_type="text/html"
        )


async def upload_file_to_telegram(file_bytes: bytes, filename: str) -> str:
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHANNEL_ID:
        raise HTTPException(status_code=500, detail="Telegram bot token or channel ID not configured in environment")
    
    url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument"
    files = {
        "document": (filename, file_bytes)
    }
    data = {
        "chat_id": TELEGRAM_CHANNEL_ID
    }
    resp = await safe_telegram_request("POST", url, data=data, files=files)
    if resp.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Telegram upload failed: {resp.text}")
    
    res = resp.json()
    if not res.get("ok"):
        raise HTTPException(status_code=502, detail=f"Telegram API error: {res.get('description', '')}")
    
    doc = res["result"].get("document")
    if not doc:
        raise HTTPException(status_code=500, detail="Telegram did not return document file metadata")
    
    return doc["file_id"]

CHUNK_SIZE_LIMIT = 19 * 1024 * 1024 # 19 MB (safely under Telegram 20 MB download limit)

async def upload_file_in_chunks_to_telegram(file_obj, filename: str, total_bytes: int) -> List[str]:
    import gc
    num_parts = (total_bytes + CHUNK_SIZE_LIMIT - 1) // CHUNK_SIZE_LIMIT
    
    if num_parts == 1:
        file_obj.seek(0)
        chunk_data = file_obj.read()
        file_id = await upload_file_to_telegram(chunk_data, filename)
        del chunk_data
        gc.collect()
        return [file_id]
        
    sem = asyncio.Semaphore(2)
    file_ids = [None] * num_parts
    file_read_lock = asyncio.Lock()
    
    async def upload_part(part_index: int):
        start = part_index * CHUNK_SIZE_LIMIT
        
        # Read the chunk under a thread-safe / async-safe lock to prevent read pointer races
        async with file_read_lock:
            file_obj.seek(start)
            chunk_data = file_obj.read(CHUNK_SIZE_LIMIT)
            
        part_filename = f"{filename}.part{part_index+1}"
        
        async with sem:
            try:
                file_id = await upload_file_to_telegram(chunk_data, part_filename)
                file_ids[part_index] = file_id
            finally:
                del chunk_data
                gc.collect()
                
    tasks = [upload_part(i) for i in range(num_parts)]
    await asyncio.gather(*tasks)
    
    for i, fid in enumerate(file_ids):
        if fid is None:
            raise HTTPException(
                status_code=502,
                detail=f"Telegram chunked upload failed: Part {i+1} was not completed."
            )
            
    return file_ids

async def stream_telegram_chunks(file_ids: List[str]):
    for file_id in file_ids:
        get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={file_id}"
        resp = await safe_telegram_request("GET", get_file_url)
        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail="Failed to retrieve file details from Telegram Bot API")
            
        result = resp.json()
        if not result.get("ok"):
            raise HTTPException(status_code=502, detail="Telegram Bot API returned an error")
            
        file_path = result["result"]["file_path"]
        download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        
        async with http_client.stream("GET", download_url) as r:
            if r.status_code != 200:
                return
            async for chunk in r.aiter_bytes():
                yield chunk


async def stream_telegram_chunks_range(
    file_ids: List[str],
    start: int,
    end: int,
    total_size: int,
    chunk_size_limit: int
):
    for i, file_id in enumerate(file_ids):
        chunk_start = i * chunk_size_limit
        chunk_end = min((i + 1) * chunk_size_limit - 1, total_size - 1)
        
        # Check if the requested range overlaps with this chunk
        if start <= chunk_end and end >= chunk_start:
            overlap_start = max(start, chunk_start)
            overlap_end = min(end, chunk_end)
            
            rel_start = overlap_start - chunk_start
            rel_end = overlap_end - chunk_start
            
            # Fetch file path from Telegram
            get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={file_id}"
            resp = await safe_telegram_request("GET", get_file_url)
            if resp.status_code != 200:
                print(f"Failed to getFile details for chunk {i}: {resp.text}")
                return
            result = resp.json()
            if not result.get("ok"):
                print(f"Telegram Bot API error for chunk {i}")
                return
                
            file_path = result["result"]["file_path"]
            download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
            
            headers = {"Range": f"bytes={rel_start}-{rel_end}"}
            async with http_client.stream("GET", download_url, headers=headers) as r:
                if r.status_code not in (200, 206):
                    print(f"Telegram download failed for chunk {i} range {rel_start}-{rel_end}: status {r.status_code}")
                    return
                async for chunk in r.aiter_bytes():
                    yield chunk


# Handle file upload (proxies to Telegram storage)
@app.post("/api/upload/{course_id}")
async def upload_file(
    course_id: str, 
    file: UploadFile = File(...), 
    category: Optional[str] = Form(None),
    folder: Optional[str] = Form(None)
):
    import gc
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    filename = os.path.basename(file.filename)
    
    try:
        # Seek metadata directly on the underlying spooled file to get size without loading into RAM
        file.file.seek(0, 2)
        bytes_size = file.file.tell()
        file.file.seek(0)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read upload file payload metadata: {str(e)}")
        
    # Exclusively direct-to-Telegram chunked upload using disk-spooled stream piping
    try:
        telegram_file_ids = await upload_file_in_chunks_to_telegram(file.file, filename, bytes_size)
    except HTTPException as he:
        raise he
    except Exception as te:
        err_msg = str(te) or repr(te)
        raise HTTPException(
            status_code=502, 
            detail=f"Telegram upload failed: {err_msg}. Please verify that your bot is added to your Telegram channel as an Administrator with document posting permissions."
        )
    finally:
        # Clean up descriptors and force garbage collection
        await file.close()
        gc.collect()
        
    # Construct file catalog item
    if category == "book":
        file_type = "Reference Book"
    elif category == "question":
        file_type = "Term-Final Question"
    elif category == "solution" or category == "manual":
        file_type = "Solution Manual"
    elif category == "solved":
        file_type = "Term-Final Solved"
    elif category == "video" or category == "recorded_class":
        file_type = "Recorded Class"
    else:
        file_type = get_file_type(filename)
        
    new_file_item = {
        "name": filename,
        "size": format_size(bytes_size),
        "bytes": bytes_size,
        "type": file_type,
        "storage_type": "telegram_chunks",
        "telegram_file_ids": telegram_file_ids
    }
        
    if folder:
        new_file_item["folder"] = folder
        
    if "files" not in course:
        course["files"] = []
    course["files"].append(new_file_item)
    
    save_courses_config(config)
    
    return {
        "status": "success", 
        "filename": filename, 
        "storage_type": "telegram_chunks",
        "message": "File uploaded successfully to Telegram channel!"
    }

# Handle PDF Summarization with DeepSeek
@app.post("/api/courses/{course_id}/files/{file_index}/summarize")
async def summarize_pdf_file(course_id: str, file_index: int):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    files = course.get("files", [])
    
    if file_index < 0 or file_index >= len(files):
        raise HTTPException(status_code=404, detail="File not found")
        
    file_item = files[file_index]
    filename = file_item["name"]
    
    if not filename.lower().endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files can be summarized")
        
    # Check if a summary already exists
    if "summary" in file_item:
        return {"status": "success", "summary": file_item["summary"], "cached": True}
        
    # Download file content from Telegram chunks
    telegram_file_ids = file_item.get("telegram_file_ids", [])
    if not telegram_file_ids:
        # Fallback to single telegram_file_id if present
        single_id = file_item.get("telegram_file_id")
        if single_id:
            telegram_file_ids = [single_id]
        else:
            raise HTTPException(status_code=400, detail="File has no Telegram storage metadata")
            
    # Accumulate file bytes
    file_bytes_accumulator = io.BytesIO()
    for file_id in telegram_file_ids:
        get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={file_id}"
        resp = await safe_telegram_request("GET", get_file_url)
        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail="Failed to retrieve file details from Telegram Bot API")
            
        result = resp.json()
        if not result.get("ok"):
            raise HTTPException(status_code=502, detail=f"Telegram Bot API error: {result.get('description', '')}")
            
        file_path = result["result"]["file_path"]
        download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        
        async with http_client.stream("GET", download_url) as r:
            if r.status_code != 200:
                raise HTTPException(status_code=502, detail="Failed to download file chunk from Telegram")
            async for chunk in r.aiter_bytes():
                file_bytes_accumulator.write(chunk)
                
    pdf_bytes = file_bytes_accumulator.getvalue()
    if not pdf_bytes:
        raise HTTPException(status_code=400, detail="Downloaded PDF file is empty")
        
    try:
        # Extract text from PDF
        extracted_text = extract_text_from_pdf(pdf_bytes)
        if not extracted_text.strip():
            raise HTTPException(status_code=400, detail="Could not extract any readable text from the PDF file")
            
        # Generate summary using Qwen AI model on Hugging Face Serverless Inference API
        summary_text = await query_qwen_summary(extracted_text, filename)
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate summary: {str(e)}")
        
    # Cache summary inside the course files metadata database
    file_item["summary"] = summary_text
    save_courses_config(config)
    
    return {"status": "success", "summary": summary_text, "cached": False}

@app.delete("/api/courses/{course_id}/files/{file_index}")
async def delete_file(course_id: str, file_index: int):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    files = course.get("files", [])
    
    if file_index < 0 or file_index >= len(files):
        raise HTTPException(status_code=404, detail="File not found")
        
    # Remove from list
    file_item = files.pop(file_index)
    filename = file_item["name"]
    
    # Try deleting the local file fallback if it exists on disk
    try:
        local_path = os.path.join(WORKSPACE_DIR, course["folder"], filename)
        if os.path.exists(local_path) and os.path.isfile(local_path):
            os.remove(local_path)
    except Exception as e:
        print(f"Failed to delete local fallback file: {str(e)}")
        
    # Save config
    save_courses_config(config)
    
    return {"status": "success", "message": f"File '{filename}' deleted successfully"}

class CourseCreate(BaseModel):
    code: str
    title: str
    description: str
    level: str
    term: str

@app.post("/api/courses")
def create_course(new_course: CourseCreate):
    config = load_courses_config()
    # Normalize ID from course code (e.g. "ChE 403" -> "ChE-403")
    course_id = new_course.code.replace(" ", "-")
    
    if course_id in config["courses"]:
        raise HTTPException(status_code=400, detail=f"Course '{new_course.code}' already exists")
        
    # Add to config dict
    config["courses"][course_id] = {
        "id": course_id,
        "code": new_course.code,
        "title": new_course.title,
        "description": new_course.description,
        "folder": course_id,
        "level": new_course.level,
        "term": new_course.term,
        "syllabus": [],
        "files": [],
        "folders": ["Root"],
        "video_folders": ["Root"],
        "default_notes": f"# {new_course.code}: {new_course.title}\n\nStart writing notes...",
        "default_logs": [],
        "default_links": []
    }
    
    # Write updated config to disk
    save_courses_config(config)
    
    return {
        "id": course_id,
        "code": new_course.code,
        "title": new_course.title,
        "description": new_course.description,
        "folder": course_id,
        "level": new_course.level,
        "term": new_course.term,
        "syllabus": [],
        "fileCount": 0,
        "files": [],
        "folders": ["Root"],
        "video_folders": ["Root"]
    }

@app.put("/api/courses/{course_id}")
def update_course(course_id: str, course_data: CourseUpdate):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    
    new_code = course_data.code.strip()
    new_title = course_data.title.strip()
    new_description = course_data.description.strip()
    
    if not new_code or not new_title:
        raise HTTPException(status_code=400, detail="Course Code and Title cannot be empty")
        
    # Update properties
    course["code"] = new_code
    course["title"] = new_title
    course["description"] = new_description
    
    # Save configuration to disk
    save_courses_config(config)
    
    return {
        "status": "success",
        "course": course
    }

@app.post("/api/courses/{course_id}/folders")
def create_folder(course_id: str, folder_data: FolderCreate):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    if "folders" not in course:
        course["folders"] = ["Root"]
        
    folder_name = folder_data.name.strip()
    if not folder_name:
        raise HTTPException(status_code=400, detail="Folder name cannot be empty")
        
    if folder_name in course["folders"]:
        raise HTTPException(status_code=400, detail=f"Folder '{folder_name}' already exists")
        
    course["folders"].append(folder_name)
    save_courses_config(config)
    
    return {"status": "success", "folders": course["folders"]}

@app.delete("/api/courses/{course_id}/folders/{folder_name}")
def delete_folder(course_id: str, folder_name: str):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    if "folders" not in course:
        course["folders"] = ["Root"]
        
    if folder_name not in course["folders"]:
        raise HTTPException(status_code=404, detail=f"Folder '{folder_name}' not found")
        
    if folder_name == "Root":
        raise HTTPException(status_code=400, detail="Cannot delete the Root folder")
        
    # Remove the folder from the catalog
    course["folders"].remove(folder_name)
    
    # Clean up all slide files matching this folder
    files = course.get("files", [])
    new_files = []
    for file_item in files:
        if file_item.get("folder") == folder_name:
            # Delete local physical file if it exists
            filename = file_item["name"]
            try:
                local_path = os.path.join(WORKSPACE_DIR, course["folder"], filename)
                if os.path.exists(local_path) and os.path.isfile(local_path):
                    os.remove(local_path)
            except Exception as e:
                print(f"Failed to delete local file '{filename}' during folder purge: {str(e)}")
        else:
            new_files.append(file_item)
            
    course["files"] = new_files
    save_courses_config(config)
    
    return {"status": "success", "folders": course["folders"]}

@app.put("/api/courses/{course_id}/folders/{old_folder_name}")
def rename_folder(course_id: str, old_folder_name: str, folder_data: FolderRename):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    if "folders" not in course:
        course["folders"] = ["Root"]
        
    if old_folder_name not in course["folders"]:
        raise HTTPException(status_code=404, detail=f"Folder '{old_folder_name}' not found")
        

    new_folder_name = folder_data.new_name.strip()
    if not new_folder_name:
        raise HTTPException(status_code=400, detail="New folder name cannot be empty")
        
    if new_folder_name in course["folders"]:
        raise HTTPException(status_code=400, detail=f"Folder '{new_folder_name}' already exists")
        
    # 1. Update the folder name in the course folders catalog list
    idx = course["folders"].index(old_folder_name)
    course["folders"][idx] = new_folder_name
    
    # 2. Update the folder tag of all file assets matching the old name
    files = course.get("files", [])
    for file_item in files:
        if file_item.get("folder") == old_folder_name:
            file_item["folder"] = new_folder_name
            
    save_courses_config(config)
    
    return {"status": "success", "folders": course["folders"]}


@app.post("/api/courses/{course_id}/video-folders")
def create_video_folder(course_id: str, folder_data: FolderCreate):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    if "video_folders" not in course:
        course["video_folders"] = ["Root"]
        
    folder_name = folder_data.name.strip()
    if not folder_name:
        raise HTTPException(status_code=400, detail="Folder name cannot be empty")
        
    if folder_name in course["video_folders"]:
        raise HTTPException(status_code=400, detail=f"Folder '{folder_name}' already exists")
        
    course["video_folders"].append(folder_name)
    save_courses_config(config)
    
    return {"status": "success", "video_folders": course["video_folders"]}

@app.delete("/api/courses/{course_id}/video-folders/{folder_name}")
def delete_video_folder(course_id: str, folder_name: str):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    if "video_folders" not in course:
        course["video_folders"] = ["Root"]
        
    if folder_name not in course["video_folders"]:
        raise HTTPException(status_code=404, detail=f"Folder '{folder_name}' not found")
        
    if folder_name == "Root":
        raise HTTPException(status_code=400, detail="Cannot delete the Root folder")
        
    # Remove the folder from the catalog
    course["video_folders"].remove(folder_name)
    
    # Clean up all Recorded Class files matching this folder
    files = course.get("files", [])
    new_files = []
    for file_item in files:
        if file_item.get("folder") == folder_name and file_item.get("type") == "Recorded Class":
            # Delete local physical file if it exists
            filename = file_item["name"]
            try:
                local_path = os.path.join(WORKSPACE_DIR, course["folder"], filename)
                if os.path.exists(local_path) and os.path.isfile(local_path):
                    os.remove(local_path)
            except Exception as e:
                print(f"Failed to delete local video file '{filename}' during folder purge: {str(e)}")
        else:
            new_files.append(file_item)
            
    course["files"] = new_files
    save_courses_config(config)
    
    return {"status": "success", "video_folders": course["video_folders"]}

@app.put("/api/courses/{course_id}/video-folders/{old_folder_name}")
def rename_video_folder(course_id: str, old_folder_name: str, folder_data: FolderRename):
    config = load_courses_config()
    resolved_course_id = find_course_key(course_id, config["courses"])
    if not resolved_course_id:
        raise HTTPException(status_code=404, detail="Course not found")
    course_id = resolved_course_id
        
    course = config["courses"][course_id]
    if "video_folders" not in course:
        course["video_folders"] = ["Root"]
        
    if old_folder_name not in course["video_folders"]:
        raise HTTPException(status_code=404, detail=f"Folder '{old_folder_name}' not found")
        

    new_folder_name = folder_data.new_name.strip()
    if not new_folder_name:
        raise HTTPException(status_code=400, detail="New folder name cannot be empty")
        
    if new_folder_name in course["video_folders"]:
        raise HTTPException(status_code=400, detail=f"Folder '{new_folder_name}' already exists")
        
    # 1. Update the folder name in the course video_folders catalog list
    idx = course["video_folders"].index(old_folder_name)
    course["video_folders"][idx] = new_folder_name
    
    # 2. Update the folder tag of all Recorded Class video file assets matching the old name
    files = course.get("files", [])
    for file_item in files:
        if file_item.get("folder") == old_folder_name and file_item.get("type") == "Recorded Class":
            file_item["folder"] = new_folder_name
            
    save_courses_config(config)
    
    return {"status": "success", "video_folders": course["video_folders"]}


# Serve the frontend

FRONTEND_DIR = os.path.join(WORKSPACE_DIR, "frontend")
os.makedirs(FRONTEND_DIR, exist_ok=True)

# Custom Single Page Application (SPA) fallback routing
@app.get("/{path:path}")
def serve_frontend_or_spa(path: str):
    # If the request matches a file in the frontend folder, serve it
    file_path = os.path.join(FRONTEND_DIR, path)
    if os.path.exists(file_path) and os.path.isfile(file_path):
        return FileResponse(file_path)
    
    # Fallback to SPA shell index.html for all other non-API routes
    index_html = os.path.join(FRONTEND_DIR, "index.html")
    if os.path.exists(index_html):
        return FileResponse(index_html)
        
    return JSONResponse(
        status_code=404,
        content={"detail": "Chemical Engineering Hub Frontend not initialized yet. Please compile index.html"}
    )

@app.on_event("shutdown")
async def shutdown_event():
    global http_client
    if http_client:
        await http_client.aclose()
