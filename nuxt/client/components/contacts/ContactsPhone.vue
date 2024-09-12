<template>
	<a
		class="ContactsPhone"
		:href="formatPhone(mainStore.phone)"
		v-html="updatedNumber"
	/>
</template>

<script lang="ts" setup>
const mainStore = useMainStore();
const updatedNumber = computed(() => {
	return mainStore.phone.replace(/(800)/, '<span>$1</span>');
});
</script>

<style lang="scss">
.ContactsPhone {
	@include fontItalic(6vw, 300, 11.9rem, -0.4rem);

	@include text-crop(1, 13px, 0);

	display: block;

	span {
		color: var(--color-sun);
	}
}

.layout-mobile .ContactsPhone {
	@include fontItalic(12vw, 300, 1.1em, -0.04em);
}
</style>
