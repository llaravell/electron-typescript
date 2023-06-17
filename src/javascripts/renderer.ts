
import changeLanguageEvent from './change-language';
import changeThemeEvent from './change-theme';
import { newWindow } from './types';

const newWindow = window as unknown as Window & typeof globalThis & newWindow;

document.addEventListener('DOMContentLoaded', async () => {
	newWindow.electron.sendNotification('Hello', 'World');
	
	changeLanguageEvent();

	changeThemeEvent();
});

