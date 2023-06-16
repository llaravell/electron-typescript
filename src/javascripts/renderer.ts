type newWindow = {
    electron: {
        // every electron object from preload.ts
        sendNotification: (title: string, body: string) => void;
    };
}
const newWindow = window as unknown as Window & typeof globalThis & newWindow;

document.addEventListener('DOMContentLoaded', async() => {
	newWindow.electron.sendNotification('Hello', 'World');
    
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

