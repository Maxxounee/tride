import Swiper from 'swiper';
import type { SwiperOptions, SwiperEvents } from 'swiper/types';

interface AnimOptions {
	/**
	 * Селектор по которому функция будет искать внутреннюю часть слайда
	 * @default - '.SwiperGallery__slide-inner'
	*/
	innerSelector?: string;
}

interface SlideElement extends HTMLElement {
	progress: number;
	swiperSlideOffset: number;
}

export default (
	swiperOptions: MaybeRefOrGetter<SwiperOptions>,
	swiperHandlers: MaybeRefOrGetter<{ [event in keyof SwiperEvents]?: SwiperEvents[event] }>,
	el: HTMLElement,
	animOptions?: AnimOptions,
) => {
	const innerSelector = animOptions?.innerSelector ?? '.SwiperGallery__slide-inner';

	const getDistanceFromCenter = () => {
		const { width, height } = el.getBoundingClientRect();
		return Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
	};
	const setValues = (swiper: Swiper) => {
		for (let i = 0; i < swiper.slides.length; i++) {
			const slideEl = swiper.slides[i] as SlideElement;
			let offset = -1 * slideEl.swiperSlideOffset;

			if (!swiper.params.virtualTranslate) offset -= swiper.translate;

			const value = Math.max(1 + Math.min(slideEl.progress, 0), 0);

			const targetEl = swiper.slides[i];

			targetEl.style.transform = `translate3d(${offset}px, 0px, 0px)`;

			swiper.slides[i].style.clipPath = `circle(${getDistanceFromCenter() * (value)}px)`;

			// if (swiper.slides[i - 1]) {
			// 	swiper.slides[i - 1].querySelector('img').style.scale = 1 + value * this.circleAnimationConfig.prevScaleModifier;
			// } else {
			// 	swiper.slides[i].querySelector('img').style.scale = 1;
			// }
		}
	};

	const options: SwiperOptions = {
		...toValue(swiperOptions),
		watchSlidesProgress: true,
		on: {
			...toValue(swiperHandlers),
			init: setValues,
			setTranslate: setValues,
			setTransition: (swiper, speed) => {
				for (let i = 0; i < swiper.slides.length; i++) {
					const innerElement = swiper.slides[i].querySelector(innerSelector) as HTMLElement;
					swiper.slides[i].style.transition = speed + 'ms';
					if (innerElement) {
						innerElement.style.transition = speed + 'ms';
					}
				}
			},
		},
	};

	return new Swiper(el, options);
};
