<template>
	<div class="SvgMaskedImage">
		<img class="SvgMaskedImage__img" src="/images/b1.jpg" />

		<svg
			preserveAspectRatio="xMidYMid slice"
		>
			<!--:viewBox="`0 0 ${originalDimensions.width} ${originalDimensions.height}`"-->
			<!--:width="originalDimensions.width"-->
			<!--:height="originalDimensions.height"-->
			<!--<image-->
			<!--	ref="image"-->
			<!--	id="image"-->
			<!--	mask="url(#mask)"-->
			<!--/>-->
			<!--<image href="/images/brullov.jpg" x="200" y="150" width="400" height="300" filter="url(#colorFilter)" />-->
			<filter id="colorFilter">
				<feColorMatrix
					type="hueRotate"
					values="100"
				/>
			</filter>

			<!--<rect x="0" y="0" width="400" height="300" fill="url(#colorFilter)" />-->
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
			<defs>
				<mask
					id="mask" :style="{
					'--progress': 0.3,
				}"
				>
					<!--<image-->
					<!--	class="image-mask"-->
					<!--	href="/images/mask/block-0.svg"-->
					<!--&gt;</image>-->
					<svg
						height="100%"
						width="100%"
						viewBox="0 0 1744 1082"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						preserveAspectRatio="xMidYMid slice"
					>
						<rect
							x="574"
							width="195"
							height="768"
							fill="rgba(255,255,255,1)"
						/>
						<rect
							x="769"
							y="192"
							width="195"
							height="576"
							fill="rgba(255,255,255,1)"
						/>
						<rect
							x="964"
							y="192"
							width="195"
							height="888"
							fill="rgba(255,255,255, 1)"
						/>
						<rect
							x="1159"
							y="192"
							width="195"
							height="766"
							fill="rgba(255,255,255, 1)"
						/>
						<rect
							x="1354"
							y="384"
							width="195"
							height="384"
							fill="rgba(255,255,255, 1)"
						/>
						<rect
							x="1354"
							y="768"
							width="195"
							height="190"
							fill="rgba(255,255,255, 0.8)"
							fill-opacity="var(--progress)"
						/>
						<rect
							x="1549"
							y="576"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.8)"
						/>
						<rect
							x="379"
							y="578"
							width="195"
							height="190"
							fill="rgba(255,255,255,0.9)"
						/>
						<rect
							x="184"
							y="578"
							width="195"
							height="190"
							fill="rgba(255,255,255, 0.7)"
						/>
						<rect
							x="769"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.9)"
						/>
						<rect
							x="379"
							y="960"
							width="390"
							height="120"
							fill="rgba(255,255,255, 0.9)"
						/>
						<rect
							x="1549"
							y="384"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.9)"
						/>
						<rect
							x="184"
							y="386"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.9)"
						/>
						<rect
							x="1354"
							y="192"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.9)"
						/>
						<rect
							x="964"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.7)"
						/>
						<rect
							x="379"
							y="192"
							width="195"
							height="386"
							fill="rgba(255,255,255, 0.5)"
						/>
						<rect
							x="382"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.7)"
						/>
						<rect
							x="1549"
							y="192"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.7)"
						/>
						<rect
							x="1549"
							y="768"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.7)"
						/>
						<rect
							x="1159"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.6)"
						/>
						<rect
							x="1354"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.3)"
						/>
						<rect
							x="769"
							y="768"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.8)"
						/>
						<rect
							x="574"
							y="768"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.7)"
						/>
						<rect
							x="379"
							y="768"
							width="195"
							height="192"
							fill="rgba(255,255,255, 0.6)"
						/>
						<rect
							y="768"
							width="379"
							height="192"
							fill="rgba(255,255,255, 0.6)"
						/>
						<rect
							x="1354"
							y="958"
							width="195"
							height="122"
							fill="rgba(255,255,255, 0.7)"
						/>
						<rect
							x="1159"
							y="955"
							width="195"
							height="125"
							fill="rgba(255,255,255, 0.9)"
						/>
						<rect
							x="184"
							y="960"
							width="195"
							height="120"
							fill="rgba(255,255,255, 0.7)"
						/>
						<rect
							x="769"
							y="960"
							width="195"
							height="122"
							fill="rgba(255,255,255, 0.6)"
						/>
					</svg>

				</mask>
			</defs>
			<!--<mask id="mask">-->
			<!--	&lt;!&ndash; Все изображение &ndash;&gt;-->
			<!--	<rect x="0" y="0" width="100%" height="100%" fill="rgb(255, 255, 255)" />-->

			<!--	&lt;!&ndash;<rect&ndash;&gt;-->
			<!--	&lt;!&ndash;	:x="100 - rect.s.width + '%'"&ndash;&gt;-->
			<!--	&lt;!&ndash;	:y="100 - rect.s.height + '%'"&ndash;&gt;-->
			<!--	&lt;!&ndash;	v-bind="rect.s.bind"&ndash;&gt;-->
			<!--	&lt;!&ndash;/>&ndash;&gt;-->
			<!--	&lt;!&ndash;<rect&ndash;&gt;-->
			<!--	&lt;!&ndash;	:x="100 - rect.s.width + '%'"&ndash;&gt;-->
			<!--	&lt;!&ndash;	:y="95 - rect.s.height + '%'"&ndash;&gt;-->
			<!--	&lt;!&ndash;	v-bind="rect.s.bind"&ndash;&gt;-->
			<!--	&lt;!&ndash;/>&ndash;&gt;-->
			<!--	<rect-->
			<!--		id="test"-->
			<!--		x="90%"-->
			<!--		y="90%"-->
			<!--		v-bind="rect.mask.s"-->
			<!--	/>-->
			<!--	&lt;!&ndash;<circle cx="50%" cy="50%" r="30%" fill="rgba(0, 0, 0, 0.5)" />&ndash;&gt;-->
			<!--	&lt;!&ndash;<circle cx="60%" cy="90%" r="30%" fill="rgba(0, 0, 0, 0.5)" />&ndash;&gt;-->
			<!--</mask>-->

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
		progress: {
			type: Number,
			default: 1,
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

		mask-image: url("#mask");

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

	.image-mask {
		@include div100;
	}
}
</style>
