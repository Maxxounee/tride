const items: {}[] = [
	{
		image: '/images/infrastructure/info-blocks/00.png',
		title: 'Развлечения',
		list: [
			'Программы от аниматоров',
			'Танцевальные площадки',
			'Игровые зоны',
			'Коммерческие игровые комплексы',
			'Залы с VR-играми',
			'Батуты',
			'Кинотеатр',
			'Бильярдная',
			'Ночной клуб',
			'Концертный зал',
		],
	},
	{
		image: '/images/infrastructure/info-blocks/01.png',
		title: 'Спорт',
		list: [
			'Академия трекинга',
			'Теннисный корт',
			'Центр водного спорта',
			'Мини-футбол',
			'Волейбол',
			'Баскетбол',
			'Фитнес-студия и тренажерный зал',
			'Зона workout',
			'Настольный теннис',
			'Пляжный волейбол',
		],
	},
	{
		image: '/images/infrastructure/info-blocks/02.png',
		title: 'Пляж',
		list: [
			'Полее 800 м частной территории',
			'Зона отдыха с лежаками',
			'Снэк-бары',
			'Пляжный волейбол',
			'Площадка workout',
			'Детская игровая площадка',
			'Пункт проката водного оборудования',
		],
	},
	{
		image: '/images/infrastructure/info-blocks/03.png',
		title: 'Бассейны и аквапарк ',
		list: [
			'Самый большой на Черноморском побережье России комплекс открытых подогреваемых бассейнов. Площадь «водного зеркала» — 6 087 м<sup>2</sup>!',
			'Крытый аквапарк'
		],
	},
	{
		image: '/images/infrastructure/info-blocks/04.png',
		title: 'Детский досуг',
		list: [
			'Детские клубы по возрастам',
			'Гейм-центр',
			'Мини-кинотеатр',
			'Детский тематический парк',
			'Творческая и кулинарная студии',
			'Интерактивная студия',
			'Цирковой акробатический центр',
			'Анимационная эстрада',
			'Лаундж для тинейджеров',
		],
	},
	{
		image: '/images/infrastructure/info-blocks/05.png',
		title: 'Питание и напитки',
		list: [
			'3 ресторана',
			'9 баров и кафе',
			'Кондитерская',
		],
	},
	{
		image: '/images/infrastructure/info-blocks/06.png',
		title: 'Красота и здоровье',
		list: [
			'SPA-центр красоты и здоровья',
			'Индивидуальные бани',
			'Термальный комплекс',
		],
	},
	{
		image: '/images/infrastructure/info-blocks/07.png',
		title: 'Бизнес и MICE-туризм',
		list: [
			'Коворкинг',
			'Конференц-зал на 1500 человек',
			'Площадки для масштабных мероприятий: концертов, тимбилдингов, корпоративов',
		],
	},
	{
		image: '/images/infrastructure/info-blocks/08.png',
		title: 'Ритейл-зоны',
	},
]

const guest = {
	cards: [
		{
			image: '/images/infrastructure/guest/00.png',
			background: 'var(--color-sun)',
			title: 'Больше, чем<br/>семейный досуг',
			text: `Посещайте анимационные программы для детей<br/>
			и взрослых. Проводите время на пляже и в самом<br/>
			большой комплексе бассейнов на Черноморском<br/>
			побережье России. Отдыхайте в современном «Центре<br/>
			красоты и здоровья» или занимайтесь спортом.`,
			textNoBr: undefined,
		},
		{
			image: '/images/infrastructure/guest/01.png',
			background: 'var(--color-sea)',
			title: 'Питание Ultra All<br/>Inclusive для тех,<br/>кто хочет большего',
			text: `Весь день наслаждайтесь изысканными<br/>
			блюдами в ресторане и пробуйте снэки в кафе.`,
			textNoBr: undefined,
		},
	],
}
guest.cards.forEach((item) => {
	item.textNoBr = item.text.replace(/<br\s\/>|<br>/gi, '')
})
export {items, guest};
