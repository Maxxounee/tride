<template>
	<div class="layout-error">
		<div class="layout-error__container">
			<p v-html="statusCode"></p>
			<h1>Произошла ошибка</h1>
			<NuxtLink
				to="/"
				class="layout-error__link"
			>
				На главную
			</NuxtLink>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>

const error = useError();
const statusCode = ref<number>();

statusCode.value = error.value.statusCode;

console.error('[(╯°□°）╯︵ ┻━┻ ERROR]', error.value);
</script>

<style lang="scss">
@import "@/assets/styles/style";

.layout-error {
	@include div100;

	height: 100vh;
	background: linear-gradient(-45deg, #00859B, #006269, #DC6B2F, #DCBFA6);
	background-size: 400% 400%;
	animation: gradient 15s ease infinite;

	&__container {
		@include center;
	}

	p {
		font-size: 10rem;
	}

	h1 {
		font-size: 4rem;
		text-transform: uppercase;
	}

	&__link {
		margin-top: 5rem;

		font-size: 2rem;
		text-decoration: underline;
		text-underline-offset: 0.3rem;
		text-transform: uppercase;
	}

	@keyframes gradient {
		0% {
			background-position: 0 50%;
		}

		50% {
			background-position: 100% 50%;
		}

		100% {
			background-position: 0 50%;
		}
	}
}
</style>
