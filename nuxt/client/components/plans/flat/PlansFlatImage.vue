<template>
	<div class="PlansFlatImage">
		<button
			class="PlansFlatImage__view"
			@click="popupStore.showFlatView()"
		>
			<NuxtIcon name="ui/eye" />
			<span>Вид из окна</span>
		</button>

		<img
			v-if="flatData?.$lot"
			:src="flatData.$lot"
		>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	flatData?: Apartment;
}>();
const popupStore = usePopupStore();
</script>

<style lang="scss">
.PlansFlatImage {
	position: relative;

	&__view {
		@include flex(center);
		@include center(x);

		cursor: pointer;
		top: -5rem;
		gap: 1rem;

		span {
			@include font(1.6rem, 400, 1em, -0.03em);

			color: var(--color-sea);
		}

		svg {
			color: var(--color-sun);
		}
	}

	img {
		@include div100;

		object-fit: contain;
	}
}

.layout-mobile .PlansFlatImage {
	@include flexColumn(center);

	&__view {
		position: relative;
		top: unset;
		bottom: unset;
		left: unset;
		translate: 0;
	}

	img {
		position: relative;

		width: auto;
		max-width: 24rem;
		height: auto;
		max-height: 35rem;
		margin-top: 2rem;
	}
}
</style>
