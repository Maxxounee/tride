<template>
	<ClientOnly>
		<span
			class="UIArrow"
			:class="`UIArrow_dir-${dir}`"
		>
			<svg
				:width="realWidth"
				height="8"
				:viewBox="`0 0 ${realWidth} 8`"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<rect
					class="UIArrow__line"
					:width="realWidth"
					height="1"
					x="1"
					y="4"
				/>
				<path
					class="UIArrow__head"
					stroke-width="1"
					:d="`
					M 4.5 1
					L 1 4.5
					L 4.5 8
					`"
				/>
			</svg>
		</span>
	</ClientOnly>
</template>

<script
	lang="ts"
	setup
>
const props = withDefaults(defineProps<{
	width?: number;
	dir?: 'right' | 'left';
}>(), {
	width: 3.3,
	dir: 'right',
});

const mainStore = useMainStore();
const realWidth = computed(() => props.width * mainStore.fontSize);
</script>

<style lang="scss">
.UIArrow {
	position: relative;
	color: currentcolor;

	&__line {
		fill: currentcolor;
	}

	&__head {
		stroke: currentcolor;
	}

	&_dir {
		&-right {
			rotate: 180deg;
			display: block;
		}
	}
}
</style>
