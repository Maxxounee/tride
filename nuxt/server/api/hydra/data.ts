export default defineEventHandler(async () => {
	try {
		const ADMIN_URL = useRuntimeConfig().public.adminUrl;
		const API_PATH = ADMIN_URL + '/backend/hydra/data';

		const data: LivingObject = await $fetch(API_PATH);
		return data;
	}
	catch (error) {
		return error;
	}
});
