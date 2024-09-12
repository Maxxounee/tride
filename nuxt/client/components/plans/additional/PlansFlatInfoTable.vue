<template>
	<div class="PlansFlatInfoTable">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="item"
		>
			<span
				class="item__value"
				v-html="item.value"
			/>
			<span
				class="item__text"
				v-html="item.text"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	flatData?: Apartment;
}>();
const items = computed(() => [
	{
		value: props.flatData?.tr_b,
		text: 'Корпус',
	},
	{
		value: props.flatData?.s,
		text: 'Секция',
	},
	{
		value: props.flatData?.f,
		text: 'Этаж',
	},
	{
		value: props.flatData?.tr_n,
		text: '№ апартамента',
	},
	{
		value: props.flatData?.rc,
		text: 'Комнаты',
	},
	{
		value: formatCost(props.flatData?.tc, { type: 'currency' }),
		text: 'Стоимость',
	},
]);
onMounted(() => {
});
</script>

<style lang="scss">
.PlansFlatInfoTable {
	@include flexColumn;

	gap: 1.4rem;

	.item {
		@include font(2rem, 400, 1em, -0.03em);
		@include flex;

		color: var(--color-sea);

		&__value {
			display: block;
			width: 20rem;
		}

	}
}

.layout-mobile .PlansFlatInfoTable {
	@include flexColumn;

	gap: 0.5rem;

	.item {
		@include font(1.8rem, 400, 1.4em, -0.054rem);
		@include flex(start, space);

		color: var(--color-sea);

		&__value {
			display: block;
			width: auto;
		}

	}
}
</style>
