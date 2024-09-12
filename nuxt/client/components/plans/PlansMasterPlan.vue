<template>
	<div class="PlansMasterPlan">
		<ResizableBlock>
			<NuxtImg
				class="PlansMasterPlan__background"
				:src="areaPathStore.masterPlanImage"
			/>

			<Area2svg
				:width="1920"
				:height="1080"
				:each="areaEach"
				:area-data="areaPathStore.masterPlan"
				@area-mouse-over="areaMouseover"
				@area-mouse-out="areaMouseout"
				@area-click="areaClick"
			/>
			<template
				v-for="(item, index) in areaPathStore.masterPlanPoints"
				:key="index"
			>
				<PlansMasterPlanPoint
					v-if="livingStore.livingData.buildings?.[item.alt]?.at"
					:left="item.position[0]"
					:top="item.position[1]"
					:alt="item.alt"
				/>
			</template>
			<video
				src="/video/plans/hero.mp4"
				class="PlansMasterPlan__video"
				muted
				autoplay
				@ended="endedVideoHandler"
			/>
		</ResizableBlock>
		<PlansMasterPlanInfoPlate />
	</div>
</template>

<script
	lang="ts"
	setup
>
import ResizableBlock from '~/components/utils/ResizableBlock.vue';
import PlansMasterPlanInfoPlate from '~/components/plans/additional/PlansMasterPlanInfoPlate.vue';
import PlansMasterPlanPoint from '~/components/plans/additional/PlansMasterPlanPoint.vue';
import type { AreaPath } from '~/components/Area2svg/types';

const areaPathStore: TAreaPathStore = useAreaPathStore();
const livingStore: TLotsLivingStore = useLotsLivingStore();
const queryHandler = useQueryHandler();

function endedVideoHandler(event: Event) {
	useGsap.to(event.target, {
		opacity: 0,
		duration: 0.3,
		onComplete: () => event?.target?.remove(),
	});
}

function areaEach(el: AreaPath) {
	el.bottom.attr({ fill: '#00859B', opacity: 0 });

	// if (livingStore.livingData?.sections[el.alt].st.sold) {
	// 	el.attr({pointerEvents: 'none'});
	// }
}

function areaMouseover(el: AreaPath): void {
	el.bottom.attr({ opacity: 0.4 });
	livingStore.setHoveredBuilding(el.alt);
}

function areaMouseout(el: AreaPath) {
	el.bottom.attr({ opacity: 0 });
	livingStore.setHoveredBuilding();
}

function areaClick(el: AreaPath) {
	queryHandler.change({ building: el.alt });
}
</script>

<style lang="scss">
.PlansMasterPlan {
	@include div100;

	&__background {
		@include div100;
	}

	&__video {
		@include div100;
	}

	.Area2svg {
		path {
			transition: opacity 0.2s;
		}
	}
}
</style>
