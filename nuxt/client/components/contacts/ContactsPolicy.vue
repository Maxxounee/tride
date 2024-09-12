<template>
	<div class="ContactsPolicy">
		<div class="ContactsPolicy__public">
			{{ mainStore.publicOfferText }}
		</div>
		<ButtonPrivacyPolicy class="ContactsPolicy__link txt-h7" />
	</div>
</template>

<script
	lang="ts"
	setup
>
const mainStore = useMainStore();
</script>

<style lang="scss">
.ContactsPolicy {
	@include flexColumn;

	gap: 3.7rem;

	&__public {
		@include font(1.4rem, 400, 1.1em, -0.05em);

		max-width: 36.4rem;
		opacity: 0.5;
	}
}

.layout-mobile .ContactsPolicy {
	gap: 1.2rem;

	&__link {
		@include font(1.8rem, 400, 1.5em, -0.05em);
	}
}
</style>
