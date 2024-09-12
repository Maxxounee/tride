const locationMap = {
	title: `У курорта AleanResort<br/>
	Montvert 4* больше, чем<br/>
	удачное расположение`,
	titleWoBr: undefined,
	items: [
		{ mark: '50 минут ', text: ' от г. Сочи на комфортабельном шаттл-басе' },
		{ mark: '150 метров ', text: ' до ж/д станции «Якорная щель»' },
		{ mark: '1,5 часа ', text: ' до международного аэропорта' },
	],
};
locationMap.titleWoBr = locationMap.title.replace(/<br\s\/>|<br>/gi, ' ');

export {
	locationMap,
};
