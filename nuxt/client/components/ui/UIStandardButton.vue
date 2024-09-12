<template>
	<Component
		:is="is"
		class="UIStandardButton"
		:to="to ?? null"
		:href="href ?? null"
		:style="{
			'--width': width,

			'--color': color,
			'--border': border,
			'--background': background,

			'--hover-color': hoverColor,
			'--hover-border': hoverBorder,
			'--hover-background': hoverBackground,
		}"
	>
		<slot />
	</Component>
</template>

<script
	lang="ts"
	setup
>
import {NuxtLink} from '#components';

type TProps = {
	tag?: string;
	to?: string | object;
	href?: string;

	width?: string;

	color?: string;
	border?: string;
	background?: string;

	hoverColor?: string;
	hoverBackground?: string;
	hoverBorder?: string;
};
const props = withDefaults(defineProps<TProps>(), {
	tag: 'button',
	width: 'unset',

	color: 'var(--color-sun)',
	border: 'var(--color-sea)',
	background: 'transparent',

	hoverColor: 'var(--color-white)',
	hoverBorder: 'var(--color-sea)',
	hoverBackground: 'var(--color-sea)',
});

const is = computed(() => {
	if (props.to) {
		return NuxtLink
	} else if (props.href) {
		return 'a'
	}

	return props.tag;
})
</script>

<style lang="scss">
.UIStandardButton {
	@include font(1.6rem, 400, 1em, -0.04em);
	@include flex(center, center);

	cursor: pointer;
	user-select: none;

	position: relative;

	width: var(--width);
	height: 4.6rem;
	padding: 0 4rem;

	color: var(--color);
	text-transform: uppercase;
	white-space: nowrap;

	background: var(--background);
	border: 0.1rem solid var(--border);
	border-radius: 6rem;

	transition-duration: 0.2s;
	transition-property: background, color, border, scale;

	&:active {
		scale: 0.98;
		color: var(--hover-color);
		background: var(--hover-background);
		border-color: var(--hover-border);
	}

	@media(hover) {
		&:hover {
			color: var(--hover-color);
			background: var(--hover-background);
			border-color: var(--hover-border);
		}
	}
}

.layout-mobile .UIStandardButton {
	@include font(1.4rem, 400, 1em, -0.042rem);

	height: 3.7rem;
	padding: 0 2rem;
}
</style>
