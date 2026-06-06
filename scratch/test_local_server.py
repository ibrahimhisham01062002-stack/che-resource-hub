import urllib.request
import json
import time

def run_local_tests():
    print("Waiting for local server to be fully ready...")
    time.sleep(3) # Wait for server to start
    
    # 1. Test large upload (25 MB)
    print("\n--- Testing Large PDF Upload to Local Server (25 MB) ---")
    url = "http://127.0.0.1:8000/api/upload/ChE-401"
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    
    # 25 MB dummy PDF content
    pdf_chunk = b"%PDF-1.4\n" + b"A" * (1024 * 1024) + b"\n"
    pdf_content = pdf_chunk * 25
    bytes_size = len(pdf_content)
    print(f"Generating 25 MB dummy PDF content ({bytes_size} bytes)...")
    
    parts = []
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="category"\r\n\r\nbook\r\n'.encode('utf-8'))
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="file"; filename="large_dummy_test.pdf"\r\nContent-Type: application/pdf\r\n\r\n'.encode('utf-8'))
    parts.append(pdf_content + b'\r\n')
    parts.append(f'--{boundary}--\r\n'.encode('utf-8'))
    
    body = b"".join(parts)
    print("Sending upload request (this may take up to 20 seconds as it uploads to Telegram)...")
    
    upload_res = None
    req = urllib.request.Request(url, data=body)
    req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')
    
    try:
        with urllib.request.urlopen(req) as resp:
            res_str = resp.read().decode('utf-8')
            print(f"UPLOAD RESPONSE: {res_str}")
            upload_res = json.loads(res_str)
    except Exception as e:
        print(f"UPLOAD ERROR: {str(e)}")
        if hasattr(e, 'read'):
            print(e.read().decode('utf-8'))
        return
        
    # Get courses to find index
    print("\n--- Getting Courses List ---")
    get_req = urllib.request.Request("http://127.0.0.1:8000/api/courses")
    file_index = None
    try:
        with urllib.request.urlopen(get_req) as resp:
            courses = json.loads(resp.read().decode('utf-8'))
            course = next(c for c in courses if c["id"] == "ChE-401")
            files = course["files"]
            # Find our dummy file
            for i, f in enumerate(files):
                if f["name"] == "large_dummy_test.pdf":
                    file_index = i
                    print(f"Found uploaded file in courses.json: {f}")
                    break
    except Exception as e:
        print(f"GET COURSES ERROR: {str(e)}")
        return
        
    if file_index is None:
        print("Uploaded file not found in course!")
        return
        
    # 2. Test download
    print(f"\n--- Testing Large PDF Download from Local Server (Index {file_index}) ---")
    dl_url = f"http://127.0.0.1:8000/api/download/ChE-401/{file_index}"
    dl_req = urllib.request.Request(dl_url)
    try:
        with urllib.request.urlopen(dl_req) as resp:
            print(f"DOWNLOAD RESPONSE STATUS: {resp.status}")
            print(f"DOWNLOAD RESPONSE HEADERS: {resp.headers}")
            data = resp.read()
            print(f"DOWNLOAD RESPONSE DATA LENGTH: {len(data)} bytes")
            if len(data) == bytes_size:
                print("SUCCESS! Downloaded size matches uploaded size exactly!")
            else:
                print(f"FAILED! Size mismatch: expected {bytes_size}, got {len(data)}")
    except Exception as e:
        print(f"DOWNLOAD ERROR: {str(e)}")
        if hasattr(e, 'read'):
            print(e.read().decode('utf-8'))

if __name__ == '__main__':
    run_local_tests()
