<template>
	<div
		ref="lenisWrapper"
		class="Lenis"
	>
		<div
			ref="lenisContent"
			class="Lenis__wrapper"
		>
			<slot />
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
import Lenis from 'lenis';
import type {LenisOptions} from 'lenis';

const props = withDefaults(defineProps<{
	options?: LenisOptions;
	nested?: boolean;
}>(), {});


const emit = defineEmits<{
	(e: 'onScroll', value: Lenis): void
}>()
const {$ScrollTrigger, $gsap} = useNuxtApp();
const lenis = ref<Lenis>();
const lenisWrapper = ref<HTMLElement>();
const lenisContent = ref<HTMLElement>();

onMounted(() => {
	mountLenis();
	if ($gsap) {
		setGsap();
	} else {
		requestAnimationFrame(lenisBaseRaf);
	}
});

function mountLenis() {
	const options: LenisOptions = {
		wrapper: unref(lenisWrapper),
		content: unref(lenisContent),
		syncTouch: true,
		gestureOrientation: "vertical"
	};

	lenis.value = new Lenis({
		...options,
		...props.options,
	});
	lenis.value?.on('scroll', scrollHandler);
}

function scrollHandler() {
	emit('onScroll', lenis.value);
}

function setGsap() {
	lenis.value?.on('scroll', updateScrollTrigger);
	$gsap.ticker.add(lenisGsapRaf);
	$gsap.ticker.lagSmoothing(0);
}

function lenisGsapRaf(time: number) {
	lenis.value?.raf(time * 1000);
}

function lenisBaseRaf(time: number) {
	lenis.value?.raf(time);
	requestAnimationFrame(lenisBaseRaf);
}

function updateScrollTrigger() {
	$ScrollTrigger.update();
}

function scrollTo(value, options) {
	lenis.value?.scrollTo(value, options);
}

onUnmounted(() => {
	lenis.value?.off('scroll', updateScrollTrigger);
	lenis.value?.destroy();
	$gsap.ticker.remove(lenisGsapRaf);
});

defineExpose({lenis, scrollTo});
</script>

<style lang="scss">
.Lenis {
	scrollbar-width: none;
	overflow: hidden scroll;

	-ms-overflow-style: none;

	&::-webkit-scrollbar {
		display: none;

	}

	&__wrapper {
		height: auto;
	}

	&.lenis.lenis-smooth {
		scroll-behavior: auto !important;
	}

	&.lenis.lenis-smooth [data-lenis-prevent] {
		overscroll-behavior: contain;
	}

	&.lenis.lenis-stopped {
		overflow: hidden;
	}

	&.lenis.lenis-smooth iframe {
		pointer-events: none;
	}

	&.vertical {

		@supports (overflow: clip) {
			overflow: clip scroll;
		}

		.LenisScroll__wrapper {

		}

		.Lenis__wrapper {
			width: 100%;
			height: max-content;
		}
	}
}
</style>
