<template>
	<div class="layout-mobile">
		<UtilsFirstLoadMask />
		<slot />
		<MobMenu />
		<MobHeader />

		<CallbackPopup />
	</div>
</template>

<script setup lang="ts">
const mainStore = useMainStore();

mainStore.windowInitialWidth = 375;
mainStore.windowInitialHeight = 812;
useGsap.defaults({
	ease: 'none',
});
useScrollTrigger.defaults({
	scrub: true,
	start: () => 'top bottom',
	end: () => 'bottom top',
});
</script>

<style lang="scss">
@import "@/assets/styles/style_m";

.layout-mobile {
}
</style>
