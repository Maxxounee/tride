<template>
	<div class="SvgMaskedImage">
		<img
			class="SvgMaskedImage__img"
			src="/images/b1.jpg"
		/>
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
	},
	beforeMount() {

	},
	mounted() {
		// this.loadImage();
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

	&__img {
		position: absolute;
		top: 0;
		left: 0;

		object-fit: cover;

		mask-image: url("/images/mask/block-0.png");

		mask-repeat: no-repeat;
		mask-size: 100% 100%;
	}

	mask {
		@include div100;

	}

	svg {
		position: absolute;
		top: 0;
		width: 100%;
		height: 100%;
	}

	.mask {
		// @include div100;
	}
}
</style>
