import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';
import path from 'pathe';

export default defineEventHandler(async () => {
	try {
		const data = new Uint8Array(Buffer.from('Hello Node.js'));
		const filepath = path.join(process.cwd(), 'public/message.txt');
		await writeFile(filepath, data);
		// return promise;
		return 'asdlkfjlakskdfk;asldf';
	}
	catch (error) {
		return error;
	}
});
