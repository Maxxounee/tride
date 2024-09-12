export const useCallbackStore = defineStore('callbackStore', () => {
	const active = ref<boolean>(false);
	const show = (): void => {
		active.value = true
	};
	const hide = (): void => {
		active.value = false
	};

	return {
		active,
		show,
		hide,
	};
});
