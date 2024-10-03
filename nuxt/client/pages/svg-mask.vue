<template>
	<div class="svg-mask">
		<div class="container">
			<!--<SvgMaskedImagePng />-->
			<SvgMaskedImage
				image="/images/b1.jpg"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>

onMounted(() => {

})
</script>

<style lang="scss">

.svg-mask {
	background: red;

	.container {
		@include div100;

		position: relative;

		// width: 100vw;
		// height: 562px;
	}

	svg {
		position: relative;
	}

	image {
		position: absolute;
		object-fit: cover;
	}

	.container img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.container svg {
		// position: absolute;
		// top: 0;
		// left: 0;
		//
		// width: 100%;
		// height: 100%;
	}
}
</style>
