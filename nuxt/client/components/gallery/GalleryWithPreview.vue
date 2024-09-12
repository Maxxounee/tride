<template>
	<div class="GalleryWithPreview">
		<CineGallery
			ref="cineGalleryComponent"
			:cycle="false"
			class="GalleryWithPreview__main"
			animation="opacity"
			:gallery="images"
			:enabled="!fullScreenOnClick"
			@change="setPreviewIndex"
			@click="cineGalleryClickHandler"
		/>
		<SwiperGallery
			ref="swiperPreviewComponent"
			class="GalleryWithPreview__preview"
			:images="images"
			animation="default"
			:slides-per-view="10"
			slide-to-clicked-slide
			free-mode
			centered-slides
			:grab-cursor="false"
			:initial-slide="startIndex"
			:ipx-options="{ quality: 10 }"
			@change="setCineGalleryIndex"
			:class="{
				hidden: !!popupImageSrc
			}"
		/>
		<Transition name="opacity200">
			<img
				v-if="popupImageSrc"
				:src="popupImageSrc"
				class="GalleryWithPreview__popup-image"
				:style="{
					objectFit: /__contain/.test(popupImageSrc) ? 'contain' : 'cover',
				}"
				@click.stop="() => closeImagePopup(true)"
			/>
		</Transition>
	</div>
</template>

<script lang="ts" setup>
const {$bus} = useNuxtApp();

type Props = {
	images: string[];
	startIndex?: number;
	previewSlidesPerView?: number | string;
	fullScreenOnClick?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
	images: [],
	startIndex: 5,
	previewSlidesPerView: 10,
	fullScreenOnClick: false,
})

const swiperPreviewComponent = ref();
const cineGalleryComponent = ref();
const popupImageSrc = ref('');

function setPreviewIndex(value: { index: number }): void {
	swiperPreviewComponent.value?.setSlide({target: value.index, runEmits: false})
}

const setCineGalleryIndex = (() => {
	let timeout: ReturnType<typeof setTimeout>;

	return function (value: number) {
		clearTimeout(timeout);
		const opt = {index: value, runEmits: false, forced: true};
		const callback = () => cineGalleryComponent.value.changeCurrent(opt);

		timeout = setTimeout(callback, 50);
	}
})();

function cineGalleryClickHandler({currentSrc}: { currentSrc: string | undefined }) {
	if (!props.fullScreenOnClick) return;

	popupImageSrc.value = currentSrc;

	if (currentSrc) {
		$bus.$emit('activateHeaderClose', {callback: closeImagePopup});
	} else {
	}
}

function closeImagePopup(deactivateHeader: boolean) {
	popupImageSrc.value = '';
	if (deactivateHeader) {
		$bus.$emit('deactivateHeaderClose');
	}
}

onMounted(() => {
})
</script>

<style lang="scss">

.GalleryWithPreview {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	&__main {
		position: relative;
	}

	&__preview {
		z-index: 0;
		transition-duration: 0.2s;
		transition-property: opacity;

		&.hidden {
			opacity: 0;
		}
	}

	&__popup-image {
		cursor: pointer;

		position: absolute;
		z-index: 1;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;

		object-fit: contain;
	}
}
</style>
