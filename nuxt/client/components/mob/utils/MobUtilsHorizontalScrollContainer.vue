<template>
	<div
		class="MobUtilsHorizontalScrollContainer"
	>
		<div class="MobUtilsHorizontalScrollContainer__scroll">
			<slot />
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const props = withDefaults(defineProps<{ welcomeScroll?: boolean }>(), { welcomeScroll: true });

const el = useCurrentElement();

function test(event) {
	// if (Math.abs(event.deltaY) > Math.abs(event.deltaX)) {
	// 	console.log(event);
	// 	event.deltaX = 0;
	// }
}

let observerInstance;

// function Observer() {
// 	const observer
// }
function scrollTo(value: {}) {
	el.value.scrollTo({
		behavior: 'smooth',
		...value,
	});
}

function setObserver() {
	observerInstance = useIntersectionObserverLocal({
		element: unrefElement(el),
		once: true,
		intersectedHandler: () => {
			scrollTo({ left: 0 });
		},
	});
}

onMounted(() => {
	if (props.welcomeScroll) {
		setTimeout(() => {
			scrollTo({ left: 10000 });
		}, 500);
		setObserver();
	}
});
tryOnBeforeUnmount(() => {
	observerInstance?.destroy();
});
</script>

<style lang="scss">
.MobUtilsHorizontalScrollContainer {
	position: relative;
	translate: 1px;

	overflow: scroll hidden;

	width: 100vw;
	/* stylelint-disable */
	background: var(--color-background);
	// background: url(v-bind(overscrollBackground));
	// backdrop-filter: blur(100px);

	&__background {
		@include div100(fixed);

		translate: 1px;
		scale: 1.2;
		filter: blur(30px) brightness(0.69);
	}

	&__scroll {
		position: relative;
		width: max-content;
		height: auto;
	}
}
</style>
