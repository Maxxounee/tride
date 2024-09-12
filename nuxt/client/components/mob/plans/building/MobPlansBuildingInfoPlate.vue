<template>
	<div
		v-if="livingStore.floorAltHovered"
		class="MobPlansBuildingInfoPlate"
	>
		<div class="MobPlansBuildingInfoPlate__header">
			<p>Выбор этажа</p>
		</div>

		<div class="MobPlansBuildingInfoPlate__body">
			<div class="MobPlansBuildingInfoPlate__body-header">
				<p class="MobPlansBuildingInfoPlate__building">
					{{ livingStore.buildingData.tr_b }}
				</p>
				<p class="MobPlansBuildingInfoPlate__floor">
					{{ livingStore.floorDataHovered.f }} этаж
				</p>
			</div>

			<div class="MobPlansBuildingInfoPlate__delimiter" />

			<div class="MobPlansBuildingInfoPlate__info">
				<div class="MobPlansBuildingInfoPlate__item">
					<p class="MobPlansBuildingInfoPlate__item-value">
						{{ Number(livingStore.floorDataHovered.arc?.[1]) || '-' }}
					</p>
					<p class="MobPlansBuildingInfoPlate__item-name">
						номеров <br> стандарт
					</p>
				</div>
				<div class="MobPlansBuildingInfoPlate__item">
					<p class="MobPlansBuildingInfoPlate__item-value">
						{{ Number(livingStore.floorDataHovered.arc?.[2]) || '-' }}
					</p>
					<p class="MobPlansBuildingInfoPlate__item-name">
						номеров <br>люкс
					</p>
				</div>
				<div class="MobPlansBuildingInfoPlate__item">
					<p class="MobPlansBuildingInfoPlate__item-value">
						{{ livingStore.floorDataHovered.mmsqd?.t?.min }}
					</p>
					<p class="MobPlansBuildingInfoPlate__item-name">
						площадь от, м<sup>2</sup>
					</p>
				</div>
			</div>

			<div class="MobPlansBuildingInfoPlate__actions">
				<UIStandardButton
					color="var(--color-white)"
					border="var(--color-sea)"
					background="var(--color-sea)"
					width="100%"
					@click="selectFloor"
				>
					Выбрать
				</UIStandardButton>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const livingStore = useLotsLivingStore();
const floorData = computed(() => livingStore.floorDataHovered);

const queryHandler = useQueryHandler();
function selectFloor() {
	if (!livingStore.floorAltHovered) {
		return;
	}
	const [building, section, floor] = livingStore.floorAltHovered.split('-');
	queryHandler.change({ building, section, floor });
}
</script>

<style lang="scss">
.MobPlansBuildingInfoPlate {
	width: 100%;
	color: var(--color-sea);
	background-color: #F9F5F1;

	&__header {
		@include flex(center);
		@include font(1.6rem, 500, 1em, -0.064rem);

		height: 5.4rem;
		padding: 0 var(--ruler-m-l);
		text-transform: uppercase;
	}

	&__body {
		padding: 2.6rem var(--ruler-m-r) 1.5rem var(--ruler-m-l);
	}

	&__body-header {
		@include flex(center, space);
	}

	&__building {
		@include font(3rem, 400, 1.2em, -0.15rem);

		text-transform: uppercase;
	}

	&__floor {
		@include font(3rem, 400, 1.2em, -0.15rem);
	}

	&__delimiter {
		height: 1px;
		margin-top: 0.5rem;
		opacity: 0.3;
		background-color: currentcolor;
	}

	&__info {
		@include flex(stretch, space);

		margin-top: 2rem;
	}

	&__item {}

	&__item-value {
		@include font(2.6rem, 400, 1.4em, -0.104rem);

		color: var(--color-sun);
	}

	&__item-name {
		@include font(1.4rem, 400, 1.4em, -0.042rem);
	}

	&__actions {
		margin-top: 3rem;
	}
}
</style>
