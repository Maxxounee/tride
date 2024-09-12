<template>
	<div
		class="ButtonRoundArrow"
		:class="{
			'ButtonRoundArrow_with-hover': hover,
			'ButtonRoundArrow_active': active,
			mobile: isMobileOrTablet,
		}"
	>
		<UIArrow :width="isMobileOrTablet ? 1 : 1.7" />
	</div>
</template>

<script
	lang="ts"
	setup
>
const {isMobileOrTablet} = useDevice();
defineProps({
	size: {
		type: String,
		default: '4.8rem',
	},
	hover: {
		type: Boolean,
		default: true,
	},
	active: {
		type: Boolean,
		default: false,
	},
});
</script>

<style lang="scss">
.ButtonRoundArrow {
	@include flex(center, center);

	position: relative;
	aspect-ratio: 1 / 1;
	width: v-bind(size);
	border-radius: 100%;

	&::before,
	&::after {
		@include pseudo;
		@include div100;

		pointer-events: none;
		border-radius: 100%;
	}

	&::before {
		opacity: 0;
		background-color: currentcolor;
		clip-path: circle(0);
		transition: clip-path 0.6s, opacity 0.6s;
	}

	&::after {
		border: 1px solid currentcolor;
	}

	.UIArrow {
		transition: color 0.6s;
	}

	&_with-hover {
		&:hover {
			&::before {
				opacity: 1;
				clip-path: circle(100%);
			}

			.UIArrow {
				color: var(--color-white);
			}
		}
	}

	&_active {
		&::before {
			opacity: 1;
			clip-path: circle(100%);
		}

		.UIArrow {
			color: var(--color-white);
		}
	}

}
</style>
