<template>
	<div
		class="SwiperGallery"
		:class="[`SwiperGallery_${animation}`]"
		@click="wrapperClickHandler"
	>
		<div class="SwiperGallery__wrapper">
			<slot />
		</div>
	</div>
</template>

<script lang="ts">
import type { SwiperOptions } from 'swiper/types';
import Swiper from 'swiper';
import { EffectFade, EffectCreative, FreeMode } from 'swiper/modules';

export default {
	props: {
		images: {
			type: Array,
			default: () => ([]),
		},
		loop: {
			type: Boolean,
			default: false,
		},
		imagesLazy: {
			type: Boolean,
			default: true,
		},
		lazyPreloadPrevNext: {
			type: Number,
			default: 4,
		},
		imagesToIpx: {
			type: Boolean,
			default: true,
		},
		ipxOptions: {
			type: Object,
			default: () => ({}),
		},
		speed: {
			type: Number,
			default: 600,
		},
		grabCursor: {
			type: Boolean,
			default: true,
		},
		animation: {
			type: String,
			default: 'default',
			validator(value) {
				return [
					'default',
					'parallax',
					'fade',
					'circle',
				].includes(value);
			},
		},
		parallaxStrength: {
			type: Number,
			default: 0.5,
		},
		changeSlideByClick: {
			type: Boolean,
			default: true,
		},
		slidesPerView: {
			type: [String, Number],
			default: 1,
		},
		spaceBetween: {
			type: Number,
			default: 1,
		},
		swiperAdditionalOptions: {
			type: Object as PropType<SwiperOptions>,
			default: () => ({}),
		},
	},
	emits: ['change', 'corner'],
	data() {
		return {
			instance: null,
			activeIndex: 0,
			animationFunctionDict: {
				default: this.$animationDefault,
				parallax: this.$animationParallax,
				fade: this.$animationFade,
				circle: this.$animationCircle,
			},
			swiperUseDict: {
				fade: EffectFade,
			},
			swiperOptions: {
				loop: this.loop,
				speed: this.speed,
				grabCursor: this.grabCursor,
				wrapperClass: 'SwiperGallery__wrapper',
				slideClass: 'SwiperGallerySlide',
				slidesPerView: this.slidesPerView,
				spaceBetween: this.spaceBetween,
				...this.swiperAdditionalOptions,
			},
			swiperHandlers: {
				reachBeginning: (swiper) => {
					this.$emit('corner', -1);
				},
				reachEnd: (swiper) => {
					this.$emit('corner', 1);
				},
				realIndexChange: (swiper) => {
					this.activeIndex = swiper.activeIndex;
					this.$emit('change', swiper.activeIndex);
				},
			},
		};
	},
	mounted() {
		this.swiperUseDict[this.animation] && Swiper.use(this.swiperUseDict[this.animation]);

		Swiper.use(EffectCreative);
		Swiper.use(FreeMode);
		Swiper.use(EffectFade);

		this.instance = this.animationFunctionDict[this.animation]?.();
	},
	methods: {
		$animationParallax() {
			const swiperOptions = {
				...this.swiperOptions,
				watchSlidesProgress: true,
				on: {
					...this.swiperHandlers,
					progress: (swiper) => {
						for (let i = 0; i < swiper.slides.length; i++) {
							const slideProgress = swiper.slides[i].progress;
							const innerOffset = swiper.width * this.parallaxStrength;
							const innerTranslate = slideProgress * innerOffset;

							const inner = swiper.slides[i].querySelector('.SwiperGallerySlide__inner');
							if (inner) {
								inner.style.transform = `translateX(${innerTranslate}px)`;
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

							const inner = swiper.slides[i].querySelector('.SwiperGallerySlide__inner');
							if (inner) {
								inner.style.transition = speed + 'ms';
							}
						}
					},
				},
			};

			return new Swiper(this.$el, swiperOptions);
		},
		$animationCircle() {
			const getDistanceFromCenter = () => {
				const { width, height } = this.$el.getBoundingClientRect();
				return Math.sqrt((width / 2) ** 2 + (height / 2) ** 2);
			};
			const setValues = (swiper) => {
				for (let i = 0; i < swiper.slides.length; i++) {
					const slideEl = swiper.slides[i];
					let offset = -1 * slideEl.swiperSlideOffset;

					if (!swiper.params.virtualTranslate) { offset -= swiper.translate; }

					const value = Math.max(1 + Math.min(slideEl.progress, 0), 0);

					const targetEl = swiper.slides[i];

					targetEl.style.transform = `translate3d(${offset}px, 0px, 0px)`;

					swiper.slides[i].style.clipPath = `circle(${getDistanceFromCenter() * (value)}px)`;
				}
			};
			const swiperOptions = {
				...this.swiperOptions,
				watchSlidesProgress: true,
				on: {
					...this.swiperHandlers,
					init: setValues,
					setTranslate: setValues,
					setTransition: (swiper, speed) => {
						for (let i = 0; i < swiper.slides.length; i++) {
							swiper.slides[i].style.transition = speed + 'ms';
							swiper.slides[i].querySelector('.SwiperGallerySlide__inner').style.transition = speed + 'ms';
						}
					},
				},

			};

			return new Swiper(this.$el, swiperOptions);
		},
		$animationFade() {
			const swiperOptions = {
				...this.swiperOptions,
				effect: 'fade',
				on: {
					...this.swiperHandlers,
				},
			};

			return new Swiper(this.$el, swiperOptions);
		},
		$animationDefault() {
			const swiperOptions = {
				...this.swiperOptions,
				on: {
					...this.swiperHandlers,
				},
			};

			return new Swiper(this.$el, swiperOptions);
		},
		setSlide({ target, direction, speed, runCallbacks = true }) {
			if (!this.instance) { return; }

			if (target) {
				this.instance[this.loop ? 'slideToLoop' : 'slideTo'](target, speed, runCallbacks);
			}
			else if (direction) {
				this.instance[direction > 0 ? 'slideNext' : 'slidePrev'](speed, runCallbacks);
			}
		},
		getInstance() {
			return this.instance;
		},
		wrapperClickHandler(event) {
			if (!this.changeSlideByClick) { return; }
			const { left, width } = this.$el.getBoundingClientRect();
			const setSlideDirection = ((event.pageX - left) / width) > 0.5 ? 1 : -1;

			this.setSlide({ direction: setSlideDirection });
		},
	},
};
</script>

<style lang="scss">
@import "style";
@import "swiper/swiper-bundle.css";

.SwiperGallery {
}
</style>
