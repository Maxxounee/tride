<template>
	<section class="InteractiveGenplan">
		<ResizableBlock
			class="InteractiveGenplan__inner"
			ref="inner"
		>
			<NuxtImg
				class="InteractiveGenplan__background"
				:src="backgroundSrc"
				format="webp"
				quality="80"
				width="1920"
			/>
			<InteractiveGenplanMainPoint
				v-for="(point, key) in mainPoints"
				:key
				class="point"
				:top="point.top + '%'"
				:left="point.left + '%'"
				:text="point.text"
			/>

			<InteractiveGenplanExtraPoint
				v-for="(point, key) in extraPoints"
				:key
				class="point"
				:top="point.top + '%'"
				:left="point.left + '%'"
				:text="point.text"
				:icon="point.icon"
			/>
		</ResizableBlock>
	</section>
</template>

<script
	lang="ts"
	setup
>
import ResizableBlock from "~/components/utils/ResizableBlock.vue";
import {genplan} from "~/assets/script/configs/index.js";

const {backgroundSrc, mainPoints, extraPoints} = genplan;

const el = useCurrentElement();
const inner = ref();
const scroller = inject<HTMLElement>('pageScroller');

onMounted(() => {
	useGsap.to(unrefElement(inner), {
		keyframes: {
			0: {
				y: () => '-20vh',
				filter: 'blur(10px)',
				opacity: 0.7,
			},
			30: {
				filter: 'blur(0px)',
				opacity: 1,
			},
			100: {
				y: () => 0,
			},
		},
		scrollTrigger: {
			scroller,
			scrub: true,
			trigger: unrefElement(el),
			start: () => 'top bottom',
			end: () => 'top top',
		},
	});
	useGsap.from('.InteractiveGenplan .point', {
		opacity: 0,
		scale: 0,
		stagger: 0.04,
		duration: 0.6,
		filter: 'blur(24px)',
		scrollTrigger: {
			scroller,
			scrub: false,
			toggleActions: 'play none none reverse',
			trigger: unrefElement(el),
			start: () => 'top 40%',

		},
	});
	useGsap.to(unrefElement(inner), {
		yPercent: 40,
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el),
			start: () => 'top top',
			end: () => 'bottom top',

		},
	});
});
</script>

<style lang="scss">
.InteractiveGenplan {
	position: relative;

	overflow: hidden;

	width: 100vw;
	height: 100dvh;

	background: black;

	&__background {
		@include div100;
	}

	&__inner {
		aspect-ratio: 16 / 9;
	}
}
</style>
