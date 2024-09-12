<template>
	<p class="MobBigTitleTextAccent">
		<slot />
	</p>
</template>

<script
	lang="ts"
	setup
>
</script>

<style lang="scss">
.MobBigTitleTextAccent {
	@include textCrop(1, 3px, -5px);
	@include fontItalic(4.6rem, 300, 1em, -0.04em);

	color: var(--color-sun);
	white-space: nowrap;
}
</style>
