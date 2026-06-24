import sys

with open(r'd:\3-2\frontend\app.js', 'r', encoding='utf-8') as f:
    content = f.read()

start_str = '            if (isLargeFile) {\n              const chunkSize = 2 * 1024 * 1024; // 2 MB chunks'
end_str = '            } else {\n              // Direct upload for smaller files'

start_idx = content.find(start_str)
end_idx = content.find(end_str, start_idx)

if start_idx == -1 or end_idx == -1:
    print('Could not find start or end index')
    sys.exit(1)

new_block = """            if (isLargeFile) {
              // Direct upload to Catbox.moe via CORS
              const xhr = new XMLHttpRequest();
              
              xhr.upload.addEventListener("progress", (event) => {
                if (event.lengthComputable) {
                  // Catbox upload represents 0-90% of the total progress
                  const loaded = event.loaded;
                  const total = event.total;
                  const percentage = Math.round((loaded / total) * 90);
                  setUploadProgress(Math.round(((i * 100) + percentage) / files.length));
                  setUploadStatus(prev => {
                    const queue = prev.queue ? prev.queue : initialQueueStatus;
                    const newQueue = [...queue];
                    if (newQueue[i]) {
                      newQueue[i].progress = percentage;
                    }
                    return { type: "batch", queue: newQueue };
                  });
                }
              });

              xhr.addEventListener("load", () => {
                if (xhr.status >= 200 && xhr.status < 300) {
                  const catboxUrl = xhr.responseText.trim();
                  
                  // Now register with our backend
                  const completeFormData = new FormData();
                  completeFormData.append("catbox_url", catboxUrl);
                  completeFormData.append("filename", file.name);
                  completeFormData.append("file_size", file.size);
                  completeFormData.append("category", category);
                  if ((category === "slide" || category === "video") && (currentFolder || currentVideoFolder)) {
                    completeFormData.append("folder", category === "video" ? currentVideoFolder : currentFolder);
                  }
                  
                  const completeXhr = new XMLHttpRequest();
                  completeXhr.addEventListener("load", () => {
                    if (completeXhr.status >= 200 && completeXhr.status < 300) {
                      markSuccess();
                    } else {
                      let err = "Registration failed";
                      try {
                        const data = JSON.parse(completeXhr.responseText);
                        err = data.detail || err;
                      } catch (e) {}
                      markError(err);
                    }
                  });
                  completeXhr.addEventListener("error", () => {
                    markError("Backend connection error");
                  });
                  
                  completeXhr.open("POST", `${API_BASE}/api/upload/${activeCourse.id}`);
                  completeXhr.send(completeFormData);
                  
                } else {
                  markError(`Catbox upload failed: ${xhr.statusText}`);
                }
              });

              xhr.addEventListener("error", () => {
                markError("Catbox network error");
              });

              const formData = new FormData();
              formData.append("reqtype", "fileupload");
              formData.append("fileToUpload", file);
              
              xhr.open("POST", "https://catbox.moe/user/api.php");
              xhr.send(formData);
"""

new_content = content[:start_idx] + new_block + content[end_idx:]

with open(r'd:\3-2\frontend\app.js', 'w', encoding='utf-8') as f:
    f.write(new_content)

print('Successfully updated frontend/app.js')
