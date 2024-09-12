<template>
	<div class="MobPlansMasterPlan">
		<Lenis
			ref="lenisScroll"
			class="MobPlansMasterPlan__scroller"
			:options="{
				orientation: 'horizontal',
				gestureOrientation: 'horizontal',
			}"
		>
			<div class="MobPlansMasterPlan__container">
				<NuxtImg
					class="MobPlansMasterPlan__background"
					:src="areaPathStore.masterPlanImage"
				/>

				<Area2svg
					:width="1920"
					:height="1080"
					:each="areaEach"
					:area-data="areaPathStore.masterPlan"
					@area-mouse-over="() => {}"
					@area-mouse-out="() => {}"
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
					class="MobPlansMasterPlan__video"
					muted
					autoplay
					@ended="endedVideoHandler"
				/>
			</div>
		</Lenis>

		<UIStandardButton
			class="MobPlansMasterPlan__search"
			color="var(--color-sea)"
			border="var(--color-white)"
			background="var(--color-white)"
			@click="goToSearch"
		>
			По параметрам
		</UIStandardButton>

		<MobPlansMasterPlanInfoPlate />
	</div>
</template>

<script lang="ts" setup>
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

const currentAreaEl = ref();

function areaEach(el: AreaPath) {
	el.bottom.attr({ fill: '#00859B', opacity: 0 });
}

function areaClick(el: AreaPath) {
	currentAreaEl.value = el;
	el.bottom.attr({ opacity: 0.4 });
	livingStore.setHoveredBuilding(el.alt);
}

watch(
	() => livingStore.buildingAltHovered,
	(value) => {
		if (!value) {
			currentAreaEl.value.bottom.attr({ opacity: 0 });
		}
	},
);

const lenisScroll = ref();

onMounted(() => {
	setTimeout(() => {
		lenisScroll.value?.scrollTo(lenisScroll.value.lenis.dimensions.scrollWidth / 2, { duration: 2 });

		console.log(lenisScroll.value.lenis);
	}, 500);
});

const router = useRouter();
function goToSearch() {
	router.push('/search');
}
</script>

<style lang="scss">
.MobPlansMasterPlan {
	@include div100;

	&__scroller {
		@include div100;
	}

	.Lenis {
		overflow: scroll hidden;

		&__wrapper {
			width: max-content;
			height: 100%;
		}
	}

	&__container {
		position: relative;
		width: auto;
		height: 100%;
	}

	&__search {
		@include center(x);

		bottom: 12rem;
	}

	&__background {
		width: auto;
		max-width: unset;
		height: 100%;
	}

	&__video {
		@include div100;
	}

	.Area2svg {
		@include div100;

		path {
			transition: opacity 0.2s;
		}
	}
}
</style>
