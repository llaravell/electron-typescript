import axios from 'axios';

const translate = async (ids: string[]) => {
	try {
		ids.forEach(async (id: string) => {
			const element = document.getElementById(id);
			if (element) {
				const localization = window.localStorage.getItem('lang') || 'fa';
				const langJson = await axios.get('../src/language/'+ localization + '/' +  localization + '.json');
				element.innerHTML = langJson.data[element.innerText];
			}
		});
	} catch (error) {
		console.log(error);
	}
};

export default translate;