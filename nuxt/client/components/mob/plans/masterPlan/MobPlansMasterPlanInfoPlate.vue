<template>
	<div
		class="MobPlansMasterPlanInfoPlate"
		:class="{ active: livingStore.buildingAltHovered }"
		@click="outsideClick"
	>
		<div
			class="MobPlansMasterPlanInfoPlate__content"
			@click.stop
		>
			<div class="MobPlansMasterPlanInfoPlate__header">
				<p>Выбор корпуса</p>
			</div>

			<div class="MobPlansMasterPlanInfoPlate__body">
				<p class="MobPlansMasterPlanInfoPlate__building">
					{{ buildingData.tr_b }}
				</p>

				<div class="MobPlansMasterPlanInfoPlate__delimiter" />

				<div class="MobPlansMasterPlanInfoPlate__info">
					<div class="MobPlansMasterPlanInfoPlate__item">
						<p class="MobPlansMasterPlanInfoPlate__item-value">
							{{ livingStore.buildingDataHovered.maxf }}
						</p>
						<p class="MobPlansMasterPlanInfoPlate__item-name">
							этаж{{ wordEnd(livingStore.buildingDataHovered.maxf, 'floors') }}
						</p>
					</div>
					<div class="MobPlansMasterPlanInfoPlate__item">
						<p class="MobPlansMasterPlanInfoPlate__item-value">
							{{ livingStore.buildingDataHovered.at }}
						</p>
						<p class="MobPlansMasterPlanInfoPlate__item-name">
							номер{{ wordEnd(livingStore.buildingDataHovered.at, 'hotelRoom') }}
						</p>
					</div>
					<div class="MobPlansMasterPlanInfoPlate__item">
						<p class="MobPlansMasterPlanInfoPlate__item-value">
							{{ formatCost(livingStore.buildingDataHovered.mmcd?.t?.min) }}
						</p>
						<p class="MobPlansMasterPlanInfoPlate__item-name">
							цена от, руб
						</p>
					</div>
				</div>

				<div class="MobPlansMasterPlanInfoPlate__actions">
					<UIStandardButton
						color="var(--color-white)"
						border="var(--color-sea)"
						background="var(--color-sea)"
						width="100%"
						@click="selectBuilding"
					>
						Выбрать
					</UIStandardButton>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
const livingStore = useLotsLivingStore();
const buildingData = computed(() => livingStore.buildingDataHovered);

function outsideClick() {
	livingStore.setHoveredBuilding();
}

const queryHandler = useQueryHandler();
function selectBuilding() {
	queryHandler.change({ building: livingStore.buildingAltHovered });
}
</script>

<style lang="scss">
.MobPlansMasterPlanInfoPlate {
	@include div100(fixed);

	pointer-events: none;

	&__content {
		position: absolute;
		top: 100%;
		left: 0;

		width: 100%;
		margin-top: -5.4rem;

		color: var(--color-sea);

		background-color: #F9F5F1;

		transition-timing-function: var(--easeInOutQuart);
		transition-duration: 0.69s;
		transition-property: translate;
	}

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

	&__building {
		@include font(3rem, 400, 1.2em, -0.15rem);

		text-transform: uppercase;
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

	&.active {
		pointer-events: all;

		.MobPlansMasterPlanInfoPlate__content {
			translate: 0 calc(-100% + 5.4rem);
		}
	}
}
</style>
