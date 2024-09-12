<template>
	<NuxtLink
		class="HeaderLogo"
		to="/"
		@click.native="emitLogoClick"
	>
		<NuxtIcon
			name="logo/full"
		/>
	</NuxtLink>
</template>

<script
	lang="ts"
	setup
>
const {$bus} = useNuxtApp();

function emitLogoClick() {
	$bus.$emit('logoLinkClick');
}
</script>

<style lang="scss">
.HeaderLogo {
	@include flex(center, center);

	position: absolute;
	top: 0;
	left: 50%;
	transform: translateX(-50%);

	width: 9.5rem;
	height: 13.8rem;
	padding: 0 1.4rem;

	font-size: 8rem;
	color: var(--color-white);

	background-color: var(--color-sea);

}
</style>
