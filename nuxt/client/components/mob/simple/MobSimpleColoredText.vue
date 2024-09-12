<template>
	<div class="MobSimpleColoredText">
		<slot></slot>
	</div>
</template>

<script
	lang="ts"
	setup
>
onMounted(() => {

})
</script>

<style lang="scss">

.MobSimpleColoredText {
	@include font(3rem, 400, 1.1em, -0.04em);

	color: var(--color-sea);

	mark {
		color: var(--color-sun);
	}
}
</style>
