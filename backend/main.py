import os
import json
import shutil
from typing import Optional, List
from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="Chemical Engineering Study Resource Hub API")

# Enable CORS for local development
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Root workspace directory
WORKSPACE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DATA_DIR = os.path.join(WORKSPACE_DIR, "backend", "data")
COURSES_CONF_PATH = os.path.join(WORKSPACE_DIR, "backend", "courses.json")

# Ensure data directory exists
os.makedirs(DATA_DIR, exist_ok=True)

# Helper to load course config
def load_courses_config():
    if not os.path.exists(COURSES_CONF_PATH):
        raise HTTPException(status_code=500, detail="courses.json configuration missing")
    with open(COURSES_CONF_PATH, "r", encoding="utf-8") as f:
        return json.load(f)

def save_courses_config(config):
    with open(COURSES_CONF_PATH, "w", encoding="utf-8") as f:
        json.dump(config, f, indent=2, ensure_ascii=False)

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

# API ENDPOINTS

@app.get("/api/courses")
def get_courses():
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
            "files": files
        })
    return courses_data

@app.get("/api/courses/{course_id}/notes")
def get_notes(course_id: str):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
    
    notes_path = os.path.join(DATA_DIR, f"{course_id}_notes.md")
    if not os.path.exists(notes_path):
        # Bootstrap with default notes
        default_notes = config["courses"][course_id].get("default_notes", "# " + config["courses"][course_id]["title"] + "\n\nStart writing notes...")
        with open(notes_path, "w", encoding="utf-8") as f:
            f.write(default_notes)
        return {"notes": default_notes}
        
    with open(notes_path, "r", encoding="utf-8") as f:
        return {"notes": f.read()}

@app.post("/api/courses/{course_id}/notes")
def save_notes(course_id: str, note_data: NoteUpdate):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
    
    notes_path = os.path.join(DATA_DIR, f"{course_id}_notes.md")
    with open(notes_path, "w", encoding="utf-8") as f:
        f.write(note_data.notes)
    return {"status": "success", "message": "Notes saved successfully"}

@app.get("/api/courses/{course_id}/logs")
def get_logs(course_id: str):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
    
    logs_path = os.path.join(DATA_DIR, f"{course_id}_logs.json")
    if not os.path.exists(logs_path):
        # Bootstrap with defaults
        default_logs = config["courses"][course_id].get("default_logs", [])
        with open(logs_path, "w", encoding="utf-8") as f:
            json.dump(default_logs, f, indent=2, ensure_ascii=False)
        return default_logs
        
    with open(logs_path, "r", encoding="utf-8") as f:
        return json.load(f)

@app.post("/api/courses/{course_id}/logs")
def add_log(course_id: str, item: LogItem):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
    
    logs_path = os.path.join(DATA_DIR, f"{course_id}_logs.json")
    logs = []
    if os.path.exists(logs_path):
        with open(logs_path, "r", encoding="utf-8") as f:
            logs = json.load(f)
            
    # Generate unique ID
    import uuid
    new_log = item.dict()
    new_log["id"] = f"log-{uuid.uuid4().hex[:8]}"
    logs.append(new_log)
    
    # Sort logs by date (newest first or chronologically? Let's sort chronologically)
    logs.sort(key=lambda x: x.get("date", ""))
    
    with open(logs_path, "w", encoding="utf-8") as f:
        json.dump(logs, f, indent=2, ensure_ascii=False)
        
    return logs

@app.get("/api/courses/{course_id}/links")
def get_links(course_id: str):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
    
    links_path = os.path.join(DATA_DIR, f"{course_id}_links.json")
    if not os.path.exists(links_path):
        # Bootstrap with defaults
        default_links = config["courses"][course_id].get("default_links", [])
        with open(links_path, "w", encoding="utf-8") as f:
            json.dump(default_links, f, indent=2, ensure_ascii=False)
        return default_links
        
    with open(links_path, "r", encoding="utf-8") as f:
        return json.load(f)

