<template>
	<section class="SectionBigTitle">
		<div class="SectionBigTitle__content">
			<slot />
		</div>
	</section>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.SectionBigTitle {
	@include flex(center, center);

	height: 100vh;
	background-color: var(--color-white);

	&__content {
		@include flexColumn(start);

		gap: 4rem;
	}
}
</style>
