FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Install Node.js for compiling the React frontend
RUN apt-get update && apt-get install -y nodejs npm && rm -rf /var/lib/apt/lists/*

# Create a non-root user with UID 1000
RUN useradd -m -u 1000 user

WORKDIR /app

# Copy the application files
COPY . /app

# Ensure user 1000 owns the /app directory and all files recursively
RUN chown -R user:user /app

# Switch to the non-root user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# Install Python dependencies locally
RUN pip install --no-cache-dir --user -r backend/requirements.txt

# Compile the React frontend
RUN node compile.js

EXPOSE 10000

# Start the correct modern FastAPI entrypoint
CMD uvicorn frontend.api.index:app --host 0.0.0.0 --port ${PORT:-10000}
