<template>
	<div class="MobSectionHeroBackground">
		<div
			class="MobSectionHeroBackground__inner"
			ref="background"
		>
			<NuxtImg
				class="MobSectionHeroBackground__image"
				:src="lastFrameImage"
				format="webp"
			/>
			<video
				:src="video"
				:poster="poster"
				class="MobSectionHeroBackground__video"
				muted
				autoplay
				@ended="endedVideoHandler"
			/>
		</div>
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
}
const props = defineProps<Props>();
const background = ref();

function endedVideoHandler(event: Event) {
	useGsap.to(event.target, {
		opacity: 0,
		duration: 1,
		onComplete: () => event?.target?.remove(),
	})
}

onMounted(() => {

})
</script>

<style lang="scss">
.MobSectionHeroBackground {
	@include div100;

	&__image {
		@include div100;
	}

	&__video {
		@include div100;
	}
}
</style>
