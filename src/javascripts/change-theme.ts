/**
 * @description this function will check if we want to change theme color
 * @returns Promise<void>
 */
const changeThemeEvent = async () => {
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
};

export default changeThemeEvent;