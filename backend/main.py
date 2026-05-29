import os
import json
import shutil
from typing import Optional, List
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, BackgroundTasks, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse, JSONResponse, StreamingResponse, HTMLResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import httpx
from dotenv import load_dotenv

load_dotenv()

http_client = httpx.AsyncClient(timeout=120.0)

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

class FolderCreate(BaseModel):
    name: str

class FolderRename(BaseModel):
    new_name: str

class CourseUpdate(BaseModel):
    code: str
    title: str
    description: str

# API ENDPOINTS

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
            "folders": course.get("folders", ["Root"])
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



TELEGRAM_BOT_TOKEN = os.getenv("TELEGRAM_BOT_TOKEN")
if TELEGRAM_BOT_TOKEN:
    TELEGRAM_BOT_TOKEN = TELEGRAM_BOT_TOKEN.strip().replace('"', '').replace("'", "")
    if TELEGRAM_BOT_TOKEN.lower().startswith("bot"):
        TELEGRAM_BOT_TOKEN = TELEGRAM_BOT_TOKEN[3:]

TELEGRAM_CHANNEL_ID = os.getenv("TELEGRAM_CHANNEL_ID")
if TELEGRAM_CHANNEL_ID:
    TELEGRAM_CHANNEL_ID = TELEGRAM_CHANNEL_ID.strip().replace('"', '').replace("'", "")

async def get_file_id_from_message_id(message_id: int) -> str:
    # Forward message to the channel itself (creates a temporary duplicate post)
    forward_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/forwardMessage"
    payload = {
        "chat_id": TELEGRAM_CHANNEL_ID,
        "from_chat_id": TELEGRAM_CHANNEL_ID,
        "message_id": message_id
    }
    resp = await http_client.post(forward_url, json=payload)
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
    await http_client.post(delete_url, json={
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
    
    # If no Telegram references are present, serve directly from local storage fallback!
    if not file_id and message_id is None:
        course_base = os.path.join(WORKSPACE_DIR, course["folder"])
        absolute_filepath = os.path.abspath(os.path.join(course_base, file_name))
        
        if not absolute_filepath.startswith(os.path.abspath(course_base)):
            raise HTTPException(status_code=403, detail="Access denied")
            
        if os.path.exists(absolute_filepath) and not os.path.isdir(absolute_filepath):
            content_type = "application/octet-stream"
            if file_name.lower().endswith(".pdf"):
                content_type = "application/pdf"
            elif file_name.lower().endswith(".zip"):
                content_type = "application/zip"
                
            return FileResponse(absolute_filepath, media_type=content_type)
            
    try:
        if not file_id and message_id is not None:
            # Dynamically resolve file_id from message_id
            file_id = await get_file_id_from_message_id(int(message_id))
            
        if not file_id:
            raise HTTPException(status_code=400, detail="No Telegram file_id or message_id mapped")
            
        # 1. Fetch file path from Telegram
        get_file_url = f"https://api.telegram.org/bot{TELEGRAM_BOT_TOKEN}/getFile?file_id={file_id}"
        resp = await http_client.get(get_file_url)
        if resp.status_code != 200:
            raise HTTPException(status_code=502, detail="Failed to retrieve file details from Telegram Bot API")
            
        result = resp.json()
        if not result.get("ok"):
            raise HTTPException(status_code=502, detail="Telegram Bot API returned an error")
            
        file_path = result["result"]["file_path"]
        
        # 2. Securely stream the binary file back to the browser
        download_url = f"https://api.telegram.org/file/bot{TELEGRAM_BOT_TOKEN}/{file_path}"
        
        async def stream_generator():
            async with http_client.stream("GET", download_url) as r:
                if r.status_code != 200:
                    yield b"Error streaming from Telegram servers"
                    return
                async for chunk in r.aiter_bytes():
                    yield chunk
                    
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
    resp = await http_client.post(url, data=data, files=files)
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
async def async_upload_to_telegram(course_id: str, file_index: int, local_path: str, filename: str):
    # Only run if Telegram is configured
    if not TELEGRAM_BOT_TOKEN or TELEGRAM_BOT_TOKEN.startswith("your_") or not TELEGRAM_CHANNEL_ID or TELEGRAM_CHANNEL_ID.startswith("your_"):
        return
        
    try:
        # Read the local file
        with open(local_path, "rb") as f:
            file_bytes = f.read()
            
        print(f"Background: Starting Telegram upload for '{filename}'...")
        # Upload to Telegram
        telegram_file_id = await upload_file_to_telegram(file_bytes, filename)
        
        # Update courses.json
        config = load_courses_config()
        if course_id in config["courses"]:
            course = config["courses"][course_id]
            files = course.get("files", [])
            if 0 <= file_index < len(files):
                # Ensure the file name still matches to prevent race conditions
                if files[file_index]["name"] == filename:
                    files[file_index]["telegram_file_id"] = telegram_file_id
                    save_courses_config(config)
                    print(f"Background: Telegram upload succeeded for '{filename}', saved file_id.")
    except Exception as e:
        print(f"Background: Telegram upload failed for '{filename}': {str(e)}")

@app.post("/api/upload/{course_id}")
async def upload_file(
    course_id: str, 
    background_tasks: BackgroundTasks,
    file: UploadFile = File(...), 
    category: Optional[str] = Form(None),
    folder: Optional[str] = Form(None)
):
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
        
    # 1. ALWAYS save the file locally first. This is instantaneous (< 50ms)
    target_dir = os.path.join(WORKSPACE_DIR, course["folder"])
    os.makedirs(target_dir, exist_ok=True)
    dest_path = os.path.join(target_dir, filename)
    try:
        with open(dest_path, "wb") as buffer:
            buffer.write(file_bytes)
    except Exception as local_err:
        raise HTTPException(status_code=500, detail=f"Local save failed: {str(local_err)}")
        
    # 2. Construct file catalog item
    if category == "book":
        file_type = "Reference Book"
    elif category == "question":
        file_type = "Term-Final Question"
    elif category == "solution":
        file_type = "Term-Final Solve"
    else:
        file_type = get_file_type(filename)
        
    new_file_item = {
        "name": filename,
        "size": format_size(bytes_size),
        "type": file_type
    }
    if folder:
        new_file_item["folder"] = folder
        
    # Append to courses.json files list
    if "files" not in course:
        course["files"] = []
    course["files"].append(new_file_item)
    file_index = len(course["files"]) - 1
    
    # Save updated config
    save_courses_config(config)
    
    # 3. Queue the Telegram upload as a secure background task!
    background_tasks.add_task(
        async_upload_to_telegram,
        course_id,
        file_index,
        dest_path,
        filename
    )
    
    return {
        "status": "success", 
        "filename": filename, 
        "message": "File uploaded successfully!"
    }

@app.delete("/api/courses/{course_id}/files/{file_index}")
def delete_file(course_id: str, file_index: int):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
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
        "folders": ["Root"]
    }

@app.put("/api/courses/{course_id}")
def update_course(course_id: str, course_data: CourseUpdate):
    config = load_courses_config()
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
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
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
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
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
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
    if course_id not in config["courses"]:
        raise HTTPException(status_code=404, detail="Course not found")
        
    course = config["courses"][course_id]
    if "folders" not in course:
        course["folders"] = ["Root"]
        
    if old_folder_name not in course["folders"]:
        raise HTTPException(status_code=404, detail=f"Folder '{old_folder_name}' not found")
        
    if old_folder_name == "Root":
        raise HTTPException(status_code=400, detail="Cannot rename the Root folder")
        
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
    await http_client.aclose()
