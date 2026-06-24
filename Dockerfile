# Build stage for React frontend
FROM node:18-slim AS frontend-builder
WORKDIR /app
COPY . /app
RUN node compile.js

# Final stage
FROM python:3.10-slim
ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

# Create a non-root user with UID 1000
RUN useradd -m -u 1000 user

WORKDIR /app

# Copy the application files
COPY . /app

# Copy the compiled frontend file from the builder stage
COPY --from=frontend-builder /app/frontend/app.compiled.js /app/frontend/app.compiled.js

# Ensure user 1000 owns the /app directory and all files recursively
RUN chown -R user:user /app

# Switch to the non-root user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# Install Python dependencies locally
RUN pip install --no-cache-dir --user -r backend/requirements.txt

EXPOSE 10000

# Start the correct modern FastAPI entrypoint
CMD uvicorn frontend.api.index:app --host 0.0.0.0 --port ${PORT:-10000}

