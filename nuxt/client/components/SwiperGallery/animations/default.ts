import Swiper from 'swiper';
import type { SwiperOptions, SwiperEvents } from 'swiper/types';

export default (swiperOptions: MaybeRefOrGetter<SwiperOptions>, swiperHandlers: MaybeRefOrGetter<{ [event in keyof SwiperEvents]?: SwiperEvents[event] }>, el: HTMLElement) => {
	const options = {
		...toValue(swiperOptions),
		on: {
			...toValue(swiperHandlers),
		},
	};

	return new Swiper(el, options);
};
