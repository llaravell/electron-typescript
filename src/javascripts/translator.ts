import axios from 'axios';

/**
 * @description this function will translate all tags with data-translatable dataset and get sentence from data-translate
 * @returns Promise<void>
 */
const translate = async () => {
	try {
		document.querySelectorAll('[data-translatable]').forEach(async (node) => {
			if (node) {
				const localization = window.localStorage.getItem('lang') || 'en';
				const langJson = await axios.get('../src/language/'+ localization + '/' +  localization + '.json');
				node.innerHTML = langJson.data[(node as HTMLElement).dataset.translate as string];
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export default translate;