const {app, BrowserWindow} = require('electron');
const {PythonShell} = require('python-shell');
const electron = require("electron");

let appPath = app.getAppPath();
let pythonPath = `${appPath}/venv/${process.platform === 'win32' ? 'Scripts' : 'bin'}/python`

let options = {
  pythonPath: pythonPath
};

let shell = PythonShell.run(`${appPath}/app.py`, options, function (err) {
    if (err) electron.dialog.showErrorBox("error", err.toString());
});

function createWindow() {
    const window = new BrowserWindow({width: 400, height: 300});
    window.loadURL('http://127.0.0.1:5000');
}

app.on('ready', function () {
    createWindow();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', function () {
    app.quit();
});

app.on('will-quit', function () {
    shell.kill()
});
