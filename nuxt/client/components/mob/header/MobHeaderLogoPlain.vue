<template>
	<NuxtLink
		class="MobHeaderLogoPlain"
		to="/"
	>
		<NuxtIcon name="logo/small" />
	</NuxtLink>
</template>

<script>
export default {
};
</script>

<style lang="scss">
.MobHeaderLogoPlain {
	padding-top: 0.8rem;
	color: var(--color-sea);

	.nuxt-icon svg {
		width: auto;
		height: 4.6rem;
	}
}
</style>
