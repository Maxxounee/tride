<template>
	<p class="ContactsCopy txt-h7 txt_up">
		alean resort montvert <span>© {{ new Date().getFullYear() }}</span>
	</p>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.ContactsCopy {}

.layout-mobile .ContactsCopy {
	@include flex(center, space);
	@include font(1.8rem, 400, 1.5em, -0.05em);
}
</style>
