<template>
	<div class="Area2svg">
		<div
			ref="AreaBottom"
			class="Area2svg_area Area2svg_area_bottom"
		/>
		<div
			ref="AreaContent"
			class="Area2svg_content"
		>
			<slot />
		</div>
		<div
			ref="AreaTop"
			class="Area2svg_area Area2svg_area_top"
		/>
	</div>
</template>

<script
	lang="ts"
	setup
>
import { SVG as SVGjs, extend as SVGExtend, Path as SVGPath } from '@svgdotjs/svg.js';
import type { Container, G } from '@svgdotjs/svg.js';

import { CreatePathFromArea, extendMethods } from './utils/index';
import type { AreaPath, PathAttributes, AreaDataItem } from './types';

SVGExtend(SVGPath, extendMethods);
SVGExtend(SVGPath, {
	bottom: undefined as any,
});

export interface Props {
	each?(el: AreaPath): void;

	altStart?: string;
	pathAttributes?: PathAttributes;
	areaData?: AreaDataItem[];
	width?: number;
	height?: number;
}

const props = withDefaults(defineProps<Props>(), {
	altStart: '',
});

const emit = defineEmits<{
	(e: 'areaMounted'): void;
	(e: 'areaClick', elTop: void): void;
	(e: 'areaMouseOver', elTop: void): void;
	(e: 'areaMouseOut', elTop: void): void;
}>();

const AreaContent = ref<HTMLElement>();
const AreaBottom = ref<HTMLElement>();
const AreaTop = ref<HTMLElement>();

const drawBottom = ref<Container>();
const drawTop = ref<Container>();
const groupBottom = ref<G>();
const groupTop = ref<G>();

const topElements = ref<{ [index: string]: AreaPath[] }>({});

const pathStyles = computed(() => {
	return {
		...{
			'opacity': 0,
			'fill': '#00f',
			'fill-opacity': 1,
			'stroke': '#f00',
			'stroke-opacity': 0,
			'stroke-width': 3,
			'stroke-linejoin': 'round',
			'cursor': 'pointer',
		},
		...props.pathAttributes,
	};
});

function initAreaSvg() {
	if (!AreaContent.value || !AreaBottom.value || !AreaTop.value) return;

	drawBottom.value = SVGjs().addTo(AreaContent.value).size('100%', '100%');
	drawTop.value = SVGjs().addTo(AreaTop.value).size('100%', '100%');
}

function clearMap() {
	drawBottom.value?.clear();
	drawTop.value?.clear();
	groupBottom.value = drawBottom.value?.group();
	groupTop.value = drawTop.value?.group();
}

function parseMap() {
	props.areaData?.forEach((areaItemData: AreaDataItem) => {
		const newPath = new CreatePathFromArea(areaItemData.type ?? 'poly').createPath(areaItemData.coords);

		initPath(
			groupBottom.value?.path(newPath),
			groupTop.value?.path(newPath),
			`${props.altStart}${areaItemData.alt}`,
		);
	});
}

function setListeners(el: AreaPath) {
	el
		.on('click', () => emit('areaClick', el))
		.on('mouseover', () => emit('areaMouseOver', el))
		.on('mouseout', () => emit('areaMouseOut', el));
}

function initPath(elBottom: AreaPath | undefined, elTop: AreaPath | undefined, alt: string) {
	if (!elBottom) {
		console.error(`%c◥ [Area2svg initPath()]: \n\n %c%s`, 'color: #e31c4b; font-size: 18px;', 'color: white', 'elBottom is undefined');
		return;
	}
	if (!elTop) {
		console.error(`%c◥ [Area2svg initPath()]: \n\n %c%s`, 'color: #e31c4b; font-size: 18px;', 'color: white', ' elTop is undefined');
		return;
	}

	Object.entries(pathStyles.value).forEach(item => elBottom.node.setAttribute(item[0], String(item[1])));

	elTop.node.setAttribute('opacity', '0');
	elTop.node.setAttribute('fill', '#fff');
	elTop.node.setAttribute('cursor', pathStyles.value.cursor);

	elTop.bottom = elBottom;
	elTop.alt = alt;

	if (!topElements.value[alt]) {
		topElements.value[alt] = [];
	}

	topElements.value[alt].push(elTop);

	setListeners(elTop);

	props.each && props.each(elTop);
}

tryOnMounted(async () => {
	if (!AreaContent.value || !AreaBottom.value || !AreaTop.value) return;

	initAreaSvg();

	await nextTick();

	if (props.areaData) {

	}
	watch(
		() => props.areaData,
		(value) => {
			if (value) {
				clearMap();
				parseMap();
			}
		},
		{ deep: true, immediate: true },
	);
	drawBottom.value?.viewbox(0, 0, props.width, props.height);
	drawTop.value?.viewbox(0, 0, props.width, props.height);

	emit('areaMounted');
}, false);

defineExpose({ initAreaSvg });
</script>

<style lang="scss">
.Area2svg {
	position: relative;
	width: 100%;
	height: 100%;

	&_area,
	&_content,
	&_img {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
	}

	&_img {
		object-fit: contain;
	}
}
</style>
