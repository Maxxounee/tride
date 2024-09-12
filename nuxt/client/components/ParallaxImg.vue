<template>
	<div class="ParallaxImg">
		<div
			ref="innerEl"
			class="ParallaxImg__inner"
			:style="{ backgroundImage }"
		/>
	</div>
</template>

<script
	lang="ts"
	setup
>
const props = defineProps({
	strength: {
		type: Number,
		default: 24,
	},
	src: {
		type: String,
		required: true,
	},
	ipxOptions: {
		type: Object,
		default: () => ({
			format: 'webp',
			quality: 80,
		}),
	},
});
const img = useImage();
const backgroundImage = computed(() => {
	const ipxImg = img(props.src, props.ipxOptions);
	return `url(${ipxImg})`;
});
const scroller = inject<HTMLElement>('pageScroller');
const extraHeight = computed(() => (100 + props.strength) + '%');
const el = useCurrentElement();
const innerEl = ref();

onMounted(() => {
	useGsap.fromTo(unrefElement(innerEl), {
		yPercent: props.strength * -1,
	}, {
		yPercent: props.strength * 1,
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el),
		},
	});
});
</script>

<style lang="scss">
.ParallaxImg {
	position: relative;
	overflow: hidden;

	&__inner {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: v-bind(extraHeight);

		background: no-repeat center center / cover;
	}
}
</style>
