import { skipHydrate } from 'pinia';

export const useFavoritesStore = defineStore('favoritesStore', () => {
	const mainStore = useMainStore();

	const favorites = ref({
		living: useLocalStorage('favorites-living', [] as string[] | null, { writeDefaults: false }),
		com: useLocalStorage('favorites-com', [] as string[] | null, { writeDefaults: false }),
		park: useLocalStorage('favorites-park', [] as string[] | null, { writeDefaults: false }),
		storage: useLocalStorage('favorites-storage', [] as string[] | null, { writeDefaults: false }),
	});

	function add(id: string, type: LotsType = 'living') {
		favorites.value[type]?.push(id);
	}
	function remove(id: string, type: LotsType = 'living') {
		const index = favorites.value[type]?.indexOf(id) ?? -1;
		index !== -1 && favorites.value[type]?.splice(index, 1);
	}
	function toggle(id: string, type: LotsType = 'living') {
		favorites.value[type]?.includes(id) ? remove(id, type) : add(id, type);
	}

	type ButtonThemes = 'orange' | 'black';
	const buttonTheme = ref<ButtonThemes>('black');
	watchEffect(() => buttonTheme.value = mainStore.isMenuOpened ? 'orange' : 'black');

	return {
		favorites: skipHydrate(favorites),
		add,
		remove,
		toggle,
		buttonTheme,
	};
});
