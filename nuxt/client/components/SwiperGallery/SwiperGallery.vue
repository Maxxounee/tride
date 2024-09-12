<template>
	<div
		class="SwiperGallery"
		:class="[
			`_${animation}`
		]"
		@click="wrapperClickHandler"
	>
		<div class="SwiperGallery__wrapper">
			<div
				v-for="(slide, index) in imagesToIpx ? ipxImages : images"
				:key="index"
				class="SwiperGallery__slide"
			>
				<img
					:src="slide"
					:loading="imagesLazy ? 'lazy' : null"
					:style="{
						...($checkIsContain({ src: slide }) ? imageStyle.contain : {}),
					}"
				/>
				<div class="swiper-lazy-preloader" v-if="imagesLazy"></div>
			</div>
			<slot></slot>
		</div>
	</div>
</template>
<script>
import Swiper from 'swiper';
import { EffectFade, EffectCreative, FreeMode, EffectCoverflow, Controller } from 'swiper/modules';

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
			default: 'parallax',
			validator(value) {
				return [
					'default',
					'parallax',
					'fade',
					'circle',
					'coverflow',
					'sideDecrease',
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
		checkContainingStringInSrc: {
			type: Boolean,
			default: true,
		},
		initialSlide: {
			type: Number,
			default: 0,
		},
		centeredSlides: {
			type: Boolean,
			default: false,
		},
		zoom: {
			type: Boolean,
			default: false,
		},
		followFinger: {
			type: Boolean,
			default: true,
		},
		freeMode: {
			type: Boolean,
			default: false,
		},
		thumbs: {
			type: Object,
			default: undefined,
		},
		slideToClickedSlide: {
			type: Boolean,
			default: false,
		},
	},
	emits: ['change', 'corner', 'init'],
	data() {
		return {
			instance: null,
			onChangeEmitsRunning: true,
			activeIndex: 0,
			animationFunctionDict: {
				default: this.$animationDefault,
				parallax: this.$animationParallax,
				fade: this.$animationFade,
				circle: this.$animationCircle,
				coverflow: this.$animationCoverflow,
				sideDecrease: this.$animationSideDecrease,
			},
			swiperUseDict: {
				fade: EffectFade,
			},
			swiperOptions: {
				loop: this.loop,
				speed: this.speed,
				grabCursor: this.grabCursor,
				wrapperClass: 'SwiperGallery__wrapper',
				slideClass: 'SwiperGallery__slide',
				slidesPerView: this.slidesPerView,
				spaceBetween: this.spaceBetween,
				initialSlide: this.initialSlide,
				centeredSlides: this.centeredSlides,
				zoom: this.zoom,
				followFinger: this.followFinger,
				freeMode: this.freeMode,
				thumbs: this.thumbs,
				slideToClickedSlide: this.slideToClickedSlide,
			},
			swiperHandlers: {
				reachBeginning: (swiper) => {
					if (this.onChangeEmitsRunning) {
						this.$emit('corner', -1);
					}
					this.onChangeEmitsRunning = true;
				},
				reachEnd: (swiper) => {
					if (this.onChangeEmitsRunning) {
						this.$emit('corner', 1);
					}
					this.onChangeEmitsRunning = true;
				},
				realIndexChange: (swiper) => {
					this.activeIndex = swiper.activeIndex;

					if (this.onChangeEmitsRunning) {
						console.log('change');
						this.$emit('change', swiper.activeIndex);
					}
					this.onChangeEmitsRunning = true;
				},
				afterInit: (swiper) => {
					this.$emit('init', this.instance);
				},
			},
			imageStyle: {
				contain: { objectFit: 'contain' },
			},
		};
	},
	computed: {
		ipxImages() {
			const ipxOptions = {
				quality: 80,
				format: 'webp',
				...this.ipxOptions,
			};
			const img = useImage();
			return this.images.map((src) => img(src, ipxOptions));
		},
	},
	watch: {
		async images() {
			await this.$nextTick();
			this.instance?.destroy();
			this.instance = this.animationFunctionDict[this.animation]?.();
		},
	},
	mounted() {
		this.swiperUseDict[this.animation] && Swiper.use(this.swiperUseDict[this.animation]);

		Swiper.use(EffectCreative);
		Swiper.use(FreeMode);
		Swiper.use(EffectFade);
		Swiper.use(EffectCoverflow);

		this.instance = this.animationFunctionDict[this.animation]?.();
	},
	methods: {
		$checkIsContain({ src }) {
			return this.checkContainingStringInSrc && /__contain/.test(src);
		},
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

							const img = swiper.slides[i].querySelector('img');
							if (img) {
								img.style.transform = `translateX(${innerTranslate}px)`;
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

							const img = swiper.slides[i].querySelector('img');
							if (img) {
								img.style.transition = speed + 'ms';
							}
						}
					},
				},
			};

			return new Swiper(this.$el, swiperOptions);
		},
		$animationSideDecrease() {
			const swiperOptions = {
				...this.swiperOptions,
				effect: 'creative',
				creativeEffect: {
					prev: {
						scale: 0.8,
						translate: ['-120%', 0, -0],
					},
					next: {
						scale: 0.8,
						translate: ['120%', 0, 0],
					},
				},
				on: {
					...this.swiperHandlers,
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

					if (swiper.slides[i - 1]) {
						swiper.slides[i - 1].querySelector('img').style.scale = 1 + value * this.circleAnimationConfig.prevScaleModifier;
					} else {
						swiper.slides[i].querySelector('img').style.scale = 1;
					}
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
							swiper.slides[i].querySelector('img').style.transition = speed + 'ms';
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
		$animationCoverflow() {
			const swiperOptions = {
				...this.swiperOptions,
				effect: 'coverflow',
				on: {
					...this.swiperHandlers,
				},
			};

			return new Swiper(this.$el, swiperOptions);
		},
		setSlide({ target, direction, speed, runCallbacks = true, runEmits = true }) {
			if (!this.instance) { return; }
			this.onChangeEmitsRunning = runEmits;

			if (target) {
				this.instance[this.loop ? 'slideToLoop' : 'slideTo'](target, speed, runCallbacks);
			} else if (direction) {
				this.instance[direction > 0 ? 'slideNext' : 'slidePrev'](speed, runCallbacks);
			}
		},
		getInstance() {
			return this.instance;
		},
		update() {
			this.instance.update();
		},
		wrapperClickHandler(event) {
			if (!this.changeSlideByClick || this.slidesPerView !== 1) { return; }

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
/* stylelint-disable */
.SwiperGallery {
	@include div100;

	// left: 50%;
	// width: 50%;

	.swiper-slide {
		overflow: hidden;

		img {
			// transition: transform 0.7s ease;
			// object-fit: contain;
		}

		div {
			@include div100;
			@include bgInclude;
		}
	}

	&._parallax {
		.SwiperGallery__slide {
			overflow: hidden;
		}
	}
}
</style>
