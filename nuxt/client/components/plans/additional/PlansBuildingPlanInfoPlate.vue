<template>
	<div
		class="PlansBuildingPlanInfoPlate"
		:class="{ active }"
	>
		<div class="PlansBuildingPlanInfoPlate__inner">
			<div class="top">
				<h4 class="top__title">Выбор этажа</h4>
				<div class="top__items">
					<h5
						class="top__value"
						v-html="buildingData?.tr_b"
					></h5>
					<h5
						class="top__value"
						v-html="`${floorData?.f} этаж`"
					></h5>
				</div>
			</div>
			<div class="bottom">
				<template
					v-for="(item, index) in items"
					:key="index"
				>
					<div class="item">
						<p
							class="item__value"
							v-html="item.value"
						></p>
						<p
							class="item__description"
							v-html="item.description"
						></p>
					</div>
				</template>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>

const livingStore: TLotsLivingStore = useLotsLivingStore();

const active = computed(() => !!livingStore.floorAltHovered);
const buildingData = computed(() => livingStore.buildingData);
const floorData = computed(() => livingStore.floorDataHovered);

const items = computed(() => {
	return [
		{
			value: Number(floorData?.value?.arc?.[1]) || '-',
			description: 'номеров стандарт'
		},
		{
			value: Number(floorData?.value?.arc?.[2]) || '-',
			description: 'номеров люкс'
		},
		{
			value: floorData.value?.mmsqd?.t?.min,
			description: 'площадь от, м<sup>2</sup>'
		},
	]
})

onMounted(() => {

})
</script>

<style lang="scss">

.PlansBuildingPlanInfoPlate {
	--top-height: 9.6rem;

	position: absolute;
	bottom: 0;
	left: 0;
	translate: 0 calc(100% - var(--top-height));

	min-width: 76rem;

	background: var(--color-background);

	transition-timing-function: var(--easeInOutQuart);
	transition-duration: 0.69s;
	transition-property: translate;

	&__inner {
		width: 100%;
		padding: 0 5.6rem;
	}

	.top {
		&__items {
			@include flex(null, space);
		}

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
