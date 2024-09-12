export default defineNuxtPlugin(() => {
	const router = useRouter();
	const lastRoute = ref();

	router.afterEach((to, from) => {
		if (from !== router.currentRoute.value) {
			lastRoute.value = from;
		}
	});
	return {
		provide: {
			lastRoute,
		},
	};
});
