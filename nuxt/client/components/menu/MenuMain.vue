<template>
	<div
		class="MenuMain"
		:class="{ MenuMain_opened: menuStore.isMenuOpened }"
	>
		<div class="MenuMain__left">
			<NuxtLink
				class="MenuMain__logo"
				to="/"
				@click.native="menuStore.closeMenu"
			>
				<NuxtIcon name="logo/full" />
			</NuxtLink>

			<MenuActions />

			<MenuSideLinks />

			<BlockSocials />

			<p class="MenuMain__public-offer">
				{{ mainStore.publicOfferText }}
			</p>

			<ButtonPrivacyPolicy class="MenuMain__policy" />
		</div>

		<div class="MenuMain__center">
			<MenuMainLinks />
		</div>

		<div class="MenuMain__right">
			<NuxtLink
				class="MenuMain__astrum"
				external
				to="https://astrumgroup.ru/"
				target="_blank"
			>
				<NuxtIcon name="logo/astrum" />
			</NuxtLink>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const menuStore = useMenuStore();
const mainStore = useMainStore();
</script>

<style lang="scss">
.MenuMain {
	pointer-events: none;

	position: fixed;
	z-index: var(--z-menu);
	top: 0;
	left: 0;

	display: grid;
	grid-template-columns: max-content max-content max-content;
	justify-content: space-between;

	width: 100%;
	height: 100%;
	padding: var(--ruler-d-t) var(--ruler-d-r) var(--ruler-d-b);

	color: var(--color-sea);

	visibility: hidden;
	opacity: 0;
	background-color: var(--color-white);

	transition: opacity 0.3s, visibility 0.3s;

	&__logo {
		font-size: 17rem;
	}

	&__left {
		@include flexColumn(start, space);
	}

	&__public-offer {
		max-width: 36.4rem;

		font-size: 1.4rem;
		line-height: 1.1;
		text-wrap: balance;
		letter-spacing: -0.07rem;

		opacity: 0.5;
	}

	&__policy {
		@include font(2rem, 400, 1.1em, -0.05em);
		@include textCrop(1);
	}

	&__right {
		@include flexColumn(start, end);
	}

	&__astrum {
		font-size: 20rem;
	}

	&_opened {
		pointer-events: all;
		visibility: visible;
		opacity: 1;
	}
}
</style>
