import {joinURL} from 'ufo';

export default defineEventHandler(async (event) => {
	try {
		const query = getQuery(event);
		const ADMIN_URL = useRuntimeConfig().public.adminUrl;
		const target = joinURL(ADMIN_URL, '/backend/getContent');
		const response = await $fetch(target, {query});

		return response;
	} catch (error) {
		return error;
	}
});
