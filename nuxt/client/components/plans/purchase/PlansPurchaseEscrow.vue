<template>
	<div class="PlansPurchaseEscrow">
		<div class="PlansPurchaseEscrow__title">
			Эскроу <br>счета
		</div>

		<p class="PlansPurchaseEscrow__info-text">
			Под надежной защитой! <br>
			Приобрести номер в Alean Resort Montvert можно <br>
			через эскроу-счет. Что обеспечивает безопасность <br>
			и доверие в сделках, храня деньги на специальном <br>
			счете до выполнения условий Застройщиком. <br>
			Абсолютная уверенность при проведении сделок!
		</p>
	</div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.PlansPurchaseEscrow {
	@include flexColumn(start, space);

	height: 100%;
	padding: 5.5rem 6rem 4.7rem 5rem;
	background-color: var(--color-white);

	&__title {
		@include font(6rem, 400, 1em, -0.05em);

		color: var(--color-sea);
	}

	&__info-text {
		@include font(2rem, 400, 1.4em, -0.03em);

		color: var(--color-text);
	}
}

.layout-mobile .PlansPurchaseEscrow {
	gap: 2rem;
	height: auto;
	padding: 2rem 4rem 2rem 2.5rem;

	&__title {
		@include font(3rem, 400, 1.1em, -0.04em);

		br {
			display: none;
		}
	}

	&__info-text {
		@include font(1.4rem, 400, 1.4em, -0.03em);

		br {
			display: none;
		}
	}
}
</style>
