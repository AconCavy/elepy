const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const {PythonShell} = require('python-shell');


app.on('window-all-closed', () => {
        app.quit();
    }
);

app.on('ready', () => {
        PythonShell.run('app.py', null, (err) => {
            if (err) throw err;
            console.log(err);
        });

        const openWindow = () => {
            window = new BrowserWindow({width: 400, height: 300});
            window.loadURL('http://127.0.0.1:5000/');

            window.on('closed', () => {
                electron.session.defaultSession.clearCache();
                window = null;
            })
        }

        openWindow();
    }
)