FROM python:3.10-slim

WORKDIR /app

# Copy the entire workspace into the container
COPY . /app

# Install Python dependencies from the backend requirements file
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose port 7860 for Hugging Face Spaces / custom hosting
EXPOSE 7860

# Start Uvicorn pointing to backend.main:app on port 7860
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "7860"]
