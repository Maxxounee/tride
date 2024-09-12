<template>
	<CookieCard ref="cookieCardComponent">
		<span>
			Используя данный сайт, вы даете согласие на использование<br />
			файлов cookie, помогающих нам сделать его удобнее для вас.
		</span>
		<button @click="close">Принять</button>
	</CookieCard>
</template>

<script
	lang="ts"
	setup
>
import CookieCard from '@art3d/CookieCard/index.vue';

const cookieCardComponent = ref();

function close() {
	cookieCardComponent.value.acceptCookie();
}

onMounted(() => {

})
</script>

<style lang="scss">

.CookieCard {
	@include flexColumn(center, center);
	@include font(1.2rem, 500, 1.4rem);

	position: fixed;
	right: var(--ruler-d-r);
	bottom: 0;
	translate: 0 100%;

	gap: 1rem;

	padding: 2rem 6rem 1.6rem;

	text-align: center;
	text-transform: uppercase;

	background: var(--color-background);
	border-radius: 0.2rem 0.2rem 0 0;
	box-shadow: 0 0 40px rgb(0 0 0 / 3%);

	transition-timing-function: var(--easeInOutQuart);
	transition-duration: 0.3s;
	transition-property: translate;

	button {
		text-decoration: underline;
	}

	&_active {
		translate: none;
	}
}
</style>