@app.post("/api/courses/{course_id}/links")
def add_link(course_id: str, item: LinkItem):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
    
    links_path = os.path.join(DATA_DIR, f"{course_id}_links.json")
    links = []
    if os.path.exists(links_path):
        with open(links_path, "r", encoding="utf-8") as f:
            links = json.load(f)
            
    import uuid
    new_link = item.dict()
    new_link["id"] = f"link-{uuid.uuid4().hex[:8]}"
    links.append(new_link)
    
    with open(links_path, "w", encoding="utf-8") as f:
        json.dump(links, f, indent=2, ensure_ascii=False)
        
    return links

@app.delete("/api/courses/{course_id}/links/{link_id}")
def delete_link(course_id: str, link_id: str):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
    
    links_path = os.path.join(DATA_DIR, f"{course_id}_links.json")
    if not os.path.exists(links_path):
        return []
        
    with open(links_path, "r", encoding="utf-8") as f:
        links = json.load(f)
        
    links = [link for link in links if link.get("id") != link_id]
    
    with open(links_path, "w", encoding="utf-8") as f:
        json.dump(links, f, indent=2, ensure_ascii=False)
        
    return links

# Stream files securely from the course folder
@app.get("/api/files/{course_id}/{filepath:path}")
def get_file(course_id: str, filepath: str):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
    course = config["courses"][course_id]
    course_base = os.path.join(WORKSPACE_DIR, course["folder"])
    
    # Safe path checking to prevent directory traversal attacks
    absolute_filepath = os.path.abspath(os.path.join(course_base, filepath))
    if not absolute_filepath.startswith(os.path.abspath(course_base)):
        raise HTTPException(status_code=403, detail="Access denied")
        
    if not os.path.exists(absolute_filepath) or os.path.isdir(absolute_filepath):
        raise HTTPException(status_code=404, detail="File not found")
        
    return FileResponse(absolute_filepath)

# Route downloads and preview source iframe URLs through /api/download/{course_id}/{file_index}
@app.get("/api/download/{course_id}/{file_index}")
def download_file_by_index(course_id: str, file_index: int):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
    course = config["courses"][course_id]
    files = scan_course_files(course["folder"])
    
    if file_index < 0 or file_index >= len(files):
        raise HTTPException(status_code=404, detail="File index out of range")
        
    file_info = files[file_index]
    filepath = file_info["path"]
    
    course_base = os.path.join(WORKSPACE_DIR, course["folder"])
    absolute_filepath = os.path.abspath(os.path.join(course_base, filepath))
    
    if not absolute_filepath.startswith(os.path.abspath(course_base)):
        raise HTTPException(status_code=403, detail="Access denied")
        
    if not os.path.exists(absolute_filepath) or os.path.isdir(absolute_filepath):
        raise HTTPException(status_code=404, detail="File not found")
        
    return FileResponse(absolute_filepath)


TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
TELEGRAM_CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID")

async def get_file_id_from_message_id(message_id: int) -> str:
    async with httpx.AsyncClient() as client:
        # Forward message to the channel itself (creates a temporary duplicate post)
        forward_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/forwardMessage"
        payload = {
            "chat_id": TELEGRAM_CHANNEL_ID,
            "from_chat_id": TELEGRAM_CHANNEL_ID,
            "message_id": message_id
        }
        resp = await client.post(forward_url, json=payload)
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
        await client.post(delete_url, json={
            "chat_id": TELEGRAM_CHANNEL_ID,
            "message_id": new_msg_id
        })
        
        if not file_id:
            raise HTTPException(status_code=400, detail="No downloadable file or document found in the Telegram message")
            
        return file_id

