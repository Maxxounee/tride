<template>
	<div class="SlideGallery">
		<EventsController
			ref="EventsController"
			:start="start"
			:max="images.length - 1"
			:cycle="cycle"
			:enabled="enabled"
			:numbers="numbers"
			:buttons="buttons"
			:swipe-enabled="swipe"
			:swipe-vertical="swipeVertical"
			:scroll-enabled="scroll"
			:scroll-timeout="scrollTimeout"
			:dots="dots"
			@change-event="changeEvent"
			@corner-event="cornerEvent"
		>
			<div
				ref="images"
				class="SlideGallery_images"
			/>
			<slot />
			<template #btn-prev>
				<slot name="btn-prev" />
			</template>
			<template #btn-next>
				<slot name="btn-next" />
			</template>
		</EventsController>
	</div>
</template>

<script>
import EventsController from '~/components/slideGallery/EventsController.vue';

export default {
	name: 'SlideGallery',
	components: {
		EventsController,
	},
	props: {
		images: {
			type: Array,
			default: () => [],
		},
		animation: {
			type: [String, Function],
			default: null,
		},
		duration: {
			type: Number,
			default: 800,
		},
		slideNext: {
			type: Number,
			default: 0.9,
		},
		slidePrevious: {
			type: Number,
			default: 0.1,
		},
		videoLoop: {
			type: Boolean,
			default: false,
		},
		videoAutoplay: {
			type: Boolean,
			default: true,
		},
		autoplay: {
			type: Number,
			default: undefined,
		},
		bgContain: {
			type: Boolean,
			default: false,
		},
		start: {
			type: Number,
			default: undefined,
		},
		cycle: {
			type: Boolean,
			default: true,
		},
		enabled: {
			type: Boolean,
			default: undefined,
		},
		numbers: {
			type: [Boolean, Function],
			default: undefined,
		},
		buttons: {
			type: Boolean,
			default: true,
		},
		swipe: {
			type: Boolean,
			default: undefined,
		},
		swipeVertical: {
			type: Boolean,
			default: undefined,
		},
		scroll: {
			type: Boolean,
			default: undefined,
		},
		scrollTimeout: {
			type: Number,
			default: undefined,
		},
		dots: {
			type: Boolean,
			default: undefined,
		},
	},
	emits: ['beforeLoad', 'beforeChange', 'cornerEvent', 'afterChange'],
	data() {
		return {
			autoplayTimeout: null,
			$gsap: null,
		};
	},
	computed: {
		_images() {
			return this.images.map((item) => {
				if (typeof item === 'string') {
					return {
						src: item,
					};
				}
				return item;
			});
		},
	},
	watch: {
		images(value) {
			this.$refs.EventsController.setCurrent(this.start);
			this.loadImage(
				this.$refs.EventsController.current,
				1,
				this.duration,
			);
		},
		autoplay() {
			this.automaticallyChangesSlides();
		},
	},
	beforeUnmount() {
		// this.$nuxt.$off('windowResize', this.resize);
		clearTimeout(this.autoplayTimeout);
	},
	mounted() {
		this.$gsap = useNuxtApp().$gsap;
		this.loadImage(this.$refs.EventsController.current, 0, 0);
	},
	methods: {
		changeEvent(value, direction) {
			this.loadImage(value, direction, this.duration);
		},
		cornerEvent(value) {
			this.$emit('cornerEvent', value);
		},
		'animation-opacity'(params) {
			params.$el.transition({ opacity: 1 }, params.duration, params.cb);
		},
		'animation-default'(params) {
			const src = params.$el.querySelector('.SlideGallery_src');
			const prevAll = this.prevAll(params.$el.querySelector('.SlideGallery_item'));

			this.$gsap.set(params.$el, {
				opacity: 1,
			});
			this.$gsap.from(params.$el, {
				// opacity: 1,
				xPercent: params.direction * 100,
				onComplete: params.cb,
			});
			this.$gsap.from(src, {
				// opacity: 1,
				xPercent: params.direction * -100 * this.slideNext,
				// onComplete: params.cb,
			});
			// this.$gsap.from(prevSrc, {
			// 	xPercent: params.direction * 100 * this.slidePrevious,
			// 	// onComplete: params.cb,
			// });
			// params.$el
			// 	  .css({ opacity: 1, x: `${params.direction * 100}%` })
			// 	  .transition({ x: '0%' }, params.duration, params.cb)
			// 	  .find('.SlideGallery_src')
			// 	  .css({ x: `${params.direction * -100 * this.slideNext}%` })
			// 	  .transition({ x: '0%' }, params.duration)
			// 	  .end()
			// 	  .prevAll('.SlideGallery_item')
			// 	  .find('.SlideGallery_src')
			// 	  .transition(
			// 		  { x: `${params.direction * -100 * this.slidePrevious}%` },
			// 		  params.duration,
			// 	  );
		},
		prevAll(element) {
			const result = [];

			while (element = element.previousElementSibling)
				result.push(element);
			return result;
		},
		loadImage(current, direction, duration) {
			clearTimeout(this.autoplayTimeout);
			const length = this._images.length;
			const item = this._images[current];
			if (length && item) {
				const isVideo = /\.mp4$/i.test(item.src);
				let $video;
				this.$emit('beforeLoad');
				this.$refs.images.innerHTML += `
					<div class="SlideGallery_item n${current}">
						<div class="SlideGallery_src">
							${
					isVideo
						? `<video class="SlideGallery_video" src="${
							item.src
						}" muted playsinline pip="false"${
							this.videoLoop ? ' loop' : ''
						}${
							this.videoAutoplay
								? ' autoplay'
								: ''
						}></video>`
						: `<div class="SlideGallery_image${
							this.bgContain ? ' contain' : ''
						}" style="background-image: url('${
							item.src
						}');"></div>`
				}
							${item.html ? `<div class="SlideGallery_html">${item.html}</div>` : ''}
						</div>
					</div>`;

				const $el = Array.from(this.$refs.images.querySelectorAll(
					'.SlideGallery_item',
				)).at(-1);
				const animateEl = () => {
					emit('beforeChange');
					let name = 'animation-default';
					if (typeof this.animation === 'function') {
						name = 'animation';
					}
					else if (this[`animation-${this.animation}`]) {
						name = `animation-${this.animation}`;
					}
					this[name]({
						$el,
						direction,
						duration,
						cb: () => {
							// $el.prevAll('.SlideGallery_item').remove();
							$el.previousElementSibling.remove();
							if (isVideo && !this.videoAutoplay) {
								$video[0].play();
							}
							emit('afterChange');
							this.automaticallyChangesSlides();
						},
					});
				};
				const emit = (name) => {
					this.$emit(name, {
						$el,
						current,
						length,
						direction,
						duration,
						item,
						isVideo,
					});
				};
				if (isVideo) {
					$video = $el.find('.SlideGallery_video');
					$video[0].addEventListener(
						'loadedmetadata',
						() => {
							this.$elementScaleInside(
								$video,
								$video[0].videoWidth / $video[0].videoHeight,
								this.bgContain,
							);
							animateEl();
						},
						{ once: true },
					);
				}
				else {
					let hiddenImg = new Image();
					hiddenImg.onload = (e) => {
						hiddenImg = null;
						animateEl();
					};
					hiddenImg.src = item.src;
				}
			}
		},
		resize() {
			const _this = this;
			$(this.$refs.images)
				.find('.SlideGallery_video')
				.each(function () {
					const $video = $(this);
					_this.$elementScaleInside(
						$video,
						$video[0].videoWidth / $video[0].videoHeight,
						_this.bgContain,
					);
				});
		},
		automaticallyChangesSlides() {
			clearTimeout(this.autoplayTimeout);
			if (this.autoplay) {
				this.autoplayTimeout = setTimeout(() => {
					this.$refs.EventsController.change({ delta: 1 });
				}, this.autoplay);
			}
		},
		setSlide({ target, delta }) {
			this.$refs.EventsController.change({ target, delta, forced: true });
		},
	},
};
</script>

<style lang="scss">
.SlideGallery {
	&,
	&_images,
	&_item,
	&_src,
	&_image,
	&_video {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
	}

	&_images,
	&_item {
		overflow: hidden;
	}

	&_item {
		opacity: 0;
	}

	&_image {
		background-repeat: no-repeat;
		background-position: center center;
		background-size: cover;

		&.contain {
			background-size: contain;
		}
	}

	&_html {
		position: absolute;
	}
}
</style>
