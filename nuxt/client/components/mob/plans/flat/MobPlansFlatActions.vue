<template>
	<div class="MobPlansFlatActions">
		<UIStandardButton
			class="MobPlansFlatActions__reserve"
			v-bind="buttonsProps"
		>
			забронировать
		</UIStandardButton>
		<UIStandardButton
			v-bind="buttonsProps"
			width="max-content"
		>
			PDF
		</UIStandardButton>
		<UIStandardButton
			v-bind="buttonsProps"
			width="max-content"
		>
			<NuxtIcon name="ui/heart-stroke" />
		</UIStandardButton>
	</div>
</template>

<script lang="ts" setup>
const buttonsProps = ref({
	background: 'var(--color-white)',
	hoverBackground: 'var(--color-sun)',
	hoverBorder: 'var(--color-sun)',
});
</script>

<style lang="scss">
.MobPlansFlatActions {
	@include flex;

	flex-wrap: wrap;
	gap: 1rem;

	& &__reserve {
		flex: 1 1;
		padding: 0;
	}
}
</style>
