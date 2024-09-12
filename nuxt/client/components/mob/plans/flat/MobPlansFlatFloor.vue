<template>
	<div class="MobPlansFlatFloor">
		<FloorPlan
			ref="floorPlanInstance"
			:floor-id="String(livingStore.floorId)"
			:json-data="livingStore.livingData"
			@area-loaded="floorLoaded"
			@area-mouse-over="() => {}"
			@area-mouse-out="() => {}"
			@area-click="() => {}"
		/>
	</div>
</template>

<script lang="ts" setup>
const livingStore = useLotsLivingStore();
const floorPlanInstance = ref();

function floorLoaded() {
	floorPlanInstance.value?.areaInstance.forEach((el: any) => {
		if (el.alt === livingStore.apartId) {
			el.attr({ opacity: 0 });
			el.bottom.attr({
				'opacity': 1,
				'fill-opacity': 1,
				'fill': '#dc6b2f',
			});
		}
	});
}
</script>

<style lang="scss">
.MobPlansFlatFloor {
	.FloorPlan {
		position: relative;
		width: auto;
		height: auto;

		&__inner {
			position: relative;
			width: 100%;
			height: auto;
		}

		.Area2svgTemp {
			width: auto;
			height: auto;
		}

		.Area2svgTemp_img {
			position: relative;
			width: auto;
			height: auto;
		}
	}
}
</style>
