<template>
	<div class="ContactsOffice">
		<div class="ContactsOffice__body">
			<div class="txt_up txt-h7 txt_color-sun">
				Офис продаж
			</div>
			<address
				class="txt-h7"
				v-html="mainStore.address"
			/>
		</div>
		<UIStandardButton class="ContactsOffice__button">
			<a
				v-format-email="mainStore.email"
				v-html="mainStore.email"
			/>
		</UIStandardButton>
	</div>
</template>

<script lang="ts" setup>
const mainStore = useMainStore();
</script>

<style lang="scss">
.ContactsOffice {
	&__body {
		@include flexColumn;

		gap: 2.5rem;
	}

	address {
		font-style: normal;
	}

	&__button {
		margin-top: 2.5rem;
	}
}

.layout-mobile .ContactsOffice {
	&__body {
		gap: 0.6rem;

		> * {
			@include font(1.8rem, 400, 1.4em, -0.03em);
		}
	}
}
</style>
