type OperatorCard = {
	icon: string;
	title: string;
	text: string;
};
const cards: OperatorCard[] = [
	{
		icon: 'common/chair',
		title: '>1000',
		text: 'Комфортных<br/>номеров',
	},
	{
		icon: 'common/wallet',
		title: '>70%',
		text: 'Доля прямых<br/>продаж',
	},
	{
		icon: 'common/people',
		title: '>300 000',
		text: 'Участников<br/>программы лояльности',
	},
	{
		icon: 'common/graph',
		title: '98%',
		text: 'Индекс<br/>удовлетворенности',
	},
	{
		icon: 'common/sun',
		title: '60%',
		text: 'Гостей<br/>возвращаются',
	},
];

type AdvantagesCard = {
	image: string;
	title: string;
	text: string;
};
const advantages: AdvantagesCard[] = [
	{
		image: '/images/operator/advantages/00.png',
		title: 'Программа лояльности',
		text: `Собственная программа лояльности включает бонусные баллы,
		персонального менеджера, гостевое посещение другого курорта
		сети и многое другое.`,
	},
	{
		image: '/images/operator/advantages/01.png',
		title: 'Известный бренд',
		text: `Бренд знают по всему миру. Отели Alean Collection являются
		обладателями престижной международной премии World Luxury
		Hotel Awards, которая проводится с 2006 года.`,
	},
	{
		image: '/images/operator/advantages/02.png',
		title: 'Уникальная концепция',
		text: `Курорты Alean Collection развиваются по долгосрочной стратегии,
		следуя концепции Устойчивого развития, сформулированной ООН
		и затрагивающей экономические, экологические и социальные
		аспекты деятельности. Это уникальный пример на российском рынке.`,
	},
	{
		image: '/images/operator/advantages/03.png',
		title: 'Система дистрибуции ',
		text: `Операционная рентабельность курортов выше рыночных
		показателей, благодаря развитой системе продаж, маркетинга
		и дистрибуции, эффективной программе лояльности, системе
		управления доходами и регулярному контролю расходов.`,
	},
	{
		image: '/images/operator/advantages/04.png',
		title: `Лидерство в сегменте<br/>
		отдыха с детьми`,
		text: `Сеть Alean Collection объединяет семейные курорты, расположенные
		в городах-жемчужинах черноморского побережья. Все они создают
		условия для беззаботного отдыха с детьми любого возраста.`,
	},
	{
		image: '/images/operator/advantages/05.png',
		title: `Фокус на потребности<br/>
		аудитории`,
		text: `Отельный оператор четкой знает свою аудиторию,
		ориентируется на менталитет и вкусы российских туристов.`,
	},
];
export {
	cards,
	advantages,
};
