<template>
	<div class="OperatorFirstWrapper">
		<NuxtImg
			class="OperatorFirstWrapper__background"
			src="/images/operator/background.png"
			format="webp"
			quality="80"
		/>
		<slot></slot>
	</div>
</template>

<script
	lang="ts"
	setup
>
const scroller = inject('pageScroller');
onMounted(() => {

})
</script>

<style lang="scss">

.OperatorFirstWrapper {
	position: relative;

	&__background {
		position: absolute;

		width: unset;
		min-width: 100%;
		max-width: unset;
		height: 100%;
		max-height: unset;
	}
}
</style>
