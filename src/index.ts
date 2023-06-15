import { app, BrowserWindow, ipcMain, Menu, nativeImage, Notification, Tray } from 'electron';
import path from 'path';
import { download, File, Progress } from 'electron-dl';
import updateApp from 'update-electron-app';
import Setting from './settings/settings';

let win: BrowserWindow;

async function createWindow() {

	// properties
	let downloadVideo: Electron.DownloadItem;

	win = new BrowserWindow({
		width: 800,
		height: 700,
		minHeight: 700,
		minWidth: 800,
		maxWidth: 800,
		maxHeight: 700,
		maximizable: false,
		minimizable: true,
		title: Setting.APP_NAME,
		icon: path.join(__dirname, 'images', Setting.APP_LOGO),
		webPreferences: {
			preload: path.join(__dirname, 'preload.js')
		}
	});

	let proxyWin: BrowserWindow;

	// create menu
	const template = [
		{
			label: 'File',
			submenu: [
				{
					label: 'Quit',
					click: () => {
						win.destroy();
						app.quit();
					}
				}
			]
		},
		{
			label: 'Setting',
			submenu: [
				{
					label: 'Set Proxy',
					click: () => {
						// load proxy setting page in new window
						proxyWin = new BrowserWindow({
							width: 500,
							height: 460,
							title: 'Proxy Setting',
							icon: path.join(__dirname, 'images', Setting.APP_LOGO),
							webPreferences: {
								preload: path.join(__dirname, 'preload.js'),
							}
						});
						proxyWin.loadFile(path.join(__dirname, 'proxy.html'));
					}
				}
			]
		}
	];

	const menu = Menu.buildFromTemplate(template);
	Menu.setApplicationMenu(menu);

	// handle events

	ipcMain.on('send-notification', (event, title, body) => {
		showNotification(title, body);
	});

	ipcMain.on('download', async (event, url) => {
		download(win, url, {
			saveAs: true,
			showProgressBar: true,
			openFolderWhenDone: true,
			dialogOptions: {
				title: 'Save Video',
				buttonLabel: 'Save',
				filters: [
					{ name: 'Videos', extensions: ['mp4'] }
				]
			},
			onStarted: (item: Electron.DownloadItem) => {
				downloadVideo = item;
				showNotification(
					'Download Started',
					`Downloading ${item.getFilename()}`
				);
			},
			onProgress: (progress: Progress) => {
				if (Math.floor(progress.percent) % 10 === 0)
					win.webContents.send('download-progress', progress.percent);
			},
			onCancel: () => {
				showNotification(
					'Download Cancelled',
					'You cancelled the download'
				);
			},
			onCompleted(file: File) {
				showNotification(
					'Download Completed',
					`Downloaded ${file.filename}`,
					file.url
				);
			},
			showBadge: true,
		});
	});

	ipcMain.on('set-proxy', async (event, proxyHost, proxyPort, proxyUsername, proxyPassword) => {
		// set proxy
		let proxy = `socks5://${proxyHost}:${proxyPort}`;
		if (proxyUsername && proxyPassword) {
			proxy = `socks5://${proxyUsername}:${proxyPassword}@${proxyHost}:${proxyPort}`;
		}
		app.commandLine.appendSwitch('proxy-server', proxy);
		win.webContents.session.setProxy({ proxyRules: proxy });
		// set proxy to axios
		showNotification('Done', 'Proxy setting saved');
		proxyWin.close();
	});

	ipcMain.on('cancel-download', async () => {
		try {
			if (downloadVideo) {
				downloadVideo.cancel();
			}
		} catch (error) {
			console.log(error);
		}
	});


	// set app id for windows
	if (process.platform === 'win32') {
		app.setAppUserModelId(Setting.APP_NAME);
	}

	// show notification
	function showNotification(title: string, body: string, url?: string) {
		const notification = new Notification({ title, body, icon: path.join(__dirname, 'images', Setting.APP_LOGO) });
		notification.show();
		notification.on('click', () => {
			// do something with url
		});
	}

	win.loadFile(path.join(__dirname, 'index.html'));

	win.on('close', async e => {
		e.preventDefault();
		win.hide();
	});
}

app.whenReady().then(async () => {
	// create menu
	const template = [
		{
			label: 'Open',
			click: () => {
				win.show();
			}
		},
		{
			label: 'Quit',
			click: () => {
				win.destroy();
				app.quit();
			}
		}
	];
	const icon = nativeImage.createFromPath(path.join(__dirname, 'images', Setting.APP_LOGO));
	const tray = new Tray(icon);
	tray.setToolTip(Setting.APP_NAME);
	tray.setContextMenu(Menu.buildFromTemplate(template));
	const gotTheLock = app.requestSingleInstanceLock();
	if (!gotTheLock) {
		app.quit();
	} else {
		app.on('second-instance', (event) => {
			event.preventDefault();
			if (win) {
				win.show();
			}
		});
		createWindow();
	}
	app.on('activate', () => {
		if (BrowserWindow.getAllWindows().length === 0) {
			createWindow();
		}
	});
});

app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

// check if os not linux
if (process.platform !== 'linux') {
	updateApp({
		repo: Setting.APP_REPO,
		updateInterval: '1 hour',
		logger: require('electron-log'),
		notifyUser: true,
	});
}

