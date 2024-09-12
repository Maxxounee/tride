<template>
	<div
		class="MobPlansFlatPopup"
		:class="{ active: flatData }"
	>
		<Lenis class="MobPlansFlatPopup__container">
			<PlansFlatTop :flat-data="flatDataCached" />

			<div class="MobPlansFlatPopup__image">
				<PlansFlatImage :flat-data="flatDataCached" />
			</div>

			<div class="MobPlansFlatPopup__info">
				<PlansFlatInfoTable :flat-data="flatDataCached" />
			</div>

			<!-- <div class="MobPlansFlatPopup__actions"> -->
			<!-- <MobPlansFlatActions /> -->
			<!-- </div> -->

			<div class="MobPlansFlatPopup__delimiter" />

			<div class="MobPlansFlatPopup__cost">
				<p>{{ formatCost(flatDataCached?.tc) }}</p>
			</div>

			<div class="MobPlansFlatPopup__actions-2">
				<MobPlansFlatActions2 />
			</div>

			<div class="MobPlansFlatPopup__floor-minimap-block">
				<div class="MobPlansFlatPopup__floor-delimiter">
					<span />
					<p>план этажа</p>
					<span />
				</div>

				<div class="MobPlansFlatPopup__floor-minimap">
					<MobPlansFlatFloor />
				</div>
			</div>

			<div class="MobPlansFlatPopup__bottom">
				<MobPlansFlatWindrose />

				<BlockSocials />
			</div>
		</Lenis>

		<MobPlansFlatAdvantages />
		<MobPlansFlatPurchase />
		<PlansFlatGalleryPopup />
	</div>
</template>

<script lang="ts" setup>
import PlansFlatInfoTable from '~/components/plans/additional/PlansFlatInfoTable.vue';
import PlansFlatGalleryPopup from '~/components/plans/additional/PlansFlatGalleryPopup.vue';

const livingStore = useLotsLivingStore();
const flatData = computed(() => livingStore.apartData);

const flatDataCached = ref<Apartment>();

watch(
	() => flatData.value,
	(value) => {
		if (value) {
			flatDataCached.value = value;
		}
	},
	{ immediate: true },
);
</script>

<style lang="scss">
.MobPlansFlatPopup {
	@include div100m(fixed);

	will-change: translate;
	padding-top: 7rem;
	color: var(--color-sea);
	background-color: var(--color-background);

	&__container {
		@include container100;

		padding: 2rem var(--ruler-m-r) 4rem var(--ruler-m-l);
	}

	&__image {
		margin-top: 3rem;
	}

	&__info {
		margin-top: 4rem;
	}

	&__actions {
		margin-top: 2rem;
	}

	&__delimiter {
		height: 0.1rem;
		margin-top: 2rem;
		background-color: currentcolor;
	}

	&__cost {
		@include flex(center, center);
		@include fontItalic(5rem, 300, 1.3em, -0.2rem);

		margin-top: 1.1rem;
		color: var(--color-sun);
		text-align: center;
	}

	&__actions-2 {
		margin-top: 2rem;
	}

	&__floor-minimap-block {
		margin-top: 4rem;
	}

	&__floor-delimiter {
		@include flex(center);

		gap: 1rem;

		span {
			flex: 1 1;
			height: 1px;
			background-color: currentcolor;
		}

		p {
			@include font(1rem, 400, 1em);

			text-transform: uppercase;
		}
	}

	&__floor-minimap {
		margin-top: 2.5rem;
	}

	&__bottom {
		@include flex(center, space);

		margin-top: 3rem;
	}

	.BlockSocials {
		gap: 1rem;

		&__item {
			font-size: 3.7rem;
		}
	}
}
</style>
