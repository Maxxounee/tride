<template>
	<main
		class="PlansFlatViewPopup"
		:class="{ active: popupStore.flatViewActive }"
	>
		<!-- <SlideGallery :images /> -->
		<NuxtImg
			v-if="loaded"
			src="images/plans/apartment/view.jpg"
			format="webp"
		/>
	</main>
</template>

<script
	setup
	lang="ts"
>
const { $bus } = useNuxtApp();
const popupStore = usePopupStore();
const loaded = ref(false);

watch(
	() => popupStore.flatViewActive,
	(value) => {
		if (value) {
			loaded.value = true;
			$bus.$emit('activateHeaderClose', {
				callback: popupStore.hideFlatView,
				keepPreviousCallback: true,
			});
		}
	},
);
</script>

<style lang="scss">
.PlansFlatViewPopup {
	@include div100;

	translate: 0 -100%;
	transition-timing-function: var(--easeInOutQuart);
	transition-duration: 0.6s;
	transition-property: translate;

	&.active {
		translate: none;
	}
}
</style>
