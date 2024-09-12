<template>
	<div class="PlansPurchaseMortgage">
		<div class="PlansPurchaseMortgage__title">
			Ипотечные<br>программы
		</div>

		<UIStandardButton
			to="/mortgage"
			:width="isMobileOrTablet ? 'auto': '25.6rem'"
		>
			Рассчитать ипотеку
		</UIStandardButton>
	</div>
</template>

<script
	lang="ts"
	setup
>
const {isMobileOrTablet} = useDevice();
const callbackStore = useCallbackStore();
</script>

<style lang="scss">
.PlansPurchaseMortgage {
	@include flexColumn(start, space);

	height: 100%;
	padding: 5.5rem 6rem 4.7rem 5rem;
	background-color: var(--color-white);

	&__title {
		@include font(6rem, 400, 1em, -0.05em);

		color: var(--color-sea);
	}
}

.layout-mobile .PlansPurchaseMortgage {
	gap: 2rem;
	height: auto;
	padding: 2rem 4rem 2rem 2.5rem;

	&__title {
		@include font(3rem, 400, 1.1em, -0.04em);
	}
}
</style>
