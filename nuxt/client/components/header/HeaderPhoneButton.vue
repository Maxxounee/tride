<template>
	<div class="HeaderPhoneButton">
		<ButtonBase
			:href="formatPhone(mainStore.phone)"
		>
			{{ mainStore.phone }}
		</ButtonBase>
	</div>
</template>

<script
	lang="ts"
	setup
>

const mainStore = useMainStore();
onMounted(() => {

})
</script>

<style lang="scss">

.HeaderPhoneButton {
}
</style>
