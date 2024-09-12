export const useQueryHandler = () => {
	const router = useRouter();

	async function change(params: { [key: string]: string }, replace: boolean = true) {
		const query = { ...router.currentRoute.value.query };
		if (!Array.isArray(params) && typeof params === 'object') {
			Object.entries(params).forEach(([key, value]) => query[key] = value);
		}
		await router.push({ query, replace });
	}

	function remove(params: string[] | string, replace: boolean = true) {
		const query = { ...router.currentRoute.value.query };
		if (Array.isArray(params)) {
			params.forEach(param => delete query[param]);
		}
		else {
			delete query[params];
		}

		router.push({ query, replace });
	}

	return {
		change,
		remove,
	};
};
