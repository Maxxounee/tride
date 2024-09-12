<template>
	<section class="UtilsPinnerBlock">
		<div
			class="UtilsPinnerBlock__inner"
			ref="inner"
		>
			<slot></slot>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>
const props = withDefaults(defineProps<{
	pinHeightVh?: number;
}>(), {
	pinHeightVh: 100,
});

const scroller = inject<HTMLElement>('pageScroller');

const el = useCurrentElement();
const inner = ref();
onMounted(() => {
	useScrollTrigger.create({
		scroller,
		trigger: unrefElement(inner),
		pinSpacing: true,
		pin: true,
		start: () => 'top top',
		end: (self) => self.start + props.pinHeightVh * innerHeight / 100,
	});
});
</script>

<style lang="scss">
.UtilsPinnerBlock {
	@include div100(relative);

	// height: 100vh;

	&__inner {
		@include flex(center, center);

		position: relative;

		// top: 60%;
		// left: 50%;
		// translate: -50% -50%;

		width: 100vw;
		height: 100vh;
		padding-top: 11rem;
	}
}
</style>
