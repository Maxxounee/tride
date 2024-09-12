import {readdir} from 'node:fs/promises';
import path from 'node:path';

export default defineEventHandler(async (event) => {
	try {
		const body = await readBody(event);
		const readdirPath = path.join(process.cwd(), 'public', body.folder);
		const files = await readdir(readdirPath, {withFileTypes: true});

		return files.map(item => path.join(body.folder, item.name).replace(/\\/g, '/'));
	} catch (error) {
		console.log(error);
		return error;
	}
});
