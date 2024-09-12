<template>
	<div class="MobBigTitleRow">
		<slot />
	</div>
</template>

<script
	setup
	lang="ts"
>
const props = withDefaults(defineProps<{
	left?: string;
	align?: string;
	justify?: string;
}>(), {
	left: '0',
	align: 'flex-end',
});
</script>

<style lang="scss">
.MobBigTitleRow {
	@include flex;

	align-items: v-bind(align);
	justify-content: v-bind(justify);
	padding-left: v-bind(left);
}
</style>
