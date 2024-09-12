<template>
	<div class="MobSimpleSectionWrapper">
		<div
			class="MobSimpleSectionWrapper__inner"
			:class="{ centerContent }"
		>
			<slot></slot>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
type Props = {
	background?: string;
	centerContent?: boolean;
	height?: string;
	padding?: string;
}

const props = withDefaults(defineProps<Props>(), {
	background: 'var(--color-background)',
	centerContent: true,
});
// const props = defineProps<Props>();
onMounted(() => {

})
</script>

<style lang="scss">

.MobSimpleSectionWrapper {
	@include div100v(relative);

	display: flex;
	width: 100vw;
	height: v-bind(height);
	padding: v-bind(padding);

	&__inner {
		@include div100;

		background: v-bind(background);

		&.centerContent {
			@include flex(center, center);
		}
	}
}
</style>
