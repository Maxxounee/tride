<template>
	<div class="MobPlansFlatActions2">
		<UIStandardButton
			v-bind="buttonsProps"
			width="100%"
			@click="callbackStore.show()"
		>
			Оставить заявку
		</UIStandardButton>
		<UIStandardButton
			v-bind="buttonsProps"
			width="100%"
			@click="popupStore.showAdvantages()"
		>
			преимущества собственника
		</UIStandardButton>
		<UIStandardButton
			v-bind="buttonsProps"
			class="MobPlansFlatActions2__stretch"
			width="auto"
			@click="popupStore.showPurchaseTerms()"
		>
			условия покупки
		</UIStandardButton>
		<UIStandardButton
			v-bind="buttonsProps"
			width="max-content"
			@click="popupStore.showFlatGallery()"
		>
			галерея
		</UIStandardButton>
	</div>
</template>

<script lang="ts" setup>
const buttonsProps = ref({
	background: 'var(--color-white)',
	hoverBackground: 'var(--color-sun)',
	hoverBorder: 'var(--color-sun)',
});

const callbackStore = useCallbackStore();
const popupStore = usePopupStore();
</script>

<style lang="scss">
.MobPlansFlatActions2 {
	@include flex;

	flex-wrap: wrap;
	gap: 1rem;

	& &__stretch {
		flex: 1 1;
	}
}
</style>
