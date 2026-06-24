import json
import asyncio
from dotenv import load_dotenv
load_dotenv(dotenv_path="backend/.env")
from frontend.api.index import cache_telegram_file_to_catbox, cache_gdrive_file_to_catbox, load_courses_config, async_sync_database_to_telegram

async def process_with_retry(coro):
    max_retries = 3
    for attempt in range(max_retries):
        try:
            return await coro
        except Exception as e:
            if "502" in str(e) or "429" in str(e):
                print(f"Error {str(e)}. Retrying {attempt+1}/{max_retries} after 5s...", flush=True)
                await asyncio.sleep(5)
                continue
            raise

async def main():
    config = load_courses_config()
    tasks = []
    
    print("Finding uncached files...", flush=True)
    for course_id, course in config["courses"].items():
        for file_index, file_item in enumerate(course.get("files", [])):
            if not file_item.get("catbox_url"):
                storage_type = file_item.get("storage_type")
                if storage_type == "telegram_chunks" or file_item.get("telegram_file_ids"):
                    tasks.append(process_with_retry(cache_telegram_file_to_catbox(course_id, file_index, file_item, "telegram_chunks")))
                elif storage_type == "gdrive" or file_item.get("gdrive_file_id"):
                    tasks.append(process_with_retry(cache_gdrive_file_to_catbox(course_id, file_index, file_item)))
                elif storage_type == "telegram" or file_item.get("telegram_file_id") or file_item.get("telegram_message_id"):
                    tasks.append(process_with_retry(cache_telegram_file_to_catbox(course_id, file_index, file_item, "telegram")))
    
    print(f"Starting {len(tasks)} cache uploads sequentially to avoid Telegram 502 limits...", flush=True)
    
    for i, t in enumerate(tasks):
        print(f"Processing {i+1} / {len(tasks)}...", flush=True)
        try:
            await t
        except Exception as e:
            print(f"Failed to cache file: {e}", flush=True)
        await asyncio.sleep(1) # delay to prevent hammering
        
    print("All tasks finished. Syncing database...")
    await async_sync_database_to_telegram()
    print("Done!")

if __name__ == "__main__":
    asyncio.run(main())
