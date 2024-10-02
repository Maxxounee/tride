<template>
	<div class="SvgMaskedImage">
		<svg
			:viewBox="`0 0 ${originalDimensions.width} ${originalDimensions.height}`"
			preserveAspectRatio="xMidYMid slice"
		>
			<!--:viewBox="`0 0 ${originalDimensions.width} ${originalDimensions.height}`"-->
			<!--:width="originalDimensions.width"-->
			<!--:height="originalDimensions.height"-->
			<image
				ref="image"
				id="image"
				mask="url(#mask)"
			/>
			<!--<image href="/images/brullov.jpg" x="200" y="150" width="400" height="300" filter="url(#colorFilter)" />-->
			<filter id="colorFilter">
				<feColorMatrix
					type="hueRotate"
					values="100"
				/>
			</filter>

			<rect x="0" y="0" width="400" height="300" fill="url(#colorFilter)" />
			<!--<use href="#image" />-->
			<!--<use-->
			<!--	href="#image"-->
			<!--	x="0"-->
			<!--	y="0"-->
			<!--	width="400"-->
			<!--	height="300"-->
			<!--	filter="url(#colorFilter)"-->
			<!--/>-->
			<!-- SVG маска -->
			<mask id="mask">
				<!-- Все изображение -->
				<rect x="0" y="0" width="100%" height="100%" fill="rgb(255, 255, 255)" />

				<!--<rect-->
				<!--	:x="100 - rect.s.width + '%'"-->
				<!--	:y="100 - rect.s.height + '%'"-->
				<!--	v-bind="rect.s.bind"-->
				<!--/>-->
				<!--<rect-->
				<!--	:x="100 - rect.s.width + '%'"-->
				<!--	:y="95 - rect.s.height + '%'"-->
				<!--	v-bind="rect.s.bind"-->
				<!--/>-->
				<rect
					id="test"
					x="90%"
					y="90%"
					v-bind="rect.mask.s"
				/>
				<!--<circle cx="50%" cy="50%" r="30%" fill="rgba(0, 0, 0, 0.5)" />-->
				<!--<circle cx="60%" cy="90%" r="30%" fill="rgba(0, 0, 0, 0.5)" />-->
			</mask>

			<!-- Элемент, к которому применяется маска -->
			<!--<rect x="0" y="0" width="800" height="600" fill="rgba(0, 0, 0, 0.5)" mask="url(#mask)" />-->
		</svg>
	</div>
</template>

<script>
export default {
	components: {},
	props: {
		image: {
			type: String,
			default: '',
		},
	},
	data() {
		return {
			originalDimensions: {
				width: 0,
				height: 0,
			},
			rect: {
				type: {},
				mask: {
					s: {
						width: '10rem',
						height: '10rem',
					},
				},
			},
		};
	},
	computed: {
		aspectRatio() {
			return this.originalDimensions.width / this.originalDimensions.height;
		},
		width() {
			return Math.min(this.originalDimensions.width, process.client ? innerWidth : this.originalDimensions.width);
		},
		height() {
			return Math.min(this.originalDimensions.height, process.client ? innerHeight : this.originalDimensions.height);
		},
		// rect() {
		// 	// return Object.entries(this.rectSettings).reduce((acc, [key, value])=>{
		// 	// 	acc[key] = {
		// 	// 		...value,
		// 	// 		bind: {
		// 	// 			width: value.width + 'rem',
		// 	// 			height: value.height + 'rem',
		// 	// 		},
		// 	// 	};
		// 	// 	return acc;
		// 	// }, {});
		// },
	},
	beforeMount() {

	},
	mounted() {
		this.loadImage();
	},
	methods: {
		loadImage() {

			const img = new Image();
			img.src = this.image;

			img.onload = ()=>{
				this.originalDimensions.width = img.naturalWidth;
				this.originalDimensions.height = img.naturalHeight;

				this.$refs.image.setAttribute('href', this.image);

				console.log(img.naturalWidth);
			};
		},
	},
};
</script>

<style lang="scss">

.SvgMaskedImage {
	@include div100;

	background: linear-gradient(to right, #4a1d1d, #2e1572); /* Пример фона HTML документа */
	mask {
		@include div100;

	}

	svg {
		width: 100%;
		height: 100%;
	}

	.mask {
		@include div100;
	}
}
</style>
