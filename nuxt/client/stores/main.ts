export const useMainStore = defineStore('mainStore', () => {
	const route = useRoute();

	/* ==================== DATA ==================== */
	const socials = ref([
		{id: 'vk', href: 'https://vk.com/aleanresort'},
		{id: 'tg', href: 'https://t.me/Alean_Resort_Montvert'},
		// { id: 'ig', href: 'https://instagram.com/alean_montvert_sochi' },
	]);
	const phone = '8 (800) 500-93-93';
	const publicOfferText = ref('Любая информация, представленная на сайте, носит информационный характер и не является публичной офертой. Раскрытие информации Застройщиком (в том числе размещение проектных деклараций и иных обязательных документов) в соответствии со статьей 3.1. Федерального закона от 30.12.2004 N 214-ФЗ');
	const email = 'sale@alean.ru';
	const address = 'г. Сочи, пгт. Дагомыс,<br/>ул. Гайдара, 3А/1';
	const yaMapsLink = ref('https://www.google.com/maps/place/%D1%83%D0%BB.+%D0%93%D0%B0%D0%B9%D0%B4%D0%B0%D1%80%D0%B0,+3%D0%B0,+%D0%A1%D0%BE%D1%87%D0%B8,+%D0%9A%D1%80%D0%B0%D1%81%D0%BD%D0%BE%D0%B4%D0%B0%D1%80%D1%81%D0%BA%D0%B8%D0%B9+%D0%BA%D1%80%D0%B0%D0%B9,+354207/data=!4m2!3m1!1s0x40f4335d773aa849:0x9e38a4a6357bca17?sa=X&ved=1t:242&ictx=111');

	/* ==================== MENU ==================== */
	const isMenuOpened = ref(false);
	const toggleMenu = () => isMenuOpened.value = !isMenuOpened.value;
	const closeMenu = () => isMenuOpened.value = false;
	watch(() => route.fullPath, closeMenu);

	/* ==================== WINDOWS RESIZE ==================== */
	const windowSize = useWindowSize();
	const windowInitialWidth = ref(1920);
	const windowInitialHeight = ref(1080);
	const fontSize = computed(() => Math.round(10 * Math.sqrt((windowSize.width.value * windowSize.height.value) / (windowInitialWidth.value * windowInitialHeight.value))));
	return {
		phone,
		socials,
		publicOfferText,
		email,
		address,
		yaMapsLink,

		isMenuOpened,
		toggleMenu,
		closeMenu,

		windowInitialWidth,
		windowInitialHeight,
		fontSize,
	};
});
