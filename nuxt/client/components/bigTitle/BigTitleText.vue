<template>
	<p class="BigTitleText">
		<slot />
	</p>
</template>

<script
	lang="ts"
	setup
>
</script>

<style lang="scss">
.BigTitleText {
	@include textCrop(1, 7px, -14px);
	@include font(16rem, 300, 1em, -0.07em);

	color: currentcolor;
	text-transform: uppercase;
	white-space: nowrap;
}
</style>
