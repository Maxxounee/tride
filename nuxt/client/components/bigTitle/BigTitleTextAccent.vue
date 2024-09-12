<template>
	<p class="BigTitleTextAccent">
		<slot />
	</p>
</template>

<script
	lang="ts"
	setup
>
</script>

<style lang="scss">
.BigTitleTextAccent {
	@include textCrop(1, 3px, -5px);
	@include fontItalic(16rem, 300, 1em, -0.04em);

	color: var(--color-sun);
	white-space: nowrap;
}
</style>
