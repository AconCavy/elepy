const {app, BrowserWindow} = require('electron');
const {PythonShell} = require('python-shell');

let shell;

function createWindow() {
    const window = new BrowserWindow({width: 400, height: 300});
    window.loadURL('http://127.0.0.1:5000');
}

app.on('will-finish-launching', function () {
    shell = PythonShell.run('app.py', null, function (err) {
        if (err) throw err;
    });
});

app.on('ready', function () {
    createWindow();
});

app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

app.on('window-all-closed', function () {
    shell?.kill();
    if (process.platform !== 'darwin') app.quit();
});
