<template>
	<div class="FloorPlan">
		<Transition :name="currentFloorNumber > previousFloorNumber ? 'default-floor' : 'default-floor-reverse'">
			<div
				:key="floorId"
				class="FloorPlan__inner"
			>
				<Area2svgTemp
					ref="areaInstance"
					:flats-data="jsonData?.apartments"
					:floor-id="floorId"
					:get-floor-id="getFloorId"
					:path-attr="pathAttr"
					:mouseover="() => {}"
					:mouseout="() => {}"
					@content-loaded="areaLoaded"
					@area-mouse-over="$emit('areaMouseOver', $event)"
					@area-mouse-out="$emit('areaMouseOut', $event)"
					@area-click="$emit('areaClick', $event)"
				/>
				<ResizableBlock
					:ratio="areaRatio"
					contain
				>
					<!-- <div -->
					<!--	v-if="isLabels" -->
					<!--	class="FloorPlan__labels" -->
					<!-- &gt; -->
					<!--	<div -->
					<!--		v-for="(value, name) in labels" -->
					<!--		:key="name" -->
					<!--		class="FloorPlan__label" -->
					<!--		:class="value.x" -->
					<!--		:style="{ -->
					<!--			'&#45;&#45;left': 100 * value.x + '%', -->
					<!--			'&#45;&#45;top': 100 * value.y + '%', -->
					<!--		}" -->
					<!--		v-html="labelTemplate(value)" -->
					<!--	/> -->
					<!-- </div> -->

					<!-- <StreetDirections -->
					<!--	v-if="directions" -->
					<!--	v-bind="directions" -->
					<!-- /> -->
				</ResizableBlock>
			</div>
		</Transition>
	</div>
</template>

<script
	lang="ts"
	setup
>
// import type {Props as StreetDirectionsProps} from '@art3d_v3/street-directions';
import ResizableBlock from '~/components/utils/ResizableBlock.vue';

interface Props {
	jsonData: LivingObject | undefined;
	floorId: string | undefined;

	getFloorId?(d: Apartment): string;

	svgKey?: string;
	pathAttr?: object;
	apartIndex?: number;
	isLabels?: boolean;

	labelTemplate?(label: Label): string | number | undefined;

	// directions?: StreetDirectionsProps;
}

const props = withDefaults(defineProps<Props>(), {
	svgKey: '$floor',
	getFloorId: (d: Apartment) => `${d.b}-${d.s}-${d.f}`,
	isLabels: true,
	labelTemplate: (label: Label) => label.sq,
});

const previousFloorNumber = ref();
const currentFloorNumber = ref();

watch(
	() => props.floorId,
	(value, oldValue) => {
		previousFloorNumber.value = oldValue?.split('-')[2];
		currentFloorNumber.value = value.split('-')[2];
	},
);
const emit = defineEmits([
	'areaLoaded',
	'floorLoaded',
	'areaMouseOver',
	'areaMouseOut',
	'areaClick',
]);

const areaInstance = ref<any>(null);
watch(() => [props.jsonData, props.floorId], () => {
	nextTick(loadFloorSvg);
});
onMounted(() => {
	loadFloorSvg();
});

const areaRatio = ref();
const areaElements = ref();
const areaOpt = ref();

async function load() {
	await loadFloorSvg();
	emit('floorLoaded');
}

async function loadFloorSvg() {
	if (!props.jsonData || !props.floorId) {
		return;
	}
	areaInstance.value.resetSvgGroups();
	await areaInstance.value.loadContent({
		type: 'svg',
		content: props.jsonData.floors[props.floorId].$floor,
	});
}

function areaLoaded(areaData: any) {
	areaRatio.value = areaData.img.ratio;

	areaElements.value = areaData.areaElements;
	areaOpt.value = areaData.areaOpt;
	props.isLabels && setLabels();
	emit('areaLoaded', areaData);
}

interface Labels {
	[index: string]: Label;
}

interface Label extends Apartment {
	active: boolean;
	x: number;
	y: number;
}

const labels = ref<Labels>({});

function setLabels() {
	Object.values(areaElements.value).forEach((el: any) => {
		const path = el[0];

		const d = props.jsonData?.apartments[path.alt];

		if (!d) {
			return;
		}
		const center = path.getCentroid();

		labels.value[path.alt] = {
			...d,
			active: false,
			x: center.cx / areaOpt.value.sizeWidth,
			y: center.cy / areaOpt.value.sizeHeight,
		};
		el.st = d.st;
	});
}

defineExpose({ load, areaInstance });
</script>

<style lang="scss">
.FloorPlan {
	position: relative;

	display: flex;
	align-items: center;
	justify-content: center;

	width: 100%;

	&__inner {
		position: absolute;
		width: 100%;

		.Area2svgTemp,
		.Area2svgTemp_content,
		img {
			position: relative;
		}
	}

	&__labels {
		@include div100;

		pointer-events: none;
	}

	.ResizableBlock {
		pointer-events: none;
	}

	&__label {
		pointer-events: all;

		position: absolute;
		top: var(--top);
		left: var(--left);
		transform: translate(-50%, -50%);
	}

	.default-floor {
		&-enter-active,
		&-leave-active {
			pointer-events: none;

			opacity: 0;

			transition-timing-function: ease-in-out;
			transition-duration: 0.6s;
			transition-property: scale, opacity;
		}

		&-enter-from {
			scale: 1.2;
			opacity: 0;
		}

		&-leave-to {
			scale: 0.9;
			opacity: 0;
		}

		&-enter-to,
		&-leave-from {
			opacity: 1;
		}
	}

	.default-floor-reverse {
		&-enter-active,
		&-leave-active {
			pointer-events: none;

			opacity: 0;

			transition-timing-function: ease-in-out;
			transition-duration: 0.6s;
			transition-property: scale, opacity;
		}

		&-enter-from {
			scale: 0.9;
			opacity: 0;
		}

		&-leave-to {
			scale: 1.2;
			opacity: 0;
		}

		&-enter-to,
		&-leave-from {
			opacity: 1;
		}
	}
}
</style>
