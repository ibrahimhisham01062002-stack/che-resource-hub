import urllib.request
import json
import os
import sys

token = '8717534998:AAG2lyyFQ0okYvRqhCUbpDlYj4vLvts96tA'
chat_id = '-1003934336659'

def test_upload():
    print("Testing Telegram Upload...")
    url = f"https://api.telegram.org/bot{token}/sendDocument"
    boundary = '----WebKitFormBoundary7MA4YWxkTrZu0gW'
    
    parts = []
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="chat_id"\r\n\r\n{chat_id}\r\n')
    parts.append(f'--{boundary}\r\nContent-Disposition: form-data; name="document"; filename="test_upload.txt"\r\nContent-Type: text/plain\r\n\r\nHello Telegram World!\r\n')
    parts.append(f'--{boundary}--\r\n')
    
    body = "".join(parts).encode('utf-8')
    req = urllib.request.Request(url, data=body)
    req.add_header('Content-Type', f'multipart/form-data; boundary={boundary}')
    
    try:
        with urllib.request.urlopen(req) as resp:
            res_str = resp.read().decode('utf-8')
            res = json.loads(res_str)
            if res.get("ok"):
                file_id = res["result"]["document"]["file_id"]
                print(f"UPLOAD SUCCESS! File ID: {file_id}")
                return file_id
            else:
                print(f"UPLOAD FAILED (ok=False): {res_str}")
                return None
    except Exception as e:
        print(f"UPLOAD ERROR: {str(e)}")
        if hasattr(e, 'read'):
            print(e.read().decode('utf-8'))
        return None

def test_download(file_id):
    if not file_id:
        return
    print(f"Testing Telegram Download for file_id: {file_id}...")
    url = f"https://api.telegram.org/bot{token}/getFile?file_id={file_id}"
    try:
        with urllib.request.urlopen(url) as resp:
            res_str = resp.read().decode('utf-8')
            res = json.loads(res_str)
            if not res.get("ok"):
                print(f"DOWNLOAD DETAILS FAILED: {res_str}")
                return
            
            file_path = res["result"]["file_path"]
            print(f"File path resolved: {file_path}")
            
            download_url = f"https://api.telegram.org/file/bot{token}/{file_path}"
            with urllib.request.urlopen(download_url) as d_resp:
                content = d_resp.read()
                print(f"DOWNLOAD SUCCESS! Content: {content.decode('utf-8')}")
    except Exception as e:
        print(f"DOWNLOAD ERROR: {str(e)}")
        if hasattr(e, 'read'):
            print(e.read().decode('utf-8'))

if __name__ == '__main__':
    fid = test_upload()
    if fid:
        test_download(fid)
