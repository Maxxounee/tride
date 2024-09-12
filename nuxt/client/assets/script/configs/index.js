const floatTexts = [
	{ title: 'СЕМЕЙНЫЙ ОТЕЛЬ', isBigTitle: true },
	{
		title: '4',
		text: 'по международным <br />стандартам',
		icon: {
			path: 'common/star',
			class: 'star',
		},
	},
	{ title: '2 280', text: 'номеров' },
	{ title: '15,7 га', text: 'территория' },
	{
		title: 'САМЫЙ БОЛЬШОЙ<br/>КОМПЛЕКС БАССЕЙНОВ<br/>В РОССИИ',
		isBigTitle: true,
		text: 'площадь «водного зеркала» <br />комплекса бассейнов',
	},
	{ title: 'Ultra All Inclusive', isBigTitle: true, text: 'система отдыха' },
	{ title: '1 кв. 2027', isBigTitle: true, text: 'срок сдачи' },
];

const genplan = {
	backgroundSrc: '/images/index/genplan/bg.webp',
	mainPoints: [
		{ top: 14, left: 29.5, text: 'Корпус «Select»' },
		{ top: 20, left: 13, text: 'Корпус «Residence 1»' },
		{ top: 32.5, left: 23, text: 'Корпус «Family»' },
		{ top: 25, left: 54, text: 'Корпус «Select 2»' },
		{ top: 31, left: 83, text: 'Корпус «Select 3»' },
		{ top: 49, left: 65, text: 'Корпус «Family 2»' },
	],
	extraPoints: [
		{ top: 33.5, left: 68.5, text: 'Детский центр', icon: 'child' },
		{ top: 40, left: 90, text: 'СПА центр', icon: 'spa' },
		{ top: 41.5, left: 77, text: 'Театр', icon: 'theatre' },
		{ top: 65, left: 64, text: 'Бассейн', icon: 'pool' },
	],
};
const privateBeach = {
	galleryItems: [
		{
			src: '/images/index/beach/00.png',
			text: 'Зоны отдыха <br />с лежаками',
			width: '17vw',
		},
		{
			src: '/images/index/beach/01.jpg',
			text: 'Снэк-бары',
			width: '21vw',
		},
		{
			src: '/images/index/beach/02.png',
			text: 'Площадка <br />для пляжного <br />волейбола',
			width: '17vw',
		},
		{
			src: '/images/index/beach/03.png',
			text: 'Детская игровая <br />площадка',
			width: '23vw',
		},
		{
			src: '/images/index/beach/04.png',
			text: 'Площадка <br />для воркаута',
			width: '21vw',
		},
	],
};

const projects = [
	[
		{
			id: 'sundent',
			text: 'SUNDENT - современная клиника, предоставляющая все виды стоматологических услуг для взрослых и детей.',
		},
		{
			id: 'montale',
			text: 'Приватный апартаментный комплекс в пос. Якорная щель, г. Сочи. Апартаментный комплекс включает всего 16 апартаментов, площадью 17 – 24 м<sup>2</sup>.',
		},
		{
			id: 'montvert',
			text: 'Семейный курорт сочетающий широкий спектр услуг, включенных в стоимость, и возможностей для отдыха и досуга семей с детьми любого возраста',
		},
		{
			id: 'giardini',
			text: 'Апартаментный комплекс из 17 трехэтажных вилл на площади в 1 гектар с завораживающей панорамой гор и Черного моря.',
		},
		{
			id: 'bergamo',
			text: 'Это приватный апартаментный комплекс в самом центре Красной поляны из 20 апартаментов на закрытой территории в 9 соток.',
		},
		{
			id: 'tivoli',
			text: 'Уютный отель для семейного отдыха, который расположен на побережье Чёрного моря в Лазаревском районе.',
		},
	],
	[
		{
			id: 'hpp',
			text: 'Инновационный метод консервации пищевых продуктов, в которой используется холодная вода и высокое давление.',
		},
		{
			id: 'eto',
			text: 'Чистая питьевая вода повышает защиту организма от стресса, разжижает кровь, борется с усталостью и стрессом, помогает сердечно-сосудистой системе.',
		},
		{
			id: 'iidtel',
			text: 'Современный и надежный интернет-провайдер',
		},
		{
			id: 'orange',
			text: 'Производим под Вашим брендом. СТМ наших продуктов под вашей торговой маркой.',
		},
		{
			id: 'liran',
			text: 'Производим под Вашим брендом. СТМ наших продуктов под вашей торговой маркой.',
		},
	],
];
const allProjectsInOne = projects.flat();
export {
	floatTexts,
	genplan,
	privateBeach,
	projects,
	allProjectsInOne,
};
