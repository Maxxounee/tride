<template>
	<div class="LocationMap">
		<div
			class="LocationMap__container"
			ref="container"
		>
			<NuxtImg
				class="LocationMap__background"
				src="/images/location/map/map_bg.jpg"
				format="webp"
			/>
			<NuxtImg
				ref="overflow"
				class="LocationMap__overflow"
				src="/images/location/map/map_overflow.png"
				format="webp"
			/>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const scroller = inject<HTMLElement>('pageScroller');
const el = useCurrentElement();
const overflow = ref();
const container = ref();


function appearanceAnimation() {
	useGsap.from(unrefElement(overflow), {
		opacity: 0,
		scrollTrigger: {
			scroller,
			scrub: false,
			trigger: unrefElement(el),

			start: () => 'top center',
			end: () => 'top top',
			toggleActions: 'play none none reverse'
		},
	});
	useGsap.from(container.value, {
		ease: 'sine.inOut',
		keyframes: {
			0: {
				'clip-path': 'inset(20% 5%)',
			},
			50: {
				'clip-path': 'inset(0% 0%)',
			},
			70: {
				'clip-path': 'inset(0% 0%)',
			},
			100: {
				'clip-path': 'inset(0% 0% 20%)',
			},
			easeEach: 'none',
		},
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el),
			start: () => 'top bottom',
			end: () => 'bottom top',
		},
	});
}

onMounted(() => {
	appearanceAnimation();
})
</script>

<style lang="scss">
.LocationMap {
	&__container {
		position: relative;
		aspect-ratio: 1920 / 1132;
		width: 100vw;
	}

	&__background,
	&__overflow {
		@include div100;
	}
}
</style>
