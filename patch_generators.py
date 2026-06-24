import re
import sys

def wrap_generators(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # We need to wrap stream_telegram_chunks_range
    def replacer(match):
        func_def = match.group(1)
        body = match.group(2)
        # Indent body by 4 spaces
        indented_body = '\n'.join('    ' + line if line.strip() else line for line in body.split('\n'))
        new_body = f"{func_def}\n    try:\n{indented_body}\n    except Exception as e:\n        print(f\"Stream exception: {{e}}\")\n"
        return new_body

    # Pattern for async def stream_telegram_chunks_range
    pattern1 = r'(async def stream_telegram_chunks_range\([^)]+\):\s*)(    global http_client.*?)(?=\n\S)'
    content = re.sub(pattern1, replacer, content, flags=re.DOTALL)

    # Pattern for async def stream_range_generator
    pattern2 = r'(            async def stream_range_generator\(\):\s*)(                global http_client.*?)(?=\n            [a-zA-Z#])'
    def replacer2(match):
        func_def = match.group(1)
        body = match.group(2)
        indented_body = '\n'.join('    ' + line if line.strip() else line for line in body.split('\n'))
        new_body = f"{func_def}\n                try:\n{indented_body}\n                except Exception as e:\n                    print(f\"Stream exception: {{e}}\")\n"
        return new_body
    content = re.sub(pattern2, replacer2, content, flags=re.DOTALL)

    # Pattern for async def stream_generator
    pattern3 = r'(        async def stream_generator\(\):\s*)(            global http_client.*?)(?=\n        [a-zA-Z#])'
    def replacer3(match):
        func_def = match.group(1)
        body = match.group(2)
        indented_body = '\n'.join('    ' + line if line.strip() else line for line in body.split('\n'))
        new_body = f"{func_def}\n            try:\n{indented_body}\n            except Exception as e:\n                print(f\"Stream exception: {{e}}\")\n"
        return new_body
    content = re.sub(pattern3, replacer3, content, flags=re.DOTALL)

    # stream_telegram_chunks in main.py only (index.py is already done)
    pattern4 = r'(async def stream_telegram_chunks\(file_ids: List\[str\]\):\s*)(    global http_client.*?)(?=\n\S)'
    def replacer4(match):
        func_def = match.group(1)
        body = match.group(2)
        indented_body = '\n'.join('    ' + line if line.strip() else line for line in body.split('\n'))
        new_body = f"{func_def}\n    try:\n{indented_body}\n    except Exception as e:\n        print(f\"Stream exception: {{e}}\")\n"
        return new_body
    content = re.sub(pattern4, replacer4, content, flags=re.DOTALL)

    # Also replace HTTPException raises in the bodies
    content = content.replace('raise HTTPException(status_code=502, detail="Failed to retrieve file details from Telegram Bot API")', 'print("Failed to retrieve file details"); return')
    content = content.replace('raise HTTPException(status_code=502, detail="Telegram Bot API returned an error")', 'print("Telegram API returned error"); return')

    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

wrap_generators('d:/3-2/frontend/api/index.py')
wrap_generators('d:/3-2/backend/main.py')
print("Done patching.")
