<template>
	<Transition name="moveUp">
		<main
			v-if="popupStore.flatGalleryActive"
			class="PlansFlatGalleryPopup"
		>
			<SwiperGallery :images />
			<div class="arrow left">
				<NuxtIcon name="ui/arrow-head-h" />
			</div>
			<div class="arrow right">
				<NuxtIcon name="ui/arrow-head-h" />
			</div>
		</main>
	</Transition>
</template>

<script
	setup
	lang="ts"
>
const { $bus } = useNuxtApp();

const popupStore = usePopupStore();

/* TODO: переделать 🐷🐖🐽 */
const images = [
	'images/plans/apartment/gallery/00.jpg',
	'images/plans/apartment/gallery/01.jpg',
	'images/plans/apartment/gallery/02.jpg',
];
const active = ref(false);

watch(
	() => popupStore.flatGalleryActive,
	(value) => {
		if (value) {
			$bus.$emit('activateHeaderClose', {
				callback: popupStore.hideFlatGallery,
				keepPreviousCallback: true,
			});
		}
	},
);
</script>

<style lang="scss">
.PlansFlatGalleryPopup {
	@include div100;

	.SwiperGallery {
		cursor: pointer;
	}

	.arrow {
		pointer-events: none;

		position: absolute;
		z-index: 1;
		top: 50%;
		transform: translateY(-50%);

		display: flex;
		align-items: center;
		justify-content: center;

		width: 4.6rem;
		height: 4.6rem;

		color: var(--color-sea);

		background: var(--color-white);
		border-radius: 50%;

		&.left {
			left: 5rem;

			svg {
				rotate: 180deg;
			}
		}

		&.right {
			right: 5rem;
		}
	}
}

.layout-mobile .PlansFlatGalleryPopup {
	@include div100m(fixed);

	background-color: var(--color-background);

	.arrow {
		width: 3.6rem;
		height: 3.6rem;

		font-size: 1rem;
		color: var(--color-sea);

		background: var(--color-white);
		border-radius: 50%;

		&.left {
			left: var(--ruler-m-l);

			svg {
				rotate: 180deg;
			}
		}

		&.right {
			right: var(--ruler-m-r);
		}
	}
}
</style>
