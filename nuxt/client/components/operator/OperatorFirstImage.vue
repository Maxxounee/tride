<template>
	<div class="OperatorFirstImage">
		<div
			ref="inner"
			class="OperatorFirstImage__inner"
		>
			<NuxtImg
				ref="image"
				class="OperatorFirstImage__background"
				src="/images/operator/00.jpg"
				format="webp"
				quality="80"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
const { isMobileOrTablet } = useDevice();
const scroller = inject<string>('pageScroller');
const el = useCurrentElement();
const inner = ref();
const image = ref();

function animation() {
	useGsap.to(unrefElement(image), {
		ease: 'power2.inOut',
		scale: 1.05,
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el.value),
			scrub: 1,
			start: () => 'top 80%',
			end: () => 'bottom center',
		},
	});
	useGsap.to(inner.value, {
		'ease': 'power2.inOut',
		'clip-path': isMobileOrTablet ? 'inset(0 2.5rem)' : 'inset(5% 5.6rem 0)',
		'scrollTrigger': {
			scroller,
			trigger: unrefElement(el.value),
			scrub: 1,
			start: () => 'top 80%',
			end: () => 'bottom center',
		},
	});
}

onMounted(() => {
	animation();
});
</script>

<style lang="scss">
.OperatorFirstImage {
	position: relative;

	&__inner {
		overflow: hidden;
		width: 100vw;
	}

	&__background {
	}
}
</style>
