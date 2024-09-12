<template>
	<div class="BigTitleRowWrapper">
		<div class="BigTitleRowWrapper__col">
			<slot />
		</div>
		<div class="BigTitleRowWrapper__col">
			<slot name="col2" />
		</div>
	</div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.BigTitleRowWrapper {
	@include flex(center);

	// gap: 4rem;

	&__col {
		@include flexColumn(start);

		gap: 4rem;
	}
}
</style>
