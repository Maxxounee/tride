import puppeteer from 'puppeteer';

export default defineEventHandler(async () => {
	try {
		const browser = await puppeteer.launch();
		const page = await browser.newPage();
		await page.goto('/pdf');
	}
	catch (error) {
		console.log(error);
		return error;
	}
});
