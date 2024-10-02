<template>
	<div class="image-blocks">
		<video muted autoplay loop src="/video/test.mp4"></video>
		<div class="canvas" ref="canvasContainer" style="width: 100%; height: 100vh;"></div>
	</div>
</template>

<script setup>
import * as TJS from '@/assets/script/tjs/index';

const canvasContainer = ref(null);

onMounted(async()=>{
	const gridImage = new TJS.GridImage({ container: canvasContainer.value });

	gridImage.init();

	await gridImage.addSquares({
		src: '/images/brullov.jpg',
		hCount: 8,
		vCount: 6,
	});

	gridImage.animate();
	gridImage.createControls();
	gridImage.initDevMode();
});
</script>

<style lang="scss">
.image-blocks {
	@include div100;

	video {
		@include div100;
	}

	.canvas {
		@include div100;

		// pointer-events: none;
	}

	.block {
		height: 100vh;
	}

	.title {
		@include center(x);

		bottom: 10rem;
		translate: calc(100% + 50vw);

		font-size: 20rem;

		transition-timing-function: var(--easeInOutQuart);
		transition-duration: 0.69s;
		transition-property: translate;

		&.active {
			translate: none;
		}
	}

}
</style>
