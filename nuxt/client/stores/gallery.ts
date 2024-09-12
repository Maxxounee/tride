export const useGalleryStore = defineStore('galleryStore', () => {
	const images = ref<string[]>([]);
	const previewImages: { src: string; title: string }[] = [
		{
			src: '/images/gallery/00.jpg',
			title: 'Территория',
		},
		{
			src: '/images/gallery/01.jpg',
			title: 'Номера',
		},
		{
			src: '/images/gallery/02.jpg',
			title: 'Моп',
		},
	]
	const previewImagesSrc: string[] = previewImages.map((item) => item.src);
	const previewImagesTitles: string[] = previewImages.map((item) => item.title);

	async function loadImages(): Promise<string[]> {
		return new Promise(async (resolve) => {
			try {
				$fetch<string[]>('/api/node/getFolderImages', {
					method: 'POST',
					body: {folder: `/images/gallery`},
				}).then((data: string[]): void => {
					images.value = data;
					console.log('then', data)
					resolve(data);
				});
			} catch (error) {
				resolve([]);
				console.error(`%c◥ [Failed to POST /api/node/getFolderImages]: \n\n %c%s`, 'color: #e31c4b; font-size: 18px;', 'color: white', error);
			}
		})
	}

	return {
		loadImages,
		images,
		previewImages,
		previewImagesSrc,
		previewImagesTitles,
	};
});
