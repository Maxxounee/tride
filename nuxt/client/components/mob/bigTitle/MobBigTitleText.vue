<template>
	<p class="MobBigTitleText">
		<slot />
	</p>
</template>

<script
	lang="ts"
	setup
>
</script>

<style lang="scss">
.MobBigTitleText {
	@include textCrop(1, 4px, -8px);
	@include font(4.6rem, 300, 1em, -0.07em);

	color: currentcolor;
	text-transform: uppercase;
	white-space: nowrap;
}
</style>
