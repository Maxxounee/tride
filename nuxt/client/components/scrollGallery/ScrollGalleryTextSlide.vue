<template>
	<div
		class="ScrollGalleryTextSlide SwiperGallery__slide"
		:style="{ width }"
		:class="{ mobile: isMobile, desktop: !isMobile }"
	>
		<NuxtImg
			class="ScrollGalleryTextSlide__image"
			:src="src"
			format="webp"
			quality="80"
			width="400"
			preset="default"
		/>
		<p
			class="ScrollGalleryTextSlide__text"
			v-html="text"
		/>
	</div>
</template>

<script
	lang="ts"
	setup
>
const {isMobile} = useDevice();
type Props = {
	src: string;
	text: string;
	width: string;
}
defineProps<Props>();
onMounted(() => {

})
</script>

<style lang="scss">

.ScrollGalleryTextSlide {
	&__text {
		color: var(--color-text);
		text-transform: uppercase
	}

	&.desktop {
		.ScrollGalleryTextSlide__text {
			@include font(1.2rem, 500, 1.2em);

			margin-top: 2rem;

		}
	}

	&.mobile {
		.ScrollGalleryTextSlide__text {
			@include font(0.8rem, 500, 1.2em);

			margin-top: 1.4rem;
		}
	}
}
</style>
