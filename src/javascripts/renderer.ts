import translate from './translator';
import { newWindow } from './types';

const newWindow = window as unknown as Window & typeof globalThis & newWindow;

document.addEventListener('DOMContentLoaded', async () => {
	newWindow.electron.sendNotification('Hello', 'World');
	translate(['header-text']);
	const changeThemeButton = document.getElementById('change-theme-button');
	const changeThemeIcon = document.getElementById('change-theme-icon');

	if (changeThemeButton) {
		changeThemeButton.addEventListener('click', async () => {
			if (changeThemeIcon && changeThemeIcon.getAttribute('src') === './images/dark.png') {
				changeThemeIcon?.setAttribute('src', './images/light.png');
				document.querySelector('html')?.classList.add('dark');
			} else {
				changeThemeIcon?.setAttribute('src', './images/dark.png');
				document.querySelector('html')?.classList.remove('dark');
			}
		});
	}
});

