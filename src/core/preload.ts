import { contextBridge, ipcRenderer } from 'electron';


contextBridge.exposeInMainWorld('electron', {
	sendNotification: (title: string, body: string) => ipcRenderer.send('send-notification', title, body),
});