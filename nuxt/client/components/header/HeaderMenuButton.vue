<template>
	<ButtonBase
		class="HeaderMenuButton"
		:class="{ HeaderMenuButton_menu: menuStore.isMenuOpened }"
		@click="menuStore.toggleMenu"
	>
		<div class="HeaderMenuButton__line HeaderMenuButton__line_1" />
		<div class="HeaderMenuButton__line HeaderMenuButton__line_2" />
	</ButtonBase>
</template>

<script lang="ts" setup>
const menuStore = useMenuStore();
</script>

<style lang="scss">
.HeaderMenuButton {
	@include flexColumn(center, center);

	gap: 0.9rem;

	height: 5.6rem;
	padding: 0 2.6rem;

	color: var(--color-sea);

	background-color: var(--color-white);

	&__line {
		transform-origin: center center;

		width: 6.2rem;
		height: 1px;

		background-color: currentcolor;

		transition: translate 0.3s, rotate 0.3s;
	}

	&_menu {
		--border: var(--color-sun);

		.HeaderMenuButton__line_1 {
			translate: 0 0.5rem;
			rotate: 15deg;
		}

		.HeaderMenuButton__line_2 {
			translate: 0 -0.5rem;
			rotate: -15deg;
		}
	}
}

.layout-mobile .HeaderMenuButton {
	gap: 0.7rem;
	height: 4rem;
	padding: 0 1.1rem;

	&__line {
		width: 4rem;
	}

	&_menu {
		.HeaderMenuButton__line_1 {
			translate: 0 0.4rem;
		}

		.HeaderMenuButton__line_2 {
			translate: 0 -0.4rem;
		}
	}
}
</style>
