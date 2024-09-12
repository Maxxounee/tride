<template>
	<div
		class="PlansMasterPlanInfoPlate"
		:class="{ active }"
	>
		<div class="PlansMasterPlanInfoPlate__inner">
			<div class="top">
				<h4 class="top__title">Выбор корпуса</h4>
				<h5
					class="top__value"
					v-html="buildingData.tr_b"
				></h5>
			</div>
			<div class="bottom">
				<div
					class="item"
					v-for="(item, index) in items"
					:key="index"
				>
					<p
						class="item__value"
						v-html="item.value"
					></p>
					<p
						class="item__description"
						v-html="item.description"
					></p>
				</div>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const livingStore: TLotsLivingStore = useLotsLivingStore();

const active = computed(() => !!livingStore.buildingAltHovered);
const buildingData = computed(() => livingStore.buildingDataHovered);

const items = computed(() => {
	return [
		{
			value: livingStore.buildingDataHovered.maxf,
			description: `этаж${wordEnd(livingStore.buildingDataHovered.maxf, 'floors')}`
		},
		{
			value: livingStore.buildingDataHovered.at,
			description: `номер${wordEnd(livingStore.buildingDataHovered.at, 'hotelRoom')}`
		},
		{value: formatCost(livingStore.buildingDataHovered.mmcd?.t?.min), description: 'цена от, руб'},
	]
})

onMounted(() => {

})
</script>

<style lang="scss">

.PlansMasterPlanInfoPlate {
	--top-height: 9.6rem;

	position: absolute;
	bottom: 0;
	left: 0;
	translate: 0 calc(100% - var(--top-height));

	min-width: 76rem;

	background-color: var(--color-background);

	transition-timing-function: var(--easeInOutQuart);
	transition-duration: 0.69s;
	transition-property: translate;

	&__inner {
		width: 100%;
		padding: 0 5.6rem;
	}

	.top {
		&__title {
			@include flex(center);
			@include font(2.2rem, 500, 1em, -0.04em);

			height: var(--top-height);
			color: var(--color-sea);
			text-transform: uppercase;
		}

		&__value {
			@include font(6rem, 400, 1em, -0.05em);

			padding: 4.6rem 0 2.5rem;
			color: var(--color-sea);
		}
	}

	.bottom {
		@include flex(null, space);

		gap: 15rem;
		padding: 7rem 0 4.1rem;
		border-top: 1px solid rgba(#00859B, 30%);

		.item {
			&__value {
				@include font(4rem, 400, 1em, -0.04em);

				color: var(--color-sun);
			}

			&__description {
				@include font(2rem, 400, 1em, -0.03em);

				margin-top: 1rem;
				color: var(--color-sea);
			}
		}
	}

	&.active {
		translate: none;
		transition-duration: 0.4s;
	}
}
</style>
