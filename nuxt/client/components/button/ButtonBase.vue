<template>
	<component
		:is="component"
		:to="to"
		:href="href"
		:target="href ? '_blank' : undefined"
		class="ButtonBase"
		:class="[`theme-${theme}`]"
	>
		<slot />
	</component>
</template>

<script
	lang="ts"
	setup
>
interface Props {
	to?: string;
	href?: string;
	theme?: string;
	height?: string;
}

const props = withDefaults(defineProps<Props>(), {
	theme: 'white',
	height: '5.6rem',
});

const component = computed(() => {
	if (props.to) return resolveComponent('NuxtLink');
	else if (props.href) return 'a';
	return 'button';
});
</script>

<style lang="scss">
.ButtonBase {
	@include flex(center, center);

	height: v-bind(height);
	padding: 0 2.6rem;

	font-size: 1.6rem;
	font-weight: 500;
	line-height: 1;
	color: var(--text);
	text-transform: uppercase;

	background-color: var(--background);
	border: 1px solid var(--border);
	border-radius: calc(v-bind(height) / 2);

	transition: background-color 0.3s, color 0.3s, opacity 0.3s, border-color 0.3s;

	&.theme {
		&-white {
			--text: var(--color-sea);
			--hover-text: var(--color-white);
			--background: var(--color-white);
			--hover-background: var(--color-sea);
			--border: var(--color-white);
			--hover-border: var(--color-sea);
		}
	}

	@media(hover) {
		&:hover {
			color: var(--hover-text);
			background-color: var(--hover-background);
			border-color: var(--hover-border);
		}
	}
}
</style>
