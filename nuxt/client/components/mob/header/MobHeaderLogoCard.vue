<template>
	<NuxtLink
		class="MobHeaderLogoCard"
		to="/"
	>
		<NuxtIcon name="logo/full" />
	</NuxtLink>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.MobHeaderLogoCard {
	@include flex(center, center);

	width: 7.8rem;
	height: 10rem;

	font-size: 5.6rem;
	color: var(--color-white);

	background-color: var(--color-sea);
}
</style>
