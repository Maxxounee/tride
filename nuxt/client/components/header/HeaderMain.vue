<template>
	<header
		class="HeaderMain"
		:class="{
			menuOpened: menuStore.isMenuOpened,
			hidden: isHidden,
		}"
	>
		<HeaderLeftButtons :class="{ hidden: isLeftButtonsDisabled }" />
		<HeaderPhoneButton />
		<HeaderLogo />

		<HeaderMenuButton />
	</header>
</template>

<script lang="ts" setup>
const menuStore = useMenuStore();
const callbackStore = useCallbackStore();
const router = useRoute();
const isLeftButtonsDisabledRoutes = ref<string[]>([
	'/contacts',
]);
const isLeftButtonsDisabled = computed(() => {
	return isLeftButtonsDisabledRoutes.value.includes(router.path);
});
const isHidden = computed(() => {
	const firstTerm = callbackStore.active;
	return firstTerm;
});
</script>

<style lang="scss">
.HeaderMain {
	@include flex;

	pointer-events: none;

	position: fixed;
	z-index: var(--z-head);
	top: 0;
	left: 0;

	width: 100%;

	@include flex(null);
	padding: 4.2rem var(--ruler-d-r) 0 var(--ruler-d-l);

	.ButtonBase,
	.HeaderLogo,
	.HeaderCircleButton {
		pointer-events: all;
	}

	.HeaderPhoneButton {
		margin-left: auto;
	}

	.HeaderMenuButton {
		margin-left: 3.4rem;
	}

	&__left-part {
		@include flex(null, space);
		width: 100%;
	}

	&__center {
		> * {
			pointer-events: all;
		}
	}

	.HeaderLeftButtons,
	.HeaderPhoneButton,
	.HeaderMenuButton,
	.HeaderLogo {
		transition: translate 0.5s;
	}

	&.menuOpened {
		.HeaderLeftButtons,
		.HeaderPhoneButton,
		.HeaderLogo {
			translate: 0 calc(-100% - 4.2rem);
		}
	}

	.HeaderLeftButtons {
		&.hidden {
			translate: 0 calc(-100% - 4.2rem);
		}
	}

	/* stylelint-disable */

	// &.hidden {
	// 	.HeaderMain__side_left,
	// 	.HeaderMain__center {
	// 		pointer-events: none;
	// 		translate: 0 -100%;
	// 	}
	//
	// 	.HeaderMain__phone {
	// 		pointer-events: none;
	// 		translate: 0 calc(-100% - 4rem);
	// 	}
	//
	// 	.HeaderMenu {
	// 		pointer-events: none;
	// 		translate: 0 calc(-100% - 4rem);
	// 	}
	// }
}
</style>
