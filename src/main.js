const {app,BrowserWindow,ipcMain,dialog}=require('electron');
const path=require('node:path'),fs=require('node:fs/promises');
let win; const file=()=>path.join(app.getPath('userData'),'events.json');
function create(){win=new BrowserWindow({width:1150,height:780,minWidth:650,minHeight:500,icon:path.join(__dirname,'../assets/icon.png'),webPreferences:{preload:path.join(__dirname,'preload.js'),contextIsolation:true,nodeIntegration:false}});win.loadFile(path.join(__dirname,'index.html'))}
app.whenReady().then(()=>{create();app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)create()})});
app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit()});
ipcMain.handle('load',async()=>{try{return JSON.parse(await fs.readFile(file(),'utf8'))}catch{return []}});
ipcMain.handle('save',async(_e,data)=>{await fs.mkdir(path.dirname(file()),{recursive:true});await fs.writeFile(file(),JSON.stringify(data,null,2));return true});
ipcMain.handle('import-ics',async()=>{const r=await dialog.showOpenDialog(win,{properties:['openFile','multiSelections'],filters:[{name:'iCalendar',extensions:['ics']}]});if(r.canceled)return [];return Promise.all(r.filePaths.map(async p=>({name:path.basename(p),text:await fs.readFile(p,'utf8')})))});
ipcMain.handle('export-ics',async(_e,text)=>{const r=await dialog.showSaveDialog(win,{defaultPath:'calendar.ics',filters:[{name:'iCalendar',extensions:['ics']}]});if(r.canceled)return false;await fs.writeFile(r.filePath,text);return true});
