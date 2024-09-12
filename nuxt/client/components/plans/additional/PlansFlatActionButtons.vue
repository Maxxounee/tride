<template>
	<div class="PlansFlatActionButtons">
		<UIStandardButton
			v-for="(button, index) in buttons"
			:key="index"
			background="var(--color-white)"
			hover-background="var(--color-sun)"
			hover-border="var(--color-sun)"
			@click="button.handler"
		>
			{{ button.text }}
		</UIStandardButton>
	</div>
</template>

<script
	lang="ts"
	setup
>
const queryHandler = useQueryHandler();
const router = useRouter();
const popupStore = usePopupStore();
const buttons = [
	{
		text: 'Преимущества собственника',
		handler: () => {
			popupStore.showAdvantages();
		},
	},
	{
		text: 'галерея номера',
		handler: () => {
			popupStore.showFlatGallery();
		},
	},
	{
		text: 'Условия покупки',
		handler: () => {
			popupStore.showPurchaseTerms();
		},
	}
]
onMounted(() => {

})
onBeforeUnmount(() => {
	queryHandler.remove(['advantages', 'purchase-terms']);
})
</script>

<style lang="scss">

.PlansFlatActionButtons {
	@include flexColumn;

	gap: 1.4rem;

	.UIStandardButton {
		width: 100%;
	}
}
</style>
