<template>
	<div class="MobSectionListWrapper">
		<MobSectionListItem
			v-for="(item, index) in items"
			:key="index"
			:border-bottom="index === items.length - 1"
			v-bind="item"
		/>
	</div>
</template>

<script
	lang="ts"
	setup
>

defineProps<{ items: [] }>();
onMounted(() => {

})
</script>

<style lang="scss">

.MobSectionListWrapper {
}
</style>
