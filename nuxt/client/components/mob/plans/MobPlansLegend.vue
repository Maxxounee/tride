<template>
	<div class="MobPlansLegend">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="MobPlansLegend__item"
		>
			<div
				class="MobPlansLegend__circle"
				:style="{
					opacity: item.opacity,
					background: item.color,
				}"
			/>
			<p
				class="MobPlansLegend__text"
				v-html="item.text"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	items: any;
}>();
</script>

<style lang="scss">
.MobPlansLegend {
	@include flex(center);

	gap: 2rem;

	&__item {
		@include flex(center);
	}

	&__circle {
		@include size(1.2rem);

		border-radius: 50%;
	}

	&__text {
		@include font(1.6rem, 400, 1.4em, -0.048rem);

		margin-left: 0.8rem;
		color: var(--color-sea);
	}
}
</style>
