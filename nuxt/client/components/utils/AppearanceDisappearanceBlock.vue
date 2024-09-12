<template>
	<article class="AppearanceDisappearanceBlock">
		<div
			class="AppearanceDisappearanceBlock__inner"
			ref="inner"
		>
			<slot></slot>
		</div>
	</article>
</template>

<script
	lang="ts"
	setup
>
type TProps = {
	showAnimation?: boolean
	showTriggerStart?: string
	showTriggerEnd?: string

	exitAnimation?: boolean
	exitInverse?: boolean
	exitTriggerStart?: string
	exitTriggerEnd?: string

	scrub?: boolean | number
	trigger?: string
	endTrigger?: string
}

const props = withDefaults(defineProps<TProps>(), {
	showAnimation: true,
	showTriggerStart: 'top bottom',
	showTriggerEnd: 'bottom bottom-=10%',

	exitAnimation: true,
	exitInverse: false,
	exitTriggerStart: 'top top-=5rem',
	exitTriggerEnd: 'bottom top',

	scrub: 1,

	trigger: undefined,
	endTrigger: undefined,
});

const el = useCurrentElement();
const scroller = inject<HTMLElement>('pageScroller');
const inner = ref();
const hiddenOptions = {filter: 'blur(24px)', opacity: 0}
const visibleOptions = {filter: 'blur(0px)', opacity: 1, y: () => '0rem'}
let stDefault = {};

function appearanceAnimation() {
	const innerEl = unrefElement(inner);

	const from = {
		...hiddenOptions,
		y: () => '5rem'
	};
	const to = {
		...visibleOptions,
		scrollTrigger: {
			...stDefault,
			start: () => props.showTriggerStart,
			end: () => props.showTriggerEnd,
		},
	};

	useGsap.fromTo(innerEl, from, to);
}

function disappearanceAnimation() {
	const innerEl = unrefElement(inner);

	const from = {...visibleOptions};
	const to = {
		...hiddenOptions,
		scrollTrigger: {
			...stDefault,
			start: () => props.exitTriggerStart,
			end: () => props.exitTriggerEnd,
		},
	};

	useGsap.fromTo(innerEl, from, to);
}

onMounted(async () => {
	await nextTick();
	await delay(0);

	stDefault = {scroller, trigger: unrefElement(el), scrub: props.scrub}

	if (props.showAnimation) appearanceAnimation();
	if (props.exitAnimation) disappearanceAnimation();
})
</script>

<style lang="scss">
.AppearanceDisappearanceBlock {
	&__inner {
	}
}
</style>
