<template>
	<div class="MobSectionHero">
		<MobSectionHeroBackground
			:last-frame-image
			:video
			:poster
		/>
		<MobSectionHeroPlate v-bind="cardData" />
	</div>
</template>

<script
	setup
	lang="ts"
>
type Props = {
	lastFrameImage: string;
	video: string;
	poster: string;
	cardData: {
		id: number;
		text: string;
		prevPage?: string;
		nextPage: string;
	};
};
defineProps<Props>();

onMounted(() => {

});
</script>

<style lang="scss">
.MobSectionHero {
	@include div100v(relative);
}
</style>
