<template>
	<div class="MenuSideLinks">
		<NuxtLink
			v-for="(link, index) in menuStore.sideLinks"
			:key="index"
			class="MenuSideLinks__item"
			:to="link.to"
			@click="menuStore.closeMenu"
		>
			{{ link.text }}
		</NuxtLink>
	</div>
</template>

<script lang="ts" setup>
const menuStore = useMenuStore();
</script>

<style lang="scss">
.MenuSideLinks {
	@include flexColumn;
	@include font(2rem, 400, 1.6em, -0.05em);

	gap: 2rem;

	&__item {
		@include textCrop;
	}
}

.layout-mobile .MenuSideLinks {
	@include font(1.8rem, 400, 1.5em, -0.05em);

	gap: 2.3rem;
}
</style>
