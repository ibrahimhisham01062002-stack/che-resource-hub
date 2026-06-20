@echo off
cd /d "%~dp0"

echo ========================================================
echo Starting ChE Study Hub Local Server...
echo ========================================================

REM 1. Check if virtual environment exists
if not exist "backend\.venv" (
    echo [1/4] Creating Python Virtual Environment (.venv)...
    py -m venv backend\.venv
) else (
    echo [1/4] Python Virtual Environment (.venv) found.
)

REM 2. Install/Verify Python dependencies
echo [2/4] Verifying and updating dependencies...
backend\.venv\Scripts\pip install -r backend\requirements.txt

REM 3. Compile React JSX frontend locally
echo [3/4] Compiling JSX frontend (app.js -> app.compiled.js)...
node compile.js

REM 4. Run uvicorn server
echo [4/4] Starting backend server on http://127.0.0.1:8000 ...
backend\.venv\Scripts\python -m uvicorn backend.main:app --reload --port 8000

pause
