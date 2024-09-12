<template>
	<Lenis
		ref="lenis"
		class="PlansPurchaseTermsPopup"
		:class="{ active: popupStore.purchaseTermsActive }"
	>
		<div class="PlansPurchaseTermsPopup__title">
			<BigTitleText :style="{ marginRight: '32rem' }">
				Условия
			</BigTitleText>
			<BigTitleTextAccent :style="{ marginLeft: '47rem' }">
				покупки
			</BigTitleTextAccent>
		</div>
		<div class="programs">
			<div class="programs__row">
				<PlansPurchaseEscrow class="programs__item" />

				<PlansPurchaseMortgage class="programs__item" />
			</div>

			<div class="programs__row">
				<PlansPurchaseInstallment class="programs__item" />
			</div>
		</div>
	</Lenis>
</template>

<script lang="ts" setup>
const { $bus } = useNuxtApp();

const popupStore = usePopupStore();

watch(
	() => popupStore.purchaseTermsActive,
	(value) => {
		if (value) {
			$bus.$emit('activateHeaderClose', {
				callback: popupStore.hidePurchaseTerms,
				keepPreviousCallback: true,
			});
		}
	},
);
</script>

<style lang="scss">
.PlansPurchaseTermsPopup {
	@include div100;

	translate: 0 -100%;

	overflow: hidden;

	background-color: var(--color-background);

	transition-timing-function: var(--easeInOutQuart);
	transition-duration: 0.6s;
	transition-property: translate;

	&.active {
		translate: none;
	}

	.PlansPurchaseTermsPopup__title {
		padding-top: 24rem;
		text-align: center;

		.BigTitleText {
			color: var(--color-sea);
		}
	}

	.programs {
		@include flexColumn;

		gap: 3rem;
		margin-top: 12.8rem;
		padding: 0 var(--ruler-d-r) var(--ruler-d-r);

		&__row {
			@include flex;

			gap: 3rem;
			width: 100%;
		}

		&__item {
			flex: 1 1;
			min-height: 57rem;
		}
	}
}
</style>
