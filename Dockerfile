FROM python:3.10-slim

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1

WORKDIR /app

# Create a non-root user with UID 1000
RUN useradd -m -u 1000 user

# Copy the application files and assign ownership to the non-root user
COPY --chown=user:user . /app

# Switch to the non-root user
USER user
ENV HOME=/home/user \
    PATH=/home/user/.local/bin:$PATH

# Install Python dependencies locally in the user home directory
RUN pip install --no-cache-dir --user -r backend/requirements.txt

# Expose the default Hugging Face Space port
EXPOSE 7860

# Run Uvicorn pointing to backend.main:app on port 7860
CMD ["python", "-m", "uvicorn", "backend.main:app", "--host", "0.0.0.0", "--port", "7860"]
