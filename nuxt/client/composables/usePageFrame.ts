export default async function (templateName: string, adminRequestParams?: AdminRequestParams) {
	const {isMobileOrTablet} = useDevice();

	const nuxtApp = useNuxtApp();

	const split = templateName.split('/');

	let pageTemplate;

	if (isMobileOrTablet) {
		switch (split.length) {
			case 1:
				pageTemplate = defineAsyncComponent(() => import(`@/templatesm/${split[0]}.vue`));
				break;
			case 2:
				pageTemplate = defineAsyncComponent(() => import(`@/templatesm/${split[0]}/${split[1]}.vue`));
		}
	} else {
		switch (split.length) {
			case 1:
				pageTemplate = defineAsyncComponent(() => import(`@/templates/${split[0]}.vue`));
				break;
			case 2:
				pageTemplate = defineAsyncComponent(() => import(`@/templates/${split[0]}/${split[1]}.vue`));
		}
	}

	const adminDB = await getAdminDB(templateName, adminRequestParams);

	nuxtApp.runWithContext(() => useSeoMeta({
		title: adminDB?.pageInfo?.params?.title || templateName,
		description: adminDB?.pageInfo?.meta?.description || '',
	}));


	async function getAdminDB(templateName: string, adminRequestParams?: AdminRequestParams): Promise<AdminDB | null> {
		try {
			const request: any = {
				url: useRoute().path || templateName,
				...adminRequestParams,
			};
			const searchParams = new URLSearchParams(request).toString();
			const { data, error } = await useFetch(`/api/admin?${searchParams}`);

			if (error.value) {
				console.error(`[Failed to connect admin DB]`, error.value);
			}

			const pageInfo = data.value?.[0];

			return {
				pageInfo,
			};
		}
		catch (error) {
			return {
				pageInfo: undefined,
			};
		}
	}


	return {pageTemplate, pageInfo: adminDB?.pageInfo, response: adminDB.response};
}
