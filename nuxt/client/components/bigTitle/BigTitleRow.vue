<template>
	<div class="BigTitleRow">
		<slot />
	</div>
</template>

<script
	setup
	lang="ts"
>
const props = withDefaults(defineProps<{
	left?: string;
}>(), {
	left: '0',
});

</script>

<style lang="scss">
.BigTitleRow {
	@include flex(end);

	padding-left: v-bind(left);
}
</style>
