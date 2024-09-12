<template>
	<div class="GalleryWelcome">

		<SwiperGallery
			class="GalleryWelcome__swiper"
			:images="previewImagesSrc"
			animation="sideDecrease"
			:slides-per-view="2.4"
			centered-slides
			:initial-slide="startIndex"
			:images-lazy="false"
			:follow-finger
			:grab-cursor="false"
			@change="setCurrentIndex"
		>
			<!-- <div -->
			<!--	v-for="(item, key) in images" -->
			<!--	:key -->
			<!--	class="SwiperGallery__slide" -->
			<!-- &gt; -->
			<!--	<NuxtImg -->
			<!--		class="gallery-item__img" -->
			<!--		:src="item" -->
			<!--		format="webp" -->
			<!--		quality="80" -->
			<!--		preset="default" -->
			<!--		loading="lazy" -->
			<!--	/> -->
			<!-- </div> -->
		</SwiperGallery>
		<Transition name="opacity200" mode="out-in">
			<p
				class="GalleryWelcome__description"
				:key="currentIndex"
				v-html="previewImagesTitles[currentIndex]"
			></p>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
const {previewImages, previewImagesSrc, previewImagesTitles} = useGalleryStore();

const startIndex = 1;
const currentIndex = ref(startIndex);

function setCurrentIndex(value: number): void {
	currentIndex.value = value;
}

onMounted(() => {
})
</script>

<style lang="scss">

.GalleryWelcome {
	@include div100;
	@include flex(center, center);

	&__swiper {
		position: relative;
		height: 60vh;

		.SwiperGallery__slide {
			// aspect-ratio: 480 / 661;
			@include flex(center, center);

			img {
				max-width: 25vw;
			}
		}
	}

	&__description {
		@include center(x);
		@include font(3rem, 400, 1em, -0.04em);

		bottom: 7rem;
		color: var(--color-sea);
		text-transform: uppercase;
	}
}
</style>
