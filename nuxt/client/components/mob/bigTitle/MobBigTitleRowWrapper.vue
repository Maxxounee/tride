<template>
	<div class="MobBigTitleRowWrapper">
		<div class="MobBigTitleRowWrapper__col">
			<slot />
		</div>
		<div class="MobBigTitleRowWrapper__col">
			<slot name="col2" />
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const props = withDefaults(defineProps<{
	align?: string
	colAlign?: string
}>(), {
	align: 'center',
	colAlign: 'flex-start'
})
</script>

<style lang="scss">
.MobBigTitleRowWrapper {
	@include flex;

	align-items: v-bind(align);

	&__col {
		@include flexColumn;

		gap: 1.4rem;
		align-items: v-bind(colAlign);
	}
}
</style>
