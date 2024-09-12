<template>
	<div class="MobPlansBuilding">
		<div class="MobPlansBuilding__plan">
			<div class="MobPlansBuilding__plan-container">
				<NuxtImg
					v-if="imageCached"
					class="MobPlansBuilding__background"
					:src="imageCached"
				/>
				<Area2svg
					:width="1920"
					:height="1080"
					:each="areaEach"
					:area-data="paths"
					@area-mouse-over="() => {}"
					@area-mouse-out="() => {}"
					@area-click="areaClick"
				/>
			</div>
		</div>

		<MobPlansBuildingInfoPlate />
	</div>
</template>

<script lang="ts" setup>
// import PlansBuildingPlanInfoPlate from '~/components/plans/additional/PlansBuildingPlanInfoPlate.vue';
import ResizableBlock from '~/components/utils/ResizableBlock.vue';
import type { AreaPath } from '~/components/Area2svg/types';

const queryHandler = useQueryHandler();

const areaPathStore: TAreaPathStore = useAreaPathStore();
const livingStore = useLotsLivingStore();

const image = computed(() => areaPathStore.floorPaths[livingStore.buildingId]?.image);
const imageCached = ref();
const paths = computed(() => areaPathStore.floorPaths[livingStore.buildingId]?.paths);

watch(() => image.value, (value: string | undefined) => {
	if (value) imageCached.value = value;
}, { immediate: true });

const sectionId = [livingStore.params.building, 1].join('-');
const floor = livingStore.availableFloors[sectionId][0];
livingStore.setHoveredFloor(floor);

const currentElement = ref();

function areaEach(el: AreaPath) {
	el.bottom.attr({ fill: '#ffffff', opacity: 0.2 });

	const at = livingStore.livingData?.floors?.[el.alt]?.at;

	if (!at || at < 1) {
		el.bottom.attr({ display: 'none' });
		el.attr({ display: 'none' });
	}

	if (el.alt === livingStore.floorAltHovered) {
		currentElement.value = el;
		el.bottom.attr({ fill: '#00859B', opacity: 0.4 });
	}
}

function areaClick(el: AreaPath) {
	if (currentElement.value) {
		currentElement.value.bottom.attr({ fill: '#ffffff', opacity: 0.2 });
	}
	currentElement.value = el;
	el.bottom.attr({ fill: '#00859B', opacity: 0.4 });
	livingStore.setHoveredFloor(el.alt);
	// const [building, section, floor] = el.alt.split('-');
	// queryHandler.change({ building, section, floor });
}

onMounted(() => {
	// livingStore.setHoveredFloor('1-1-5');
});
</script>

<style lang="scss">
.MobPlansBuilding {
	@include flexColumn;
	@include div100m;

	color: var(--color-sea);
	background-color: var(--color-background);

	&__plan {
		position: relative;
		overflow: hidden;
		display: flex;
		flex: 1 1;
	}

	&__plan-container {
		position: relative;
	}

	&__background {
		width: max-content;
		max-width: unset;
		height: 100%;
	}

	.Area2svg {
		@include div100;

		path {
			transition: opacity 0.2s, fill 0.2s;
		}
	}
}
</style>
