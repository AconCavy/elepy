const {contextBridge, ipcRenderer} = require('electron');

contextBridge.exposeInMainWorld(
    'api', {
        openDirectoryPicker: async () => await ipcRenderer.invoke('open-directory-picker')
    }
);