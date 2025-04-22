import os
import subprocess
import webbrowser
import sys

# Location where the .exe is running from
if getattr(sys, 'frozen', False):
    current_dir = os.path.dirname(sys.executable)
else:
    current_dir = os.path.dirname(os.path.abspath(__file__))

# Go up to FreshTakes/
base_dir = os.path.abspath(os.path.join(current_dir, os.pardir))

# Direct path to Python inside .venv
venv_python = os.path.join(base_dir, ".venv", "Scripts", "python.exe")

# Django project folder
project_dir = os.path.join(base_dir, "Resturant")
manage_py = os.path.join(project_dir, "manage.py")

# Check if everything exists
if not os.path.exists(venv_python):
    print(f"❌ Python not found in venv at:\n{venv_python}")
    input("Press any key to exit...")
    sys.exit(1)

if not os.path.exists(manage_py):
    print(f"❌ manage.py not found at:\n{manage_py}")
    input("Press any key to exit...")
    sys.exit(1)

# Start Django server directly with .venv's python
command = f'cmd /k "cd {project_dir} && {venv_python} manage.py runserver"'
subprocess.Popen(command, shell=True)

# Open the browser
webbrowser.open("http://127.0.0.1:8000")
