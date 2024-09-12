<template>
	<Transition name="moveUp">
		<Lenis
			v-if="popupStore.purchaseTermsActive"
			class="MobPlansFlatPurchase"
		>
			<div class="MobPlansFlatPurchase__container">
				<div class="MobPlansFlatPurchase__title">
					<MobBigTitleRowWrapper>
						<MobBigTitleRow>
							<MobBigTitleText :style="{ marginLeft: '2.2rem' }">
								условия
							</MobBigTitleText>
						</MobBigTitleRow>
						<MobBigTitleRow>
							<MobBigTitleTextAccent :style="{ marginLeft: '9.5rem' }">
								покупки
							</MobBigTitleTextAccent>
						</MobBigTitleRow>
					</MobBigTitleRowWrapper>
				</div>

				<div class="MobPlansFlatPurchase__body">
					<PlansPurchaseEscrow />

					<PlansPurchaseMortgage />

					<PlansPurchaseInstallment />
				</div>
			</div>
		</Lenis>
	</Transition>
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
.MobPlansFlatPurchase {
	@include div100m;

	overflow: hidden;
	padding-top: 6.4rem;
	background-color: var(--color-background);

	&__container {
		padding: 4rem var(--ruler-m-r) 4rem var(--ruler-m-l);
	}

	&__body {
		@include flexColumn;

		gap: 1.5rem;
		margin-top: 4rem;
	}
}
</style>
