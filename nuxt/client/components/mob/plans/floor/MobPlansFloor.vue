<template>
	<div class="MobPlansFloor">
		<div class="MobPlansFloor__top">
			<p class="MobPlansFloor__building">
				{{ livingStore.buildingData.tr_b }}
			</p>
			<p class="MobPlansFloor__rooms">
				<span>{{ livingStore.floorData.at }}</span> номер{{ wordEnd(livingStore.floorData.at, 'hotelRoom') }}
			</p>
		</div>

		<Lenis
			:options="{ orientation: 'horizontal', gestureOrientation: 'horizontal' }"
			class="MobPlansFloor__scroller"
		>
			<FloorPlan
				ref="floorPlanInstance"
				:floor-id="activeFloorIdCached"
				:json-data="livingStore.livingData"
				@area-loaded="floorLoaded"
				@area-click="flatClick"
			/>
		</Lenis>

		<div class="MobPlansFloor__bottom">
			<MobPlansLegend :items="legend" />
		</div>
	</div>
</template>

<script lang="ts" setup>
const livingStore = useLotsLivingStore();
const activeFloorId = computed(() => livingStore.floorId);
const activeFloorIdCached = ref();
const floorPlanInstance = ref();
const queryHandler = useQueryHandler();

watch(activeFloorId, (value) => {
	if (value) activeFloorIdCached.value = value;
},
{ immediate: true },
);

const styles = {
	opacity: { active: 1, notActive: 0.3 },
	color: { lux: '#dc6c2f', standard: '#D9D8D5' },
};

const legend = [
	{
		text: 'Люкс',
		color: styles.color.lux,
		opacity: styles.opacity.notActive,
	},
	{
		text: 'Стандарт',
		color: styles.color.standard,
		opacity: styles.opacity.notActive,
	},
];

function floorLoaded() {
	floorPlanInstance.value?.areaInstance.forEach((el: any) => {
		const apart = livingStore.livingData?.apartments[el.alt];

		/* TODO: у всех хат ST === 0 */
		if (!apart || apart?.asddassdadsast === 0) {
			return;
		}
		else {
			el.attr({ opacity: 0 });
			el.bottom.attr({ 'opacity': styles.opacity.notActive, 'fill-opacity': 1 });

			if (apart?.rc === 2) {
				el.bottom.attr({ fill: styles.color.lux });
			}
			if (apart?.rc === 1) {
				el.bottom.attr({ fill: styles.color.standard });
			}
		}
	});
}

function flatClick(el) {
	const [building, section, floor, flat] = el.alt.split('-');
	queryHandler.change({ building, section, floor, flat });
}
</script>

<style lang="scss">
.MobPlansFloor {
	@include div100m(fixed);
	@include flexColumn;

	color: var(--color-sea);
	background-color: var(--color-background);

	&__top {
		@include flex(center, space);

		margin-top: 10rem;
		padding: 0 var(--ruler-m-r) 0 var(--ruler-m-l);
	}

	&__building {
		@include font(3rem, 400, 1.1em, -0.15rem);

		text-transform: uppercase;
	}

	&__rooms {
		@include font(1.8rem, 400, 1.1em, -0.126rem);

		span {
			@include fontItalic(3rem, 300, 1.1em, -0.12rem);

			color: var(--color-sun);
		}
	}

	.Lenis {
		overflow: scroll hidden;

		&__wrapper {
			width: max-content;
			height: 100%;
		}
	}

	&__scroller {
		flex: 1 1;
		width: 100%;
		margin-top: 5rem;
		padding: 0 var(--ruler-m-r);
	}

	.FloorPlan {
		width: auto;
		height: 100%;

		&__inner {
			position: relative;
			width: auto;
			height: 100%;
		}

		.Area2svgTemp {
			position: relative;
			top: unset;
			left: unset;

			width: auto;
			height: 100%;
		}
	}

	&__bottom {
		@include flex(center, center);

		margin-top: 6rem;
		margin-bottom: 6rem;
	}
}
</style>
