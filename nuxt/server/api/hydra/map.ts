export default defineEventHandler(async () => {
	const ADMIN_URL = useRuntimeConfig().adminUrl;
	const API_PATH = ADMIN_URL + '/backend/hydra/map';
	const data: LivingObject = await $fetch(API_PATH);
	return data;
});