@app.get("/api/download/{course_id}/{file_index}")
async def download_file(course_id: str, file_index: int):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
    course = config["courses"][course_id]
    files = course.get("files", [])
    if file_index < 0 or file_index >= len(files):
        raise HTTPException(status_code=404, detail="File not found in course list")
        
    file_item = files[file_index]
    file_name = file_item["name"]
    
    file_id = file_item.get("telegram_file_id")
    message_id = file_item.get("telegram_message_id")
    
    if not file_id and message_id is not None:
        # Dynamically resolve file_id from message_id
        file_id = await get_file_id_from_message_id(int(message_id))
        
    if not file_id:
        raise HTTPException(status_code=400, detail="No Telegram file_id or message_id mapped for this resource")
        
    # 1. Fetch file path from Telegram
    get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={file_id}"
    async with httpx.AsyncClient() as client:
        resp = await client.get(get_file_url)
        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail="Failed to retrieve file details from Telegram Bot API")
            
        result = resp.json()
        if not result.get("ok"):
            raise HTTPException(status_code=502, detail="Telegram Bot API returned an error: " + result.get("description", ""))
            
        file_path = result["result"]["file_path"]
        
        # 2. Securely stream the binary file back to the browser
        download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        
        async def stream_generator():
            async with httpx.AsyncClient() as stream_client:
                async with stream_client.stream("GET", download_url) as r:
                    if r.status_code != 200:
                        yield b"Error streaming from Telegram servers"
                        return
                    async for chunk in r.aiter_bytes():
                        yield chunk
                        
        # Map content types (fallback to octet-stream for safety)
        content_type = "application/octet-stream"
        if file_name.lower().endswith(".pdf"):
            content_type = "application/pdf"
        elif file_name.lower().endswith(".zip"):
            content_type = "application/zip"
            
        return StreamingResponse(
            stream_generator(),
            media_type=content_type,
            headers={
                "Content-Disposition": f'inline; filename="{file_name}"',
                "Content-Type": content_type
            }
        )


async def upload_file_to_telegram(file_bytes: bytes, filename: str) -> str:
    if not TELEGRAM_BOT_TOKEN or not TELEGRAM_CHANNEL_ID:
        raise HTTPException(status_code=500, detail="Telegram bot token or channel ID not configured in environment")
    async with httpx.AsyncClient() as client:
        url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/sendDocument"
        files = {
            "document": (filename, file_bytes)
        }
        data = {
            "chat_id": TELEGRAM_CHANNEL_ID
        }
        resp = await client.post(url, data=data, files=files, timeout=120.0)
        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail=f"Telegram upload failed: {resp.text}")
        
        res = resp.json()
        if not res.get("ok"):
            raise HTTPException(status_code=502, detail=f"Telegram API error: {res.get('description', '')}")
        
        doc = res["result"].get("document")
        if not doc:
            raise HTTPException(status_code=500, detail="Telegram did not return document file metadata")
        
        return doc["file_id"]

# Handle file upload (proxies to Telegram storage)
@app.post("/api/upload/{course_id}")
async def upload_file(course_id: str, file: UploadFile = File(...)):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
    course = config["courses"][course_id]
    filename = os.path.basename(file.filename)
    
    try:
        file_bytes = await file.read()
        bytes_size = len(file_bytes)
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Failed to read upload file payload: {str(e)}")
        
    # Upload directly to Telegram
    try:
        telegram_file_id = await upload_file_to_telegram(file_bytes, filename)
    except Exception as e:
        raise HTTPException(status_code=502, detail=f"Failed to upload to Telegram storage engine: {str(e)}")
        
    # Construct file item
    new_file_item = {
        "name": filename,
        "size": format_size(bytes_size),
        "type": get_file_type(filename),
        "telegram_file_id": telegram_file_id
    }
    
    # Append to courses.json files list
    if "files" not in course:
        course["files"] = []
    course["files"].append(new_file_item)
    
    # Save updated config
    save_courses_config(config)
    
    return {"status": "success", "filename": filename, "message": "File successfully uploaded and linked to Telegram!"}

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
        "files": []
    }


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
