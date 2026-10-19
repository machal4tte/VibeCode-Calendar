const {contextBridge,ipcRenderer}=require('electron');
contextBridge.exposeInMainWorld('calendarAPI',{load:()=>ipcRenderer.invoke('load'),save:x=>ipcRenderer.invoke('save',x),importICS:()=>ipcRenderer.invoke('import-ics'),exportICS:x=>ipcRenderer.invoke('export-ics',x)});
