@echo off

set venv_name=venv

echo Start to setup

if not exist %venv_name% (
    python -m venv %venv_name%
)
call %venv_name%/Scripts/activate.bat ^
    && pip install -r requirements.txt ^
    && deactivate

call npm install
