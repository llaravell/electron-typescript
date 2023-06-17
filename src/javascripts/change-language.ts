import translate from './translator';

/**
 * @description this function will check if we want to change language and translate
 * @returns Promise<void>
 */
const changeLanguageEvent = async () => {
	const changeLanguageButton = document.getElementById('change-language');
	if (changeLanguageButton) {
		changeLanguageButton.addEventListener('click', async () => {
			if (window.localStorage.getItem('lang')) {
				if (window.localStorage.getItem('lang') === 'en') {
					window.localStorage.setItem('lang', 'fa');
					translate();
				} else {
					window.localStorage.setItem('lang', 'en');
					translate();
				}
			} else {
				window.localStorage.setItem('lang', 'fa');
				translate();
			}
		});
	}
};

export default changeLanguageEvent;