<template>
	<NuxtLink
		:to="to"
		class="HeaderCircleButton"
		:class="[`theme-${theme}`]"

	>
		<NuxtIcon :name="icon" />
	</NuxtLink>
</template>

<script
	lang="ts"
	setup
>
type Props = {
	icon: string;
	to: string | object;
	theme?: string;
}

const props = withDefaults(defineProps<Props>(), {
	theme: 'white',
});
onMounted(() => {

})
</script>

<style lang="scss">

.HeaderCircleButton {
	@include size(5.6rem);

	@include flex(center, center);

	font-size: 1.4rem;


	background-color: var(--background);
	border: 1px solid var(--border);
	border-radius: 50%;

	transition: background-color 0.3s, color 0.3s, opacity 0.3s, border-color 0.3s;

	path {
		// fill: var(--fill);
		color: var(--fill);

		// fill: currentcolor !important;
		// stroke: var(--hover-fill);
	}

	&:hover {
		color: var(--hover-text);
		background-color: var(--hover-background);
		border-color: var(--hover-border);

		path {
			// fill: var(--hover-fill);

			stroke: var(--hover-fill);
		}
	}

	&.theme {
		&-white {
			--fill: var(--color-sea);
			--hover-fill: var(--color-white);
			--text: var(--color-sea);
			--hover-text: var(--color-white);
			--background: var(--color-white);
			--hover-background: var(--color-sea);
			--border: var(--color-white);
			--hover-border: var(--color-sea);
		}
	}
}
</style>
