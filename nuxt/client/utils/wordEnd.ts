interface SuffixesTypes {
	apartments: [string, string, string];
	rooms: [string, string, string];
	lots: [string, string, string];
	hotelRoom: [string, string, string];
	floors: [string, string, string];
	levels: [string, string, string];
}

/**
 * apartments - 1 квартира, 2 квартиры, 5 квартир;
 *
 * rooms - 1 комната, 2 комнаты, 5 комнат
 *
 * lots -
 *
 * hotelRoom - 1 номер, 2 номера, 5 номеров
 *
 * floors - 1 этаж, 2 этажа, 5 этажей
 *
 * levels - 1 уровень, 2 уровня. 5 уровней
 */
export default (number: number | null | undefined, type: keyof SuffixesTypes = 'apartments') => {
	if (number === null || number === undefined) {
		return '';
	}
	const plural = new Intl.PluralRules('ru-RU');
	const getSuffixMap = (suffixes: [string, string, string]) => new Map([['one', suffixes[0]], ['few', suffixes[1]], ['many', suffixes[2]], ['other', '']]);
	const suffixes = {
		apartments: ['а', 'ы', ''],
		rooms: ['а', 'ы', ''],
		lots: ['', 'ы', ''],
		hotelRoom: ['', 'а', 'ов'],
		floors: ['', 'a', 'ей'],
		levels: ['ень', 'ня', 'ней'],
	};
	const suffixesMaped = Object.entries(suffixes).reduce((acc: any, [key, value]: any) => {
		acc[key] = getSuffixMap(value);
		return acc;
	}, {});
	const rule = plural.select(number);
	return suffixesMaped[type].get(rule);
};
