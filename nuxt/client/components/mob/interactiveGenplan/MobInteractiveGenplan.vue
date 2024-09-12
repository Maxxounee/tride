<template>
	<section class="MobInteractiveGenplan">
		<MobUtilsHorizontalScrollContainer :overscroll-background="backgroundSrc">
			<ResizableBlock
				set-only-aspect
				class="MobInteractiveGenplan__inner"
				ref="inner"
			>
				<NuxtImg
					class="MobInteractiveGenplan__background"
					:src="backgroundSrc"
					format="webp"
					quality="80"
					width="1920"
				/>
				<MobInteractiveGenplanMainPoint
					v-for="(point, key) in mainPoints"
					:key
					class="point"
					:top="point.top + '%'"
					:left="point.left + '%'"
					:text="point.text"
				/>

				<MobInteractiveGenplanExtraPoint
					v-for="(point, key) in extraPoints"
					:key
					class="point"
					:top="point.top + '%'"
					:left="point.left + '%'"
					:text="point.text"
					:icon="point.icon"
				/>
			</ResizableBlock>
		</MobUtilsHorizontalScrollContainer>
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
	useGsap.from('.MobInteractiveGenplan .point', {
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
});
</script>

<style lang="scss">
.MobInteractiveGenplan {
	// pointer-events: none;

	position: relative;

	// overflow: hidden;

	width: 100vw;
	height: 100dvh;
	background: black;

	&__background {
		@include div100;
	}

	&__inner {
		// @include div100;
		position: relative;
		height: 100dvh;

		// aspect-ratio: 16 / 9;
	}
}
</style>
