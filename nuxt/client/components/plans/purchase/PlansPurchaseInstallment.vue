<template>
	<div class="PlansPurchaseInstallment">
		<div class="PlansPurchaseInstallment__title">
			Рассрочка
		</div>

		<div class="PlansPurchaseInstallment__list">
			<div
				v-for="(item, key) in items"
				:key
				class="PlansPurchaseInstallment__item"
			>
				<p
					class="PlansPurchaseInstallment__item-text"
					v-html="item.text"
				/>
				<p
					class="PlansPurchaseInstallment__item-number"
					v-html="item.number"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const items = ref([
	{ text: 'ПВ на 12 месяцев, <br>платежи ежемесячно/ежеквартально', number: '30%' },
	{ text: 'ПВ на 18 месяцев, <br>платежи ежемесячно/ежеквартально', number: '40%' },
	{ text: 'ПВ на 24 месяцев, <br>платежи ежемесячно/ежеквартально', number: '50%' },
]);
</script>

<style lang="scss">
.PlansPurchaseInstallment {
	@include flexColumn(start, space);

	padding: 5.5rem 6rem 4.7rem 5rem;
	background-color: var(--color-white);

	&__title {
		@include font(6rem, 400, 1em, -0.05em);

		color: var(--color-sea);
	}

	&__list {
		@include flexColumn;

		gap: 5rem;
		align-self: stretch;
		margin-top: 8rem;
	}

	&__item {
		@include flex(end, space);
	}

	&__item-text {
		@include font(2rem, 400, 1.4em, -0.03em);

		color: var(--color-text);
	}

	&__item-number {
		@include fontItalic(16rem, 300, 0.93em, -0.04em);

		color: var(--color-sun);
		letter-spacing: -0.6391rem;

		span {
			font-family: GothamPro, sans-serif;
			font-weight: 400;
			font-style: initial;
			color: var(--color-sea);
		}
	}
}

.layout-mobile .PlansPurchaseInstallment {
	gap: 2rem;
	height: auto;
	padding: 2rem 4rem 2rem 2.5rem;

	&__title {
		@include font(3rem, 400, 1.1em, -0.04em);

		br {
			display: none;
		}
	}

	&__list {
		gap: 6rem;
		margin-top: 0;
	}

	&__item {
		flex-direction: column;
		gap: 1rem;
		align-items: start;
	}

	&__item-text {
		@include font(1.4rem, 400, 1.4em, -0.03em);
	}

	&__item-number {
		@include fontItalic(11rem, 300, 0.93em, -0.04em);

		color: var(--color-sun);
		letter-spacing: -0.6391rem;

		span {
			font-family: GothamPro, sans-serif;
			font-weight: 400;
			font-style: initial;
			color: var(--color-sea);
		}
	}
}
</style>
