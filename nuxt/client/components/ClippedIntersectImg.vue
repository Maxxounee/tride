<template>
	<NuxtImg
		class="ClippedIntersectImg"
		:class="[`ClippedIntersectImg_${direction}`, { active: elIsVisible }]"
		:src="src"
		format="webp"
		quality="80"
		:width="width"
		v-bind="img"
	/>
</template>

<script
	lang="ts"
	setup
>
import {NuxtImg} from '#components';

type TProps = {
	direction?: 'top' | 'left' | 'bottom' | 'right';
	src: string;
	img?: InstanceType<typeof NuxtImg>['$props'];
	topMarginValue?: string;
	width?: string;
}
const props = withDefaults(defineProps<TProps>(), {
	direction: 'top',
	topMarginValue: '-20%',
});

const el = useCurrentElement<HTMLElement>();
const elIsVisible = ref(false);

const {stop} = useIntersectionObserver(
	el,
	([{isIntersecting}]) => {
		// elIsVisible.value = isIntersecting;
		if (isIntersecting) {
			stop();
			elIsVisible.value = true;
		} else {
			elIsVisible.value = false;
		}
	},
	{
		rootMargin: `0px 0px ${props.topMarginValue} 0px`,
		threshold: 0,
	},
);
</script>

<style lang="scss">
.ClippedIntersectImg {
	transition: clip-path 1s;

	&_top {
		clip-path: inset(0 0 100% 0);
	}

	&_left {
		clip-path: inset(0 100% 0 0);
	}

	&.active {
		clip-path: inset(0);
	}
}
</style>
