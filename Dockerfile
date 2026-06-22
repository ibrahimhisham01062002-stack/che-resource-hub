FROM python:3.10-slim

WORKDIR /app

# Copy the entire workspace into the container
COPY . /app

# Install Python dependencies from the backend requirements file
RUN pip install --no-cache-dir -r backend/requirements.txt

# Expose port 8000 for Koyeb
EXPOSE 8000

# Start Uvicorn pointing to backend.main:app
CMD ["uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "8000"]
