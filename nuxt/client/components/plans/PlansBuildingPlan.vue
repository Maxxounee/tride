<template>
	<div class="PlansBuildingPlan">
		<ResizableBlock>
			<NuxtImg
				v-if="imageCached"
				class="PlansBuildingPlan__background"
				:src="imageCached"
			/>
			<Area2svg
				:width="1920"
				:height="1080"
				:each="areaEach"
				:area-data="paths"
				@areaMouseOver="areaMouseover"
				@areaMouseOut="areaMouseout"
				@areaClick="areaClick"
			/>
		</ResizableBlock>

		<PlansBuildingPlanInfoPlate />
	</div>
</template>

<script
	lang="ts"
	setup
>

import PlansBuildingPlanInfoPlate from "~/components/plans/additional/PlansBuildingPlanInfoPlate.vue";
import ResizableBlock from "~/components/utils/ResizableBlock.vue";
import type {AreaPath} from "~/components/Area2svg/types";

const queryHandler = useQueryHandler();

const areaPathStore: TAreaPathStore = useAreaPathStore();
const livingStore = useLotsLivingStore();

const image = computed(() => areaPathStore.floorPaths[livingStore.buildingId]?.image);
const imageCached = ref();
const paths = computed(() => areaPathStore.floorPaths[livingStore.buildingId]?.paths);

watch(() => image.value, (value: string | undefined) => {
	if (value) imageCached.value = value;
}, {immediate: true})

function areaEach(el: AreaPath) {
	el.bottom.attr({fill: '#00859B', opacity: 0})

	const at = livingStore.livingData?.floors?.[el.alt]?.at;

	if (!at || at < 1) {
		el.attr({display: 'none'});
	}
}

function areaMouseover(el: AreaPath): void {
	el.bottom.attr({opacity: 0.4})
	livingStore.setHoveredFloor(el.alt);
}

function areaMouseout(el: AreaPath) {
	el.bottom.attr({opacity: 0})
	livingStore.setHoveredFloor();
}

function areaClick(el: AreaPath) {
	const [building, section, floor] = el.alt.split('-');
	queryHandler.change({building, section, floor})
}

onMounted(() => {

})
</script>

<style lang="scss">

.PlansBuildingPlan {
	@include div100;

	overflow: hidden;

	&__background {
		@include div100;
	}
}
</style>
