<template>
	<div class="OperatorWelcomeCard">
		<div class="OperatorWelcomeCard__inner">
			<NuxtIcon
				class="OperatorWelcomeCard__icon"
				:name="icon"
				filled
			/>
			<p
				class="OperatorWelcomeCard__title"
				v-html="title"
			/>
			<p
				class="OperatorWelcomeCard__text"
				v-html="text"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
type TProps = {
	icon: string;
	title: string;
	text: string;
};
defineProps<TProps>();
</script>

<style lang="scss">
.OperatorWelcomeCard {
	position: relative;
	min-width: 25rem;
	height: 29rem;

	&__inner {
		@include flexColumn;

		height: 100%;
		padding-left: 2.4rem;
		border-left: 1px solid var(--color-sea);
	}

	&__icon {
		font-size: 3.6rem;
	}

	&__title {
		@include font(6rem, 400, 1em, -0.04em);

		margin-top: auto;
	}

	&__text {
		@include font(2rem, 400, 1.4em, -0.03em);

		margin-top: 6.6rem;
	}
}

.layout-mobile .OperatorWelcomeCard {
	width: auto;
	height: 100%;
	height: 22rem;
	padding-right: 7rem;

	&__title {
		@include font(4.6rem, 400, 1.4em, -0.1823rem);
	}

	&__text {
		@include font(1.5rem, 400, 1.4em, -0.0456rem);

		margin-top: 2.2rem;
	}
}
</style>
