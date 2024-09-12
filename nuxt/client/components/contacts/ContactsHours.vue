<template>
	<div class="ContactsHours">
		<div class="ContactsHours__body">
			<div class="txt_up txt-h7 txt_color-sun">
				Часы работы
			</div>
			<p class="txt-h7">
				Пн. - Пт.: 9:00 - 20:00<br>
				Сб. - Вс.: 11:00 - 17:00
			</p>
		</div>
		<UIStandardButton
			class="ContactsHours__button"
			target="_blank"
			:href="mainStore.yaMapsLink"
			width="14.8rem"
		>
			на карте
		</UIStandardButton>
	</div>
</template>

<script
	lang="ts"
	setup
>
const mainStore = useMainStore();
</script>

<style lang="scss">
.ContactsHours {
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

.layout-mobile .ContactsHours {
	&__body {
		gap: 0.6rem;

		> * {
			@include font(1.8rem, 400, 1.4em, -0.03em);
		}
	}
}
</style>
