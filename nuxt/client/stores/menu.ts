export const useMenuStore = defineStore('menuStore', () => {
	const route = useRoute();

	const mainLinks = ref([
		{to: '/', text: 'О проекте'},
		{to: '/location', text: 'Расположение'},
		{to: '/infrastructure', text: 'Инфраструктура'},
		{to: '/operator', text: 'Отельный оператор'},
		{to: '/plans', text: 'Номера'},
		{to: '/contacts', text: 'Контакты'},
	]);

	const sideLinks = ref([
		{to: '/gallery', text: 'Галерея'},
		// {to: '/tour', text: 'Виртуальный тур'},
		// {to: {query: {video: 'project'}}, text: 'Видео о проекте'},
		{to: '/documents', text: 'Документы'},
		{to: '/news', text: 'Новости'},
		{to: '/mortgage', text: 'Ипотечные программы'},
	]);
	const isMenuOpened = ref(false);
	const toggleMenu = () => isMenuOpened.value = !isMenuOpened.value;
	const closeMenu = () => isMenuOpened.value = false;
	const openMenu = () => isMenuOpened.value = true;
	watch(() => route.fullPath, closeMenu);

	return {
		mainLinks,
		sideLinks,

		isMenuOpened,
		toggleMenu,
		closeMenu,
		openMenu,
	};
});
