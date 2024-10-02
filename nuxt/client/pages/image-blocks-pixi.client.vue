<template>
	<div class="image-blocks-pixi">
		<div class="image-blocks-pixi__content">

			<video muted autoplay loop src="/video/test.mp4"></video>
			<div class="canvas" ref="canvasContainer" style="width: 100%; height: 100vh;"></div>
			<div class="block"></div>
			<div class="block"></div>
			<div class="block"></div>
			<div class="block"></div>
			<div class="block"></div>
			<div class="block"></div>
			<div class="block"></div>
		</div>
	</div>
</template>

<script setup>
const PIXI = window.PIXI;
const canvasContainer = ref();

const config = {
	0: { opacity: [0.7, 0] },
	9: { opacity: [0.7, 0] },
	8: { opacity: [0.7, 0] },

	10: { opacity: [0, 0.8] },
	11: { opacity: [0, 0.8] },

	20: { opacity: [0.2, 0.8] },
	21: { opacity: [0.2, 0.8] },

	29: { opacity: [0.2, 0.8] },
	39: { opacity: [0.2, 0.8] },
	49: { opacity: [0.2, 0.8] },
	59: { opacity: [0.2, 0.8], y: [10, 0], x: [10, 0] },
	69: { opacity: [0.2, 0.8], y: [17, 0], x: [14, 0] },
	78: { opacity: [0.2, 0.8], y: [20, 0] },
	79: { y: [42, 0], x: [40, 0], scale: [2, 1], blur: [22, 1] },
};
onMounted(async()=>{
	const app = new PIXI.Application();

	await app.init({ backgroundAlpha: 0, width: innerWidth, height: innerHeight });

	canvasContainer.value.appendChild(app.canvas);

	await PIXI.Assets.load('/images/brullov.jpg');

	let blurFilter, colorMatrixFilter;

	setup();

	function setup() {
		const image = PIXI.Sprite.from('/images/brullov.jpg');

		const texture = image.texture;

		const xCount = 10;
		const yCount = 8;
		const blockWidth = texture.width / xCount;
		const blockHeight = texture.height / yCount;

		const numBlocksX = Math.ceil(texture.width / blockWidth);
		const numBlocksY = Math.ceil(texture.height / blockHeight);

		const blocks = [];
		const BLUR_OFFSET = 5;

		for (let y = 0; y < numBlocksY; y++) {
			for (let x = 0; x < numBlocksX; x++) {
				const rectangle = new PIXI.Rectangle(
					x * blockWidth,
					y * blockHeight,
					blockWidth,
					blockHeight,
				);

				const blockTexture = new PIXI.Texture({
					frame: rectangle,
					source: texture.source,
				});

				blockTexture.source.addressMode = 'clamp-to-edge';

				const block = new PIXI.Sprite(blockTexture);

				const mask = new PIXI.Graphics();
				mask.fill(0x000000);
				mask.rect(x * blockWidth, y * blockHeight, blockWidth, blockHeight);
				mask.fill(0x000000);
				// block.mask = mask;

				block.x = x * blockWidth;
				block.y = y * blockHeight;
				block.width = blockWidth;
				block.height = blockHeight;
				// block.anchor.set(0.5, 0.5);
				// block.scale = 2;
				// mask.scale = 2;
				// mask.fill();

				addBlurFilter(block);
				blocks.push(block);

				app.stage.addChild(block);
			}
		}

		function addBlurFilter(block) {
			// block.alpha = 0.6;

			blurFilter = new PIXI.BlurFilter();
			blurFilter.strength = 0;
			blurFilter.quality = 3;

			// block.width += BLUR_OFFSET * 2;
			// block.height += BLUR_OFFSET * 2;
			// block.x -= BLUR_OFFSET;
			// block.y -= BLUR_OFFSET;

			colorMatrixFilter = new PIXI.ColorMatrixFilter();

			// colorMatrixFilter.hue(45, false); // 45 градусов

			block.filters = [blurFilter, colorMatrixFilter];
		}

		const timeline = useGsap.timeline({
			scrollTrigger: {
				scroller: '.image-blocks-pixi',
				trigger: '.image-blocks-pixi__content',
				scrub: 1,
				start: ()=>'top top',
				end: ()=>'bottom bottom',
				onUpdate() {
					console.log('123');
				},
			},
		});

		function checkRightFormConfig(value) {
			return Array.isArray(value) && value.length === 2;
		}

		Object.entries(config).forEach(([index, value])=>{
			const block = blocks[index];
			const blurFilter = block.effects[0]?.filters?.[0];
			// console.log(blurFilter);

			const blockX = block.x;
			const blockY = block.y;

			const from = {};
			const to = {};

			let blurFrom = null;
			let blurTo = null;

			if (checkRightFormConfig(value.opacity)) {
				from.alpha = value.opacity[0];
				to.alpha = value.opacity[1];
			}
			if (checkRightFormConfig(value.x)) {
				from.x = blockX + value.x[0];
				to.x = blockX + value.x[1];
			}
			if (checkRightFormConfig(value.y)) {
				from.y = blockY + value.y[0];
				to.y = blockY + value.y[1];
			}
			if (checkRightFormConfig(value.scale)) {
				from.scale = value.scale[1];
				to.scale = value.scale[1];
			}

			timeline.fromTo(block, from, to, 0);

			if (blurFilter) {
				console.log('blurFilter', blurFilter);
				if (checkRightFormConfig(value.blur)) {
					timeline.fromTo(blurFilter, {
						strength: value.blur[0],
					}, {
						strength: value.blur[1],
					}, 0);
				}
			}
		});
		// timeline.fromTo(blocks, {
		// 	y(x, block) {
		// 		console.log(x);
		// 		return block.y;
		// 	},
		//
		// }, {
		// 	y(i, block) {
		// 		console.log('block;', block.mask);
		// 		// block.mask.y = block.y + 20 * i;
		// 		return block.y + 20 * i;
		// 	},
		// }, 0);

	}
});

</script>

<style lang="scss">
.image-blocks-pixi {
	@include div100;

	overflow: scroll;

	video {
		@include div100(fixed);

		pointer-events: none;

		// opacity: 0;
	}

	.canvas {
		@include div100(fixed);

		pointer-events: none;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.block {
		height: 100vh;
	}
}
</style>
