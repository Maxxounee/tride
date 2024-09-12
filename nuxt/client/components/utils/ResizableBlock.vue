<template>
	<div class="ResizableBlock">
		<slot />
	</div>
</template>

<script
	lang="ts"
	setup
>
import {computed} from 'vue'
import {useParentElement, useElementSize} from '@vueuse/core'

const props = defineProps({
	contain: {
		type: Boolean,
		default: false,
	},
	ratio: {
		type: Number,
		default: 16 / 9,
	},
	setOnlyAspect: {
		type: Boolean,
		default: false,
	},
	position: {
		type: String,
		default: 'absolute',
	}
})

const parentEl = useParentElement()
const parentSize = useElementSize(parentEl)
const calcSize = computed(() => parentSize.width.value / props.ratio)
// const size = computed(() => props.contain ? Math.min(calcSize.value, parentSize.height.value) : Math.max(calcSize.value, parentSize.height.value))
const size = computed(() => Math.max(calcSize.value, parentSize.height.value))
const width = computed(() => (size.value * props.ratio) + 'px')
const height = computed(() => (size.value) + 'px')

let marginLeft;
let marginTop;

if (!props.setOnlyAspect) {
	marginLeft = computed(() => (0.5 * (parentSize.width.value - size.value * props.ratio)) + 'px')
	marginTop = computed(() => (0.5 * (parentSize.height.value - size.value)) + 'px')
}
</script>

<style lang="css">
.ResizableBlock {
	position: v-bind(position);
	top: 0;
	left: 0;

	width: v-bind(width);
	height: v-bind(height);
	margin-top: v-bind(marginTop);
	margin-left: v-bind(marginLeft);
}
</style>
