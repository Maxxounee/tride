import Swiper from 'swiper';
import type { SwiperOptions, SwiperEvents } from 'swiper/types';

interface AnimOptions {
	/**
	 * Сила сдвига внутренней части слайды 0 ... 1
	 * @default - 0.5
	 */
	strength?: number;
	/**
	 * Селектор по которому функция будет искать внутреннюю часть слайда
	 * @default - '.SwiperGallery__slide-inner'
	 */
	innerSelector?: string;
}

interface SlideElement extends HTMLElement {
	progress: number;
}

export default (
	swiperOptions: MaybeRefOrGetter<SwiperOptions>,
	swiperHandlers: MaybeRefOrGetter<{ [event in keyof SwiperEvents]?: SwiperEvents[event] }>,
	el: HTMLElement,
	animOptions?: AnimOptions,
) => {
	const parallaxStrength = animOptions?.strength ?? 0.5;
	const innerSelector = animOptions?.innerSelector ?? 'img';

	const options: SwiperOptions = {
		...toValue(swiperOptions),
		watchSlidesProgress: true,
		on: {
			...toValue(swiperHandlers),
			progress: (swiper) => {
				for (let i = 0; i < swiper.slides.length; i++) {
					const slide = swiper.slides[i] as SlideElement;

					const innerOffset = swiper.width * parallaxStrength;
					const innerTranslate = slide.progress * innerOffset;
					const innerElement = slide.querySelector<HTMLElement>(innerSelector);

					if (innerElement) {
						innerElement.style.transform = `translateX(${innerTranslate}px)`;
					}
				}
			},
			touchStart: (swiper) => {
				for (let i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = '';
				}
			},
			setTransition: (swiper, speed) => {
				for (let i = 0; i < swiper.slides.length; i++) {
					swiper.slides[i].style.transition = speed + 'ms';
					const innerElement = swiper.slides[i].querySelector<HTMLElement>(innerSelector);
					if (innerElement) {
						innerElement.style.transition = speed + 'ms';
					}
				}
			},
		},
	};

	return new Swiper(el, options);
};
