import {joinURL} from 'ufo';

export default defineEventHandler(async (event) => {
	try {
		const ADMIN_URL = useRuntimeConfig().public.adminUrl;
		const path = event.path.replace(/^\/api\/admin/, '/backend');
		const target = joinURL(ADMIN_URL, path);

		return proxyRequest(event, target);
	} catch (error) {
		return error;
	}
});
