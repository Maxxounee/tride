<template>
	<div class="ScaleSection">
		<div
			ref="innerEl"
			class="ScaleSection__inner"
		>
			<slot />
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const el = useCurrentElement<HTMLElement>();
const innerEl = ref<HTMLElement>();
const scroller = inject<HTMLElement>('pageScroller');

type TProps = {
	scale?: number
	leftOrigin?: string
	topOrigin?: string
	selector: string
}
const props = withDefaults(defineProps<TProps>(), {
	scale: 5,
	leftOrigin: '50%',
	topOrigin: '20%',
});

const elements = ref<HTMLElement[]>();

onMounted(() => {
	const opacityItemsSelector = `.BigTitleRow > *:not(${props.selector})`;

	elements.value = useGsap.utils.toArray<HTMLElement>(el.value.querySelectorAll(opacityItemsSelector));

	useGsap.set(props.selector, {transformOrigin: `${props.leftOrigin} ${props.topOrigin}`});

	useGsap.from(props.selector, {
		scale: props.scale,
		ease: 'sine.inOut',
		scrollTrigger: {
			scroller,
			trigger: el.value,
			scrub: 0.1,
			start: () => 'top bottom',
			end: () => 'center 60%',
			onUpdate: ({progress}) => {
				// progress > 0.95 ? showItems() : hideItems();
			},
		},
	});
});

function showItems() {
	useGsap.to(elements.value ?? null, {
		opacity: 1,
		ease: 'power1.inOut',
		duration: 0.4,
	});
}

function hideItems() {
	useGsap.to(elements.value ?? null, {
		opacity: 0,
		ease: 'power2.out',
		duration: 1,
	});
}
</script>

<style lang="scss">
.ScaleSection {
	&__inner {
		transform-origin: v-bind(leftOrigin) v-bind(topOrigin);
	}
}
</style>
