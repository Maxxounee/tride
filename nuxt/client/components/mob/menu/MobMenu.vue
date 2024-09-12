<template>
	<div
		class="MobMenu"
		:class="{ MobMenu_opened: menuStore.isMenuOpened }"
	>
		<Lenis class="MobMenu__container">
			<div class="MobMenu__main-links">
				<MenuMainLinks />
			</div>

			<div class="MobMenu__side-links">
				<MenuSideLinks />
			</div>

			<div class="MobMenu__actions">
				<MenuActions />
			</div>

			<div class="MobMenu__socials">
				<BlockSocials />
			</div>

			<NuxtLink
				class="MobMenu__astrum"
				external
				to="https://astrumgroup.ru/"
				target="_blank"
			>
				<NuxtIcon name="logo/astrum" />
			</NuxtLink>

			<ContactsPolicy class="MobMenu__policy" />
		</Lenis>
	</div>
</template>

<script lang="ts" setup>
const menuStore = useMenuStore();
</script>

<style lang="scss">
.MobMenu {
	@include flexColumn;

	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;

	width: 100%;
	height: 100vh;
	height: 100dvh;
	padding-top: 7rem;

	color: var(--color-sea);

	visibility: hidden;
	opacity: 0;
	background-color: var(--color-background);

	transition: opacity 0.3s, visibility 0.3s;

	&__container {
		flex: 1 1;
		padding: 2rem var(--ruler-m-r) 2.5rem var(--ruler-m-l);
	}

	&__side-links {
		margin-top: 4rem;
	}

	&__actions {
		margin-top: 6rem;
	}

	&__socials {
		margin-top: 5rem;
	}

	& &__astrum {
		display: block;
		margin-top: 6rem;

		.nuxt-icon svg {
			width: 100%;
			height: auto;
		}
	}

	&__public-offer {
		@include font(1.4rem, 400, 1.1em, 0.07rem);

		margin-top: 3rem;
		opacity: 0.5;
	}

	&__policy {
		@include font(1.8rem, 400, 1.5em, -0.09rem);

		display: block;
		margin-top: 2.2rem;
	}

	&_opened {
		pointer-events: all;
		visibility: visible;
		opacity: 1;
	}
}
</style>
