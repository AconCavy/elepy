const {app, BrowserWindow, dialog, ipcMain} = require('electron');
const {PythonShell} = require('python-shell');
const path = require('path');

let appPath = app.getAppPath();
let isWin = process.platform === 'win32';
let pythonPath = `${appPath}/venv/${isWin ? 'Scripts' : 'bin'}/python`;
let scriptPath = `${appPath}/elesk/server`;

process.env['PYTHONPATH'] = `${process.env['PYTHONPATH']}${isWin ? ';' : ':'}${appPath}`;

let pythonOptions = {
    pythonPath: pythonPath,
    scriptPath: scriptPath
};

let shell = PythonShell.run('app.py', pythonOptions, function (err) {
    if (err) dialog.showErrorBox("error", err.toString());
});

function createWindow() {
    const window = new BrowserWindow(
        {
            width: 400,
            height: 300,
            webPreferences: {
                preload: path.join(__dirname, 'preload.js')
            }
        },
    );
    let url = path.join(__dirname, 'index.html');
    window.loadFile(url);
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

ipcMain.handle('open-directory-picker', async function () {
    let options = {
        properties: ['openDirectory', 'multiSelections']
    };
    return (await dialog.showOpenDialog(null, options));
});