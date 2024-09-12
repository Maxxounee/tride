<template>
	<div
		class="PopupVideo"
		:class="{ active: $route.query.video }"
	>
		<div
			class="PopupVideo__back"
			@mousemove.self="mouseActive = true"
			@mouseleave.self="mouseActive = false"
			@click.self="close"
		></div>
		<div class="PopupVideo__container">
			<video
				ref="video"
				playsinline
				controls
				muted
				pip="false"
				@canplay="playOnReady"
			></video>
		</div>
		<div
			class="PopupVideo__close"
			@click="close"
		>
			<NuxtIcon
				fill="none"
				name="ui/cross"
			/>
		</div>
	</div>
</template>

<script>

export default {
	props: {},
	data() {
		return {
			mouseActive: false,
			mouseLeft: 0,
			mouseTop: 0,
			src: '/video/project-video.mp4',
			queryHandler: null,
		};
	},
	watch: {
		'$route.query.video': {
			handler(value) {
				if (value) {
					this.videoProcessStart();
				} else {
					this.$refs.video.pause();
				}
			},
		},
	},
	setup() {
	},
	mounted() {
		this.queryHandler = useQueryHandler();
		if (this.$route.query.video) { this.videoProcessStart(); }
	},
	beforeDestroy() {
		// this.$nuxt.$off('mouseTrail', this.setMousePosition);
	},
	methods: {
		setMousePosition({ x, y }) {
			this.mouseLeft = x;
			this.mouseTop = y;
		},
		videoProcessStart() {
			this.$refs.video.pause();
			this.$refs.video.src = this.src;
			this.$refs.video.load();
			this.$refs.video.play();
		},
		playOnReady() {
			if (this.$route.query.video) {
				// this.$refs.video.play();
			}
		},
		close() {
			this.$refs.video.pause();

			this.queryHandler.remove('video');
		},
	},
};
</script>

<style lang="scss">

.PopupVideo {
	--duration: 700ms;
	--easing: var(--easeInOutQuart);

	@include div100(fixed);

	pointer-events: none;

	z-index: 69;

	opacity: 0;
	background-color: rgb(0 0 0 / 80%);

	transition-timing-function: var(--easing);
	transition-duration: var(--duration);
	transition-property: opacity;

	&__back {
		@include div100;
	}

	&__container {
		position: absolute;
		top: 50%;
		left: 50%;
		translate: -50% -50%;

		transition-timing-function: var(--easing);
		transition-duration: var(--duration);
		transition-property: translate;

		video {
			width: 100vw;
			max-width: unset;
			max-height: 100dvh;
			object-fit: contain;
		}
	}

	&__close {
		cursor: pointer;

		position: absolute;
		top: 3rem;
		right: 3rem;

		font-size: 5rem;
		color: white;

		svg {
			fill: none !important;
			fill-opacity: 0;
		}
	}

	&.active {
		pointer-events: auto;
		opacity: 1;
	}
}
</style>
