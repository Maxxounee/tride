<template>
	<SwiperGallery
		class="ScrollGallery"
		animation="default"
		slides-per-view="auto"
		:space-between="spaceBetween"
	>
		<slot />
	</SwiperGallery>
</template>

<script
	lang="ts"
	setup
>
type Props = {
	spaceBetween?: number;
};
defineProps<Props>();
onMounted(() => {

});
</script>

<style lang="scss">
.ScrollGallery.SwiperGallery {
	position: relative;
}
</style>
