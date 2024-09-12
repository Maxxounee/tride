<template>
	<div class="MobInfrastructureGuest">
		<MobBlockMustache>
			Посетите Alean Resort<br />
			Montvert 4* как гость
		</MobBlockMustache>
		<p class="MobInfrastructureGuest__text MobInfrastructureGuest__text_n0">
			Вы можете приобрести доступ
			на территорию курорта и пользоваться всеми возможностями Ultra All Inclusive
		</p>
		<BlockActionLink
			class="MobInfrastructureGuest__action MobInfrastructureGuest__action_n0"
			first="Сколько"
			second="это стоит?"
		/>
		<MobSectionScrollPhotoSlider
			:items="guest.cards"
		/>

		<FooterScrollToStartButton />
	</div>
</template>

<script
	lang="ts"
	setup
>
import {guest} from "~/configs/pages/infrastructure";

onMounted(() => {

})
</script>

<style lang="scss">

.MobInfrastructureGuest {
	@include flexColumn(center);

	padding: 4.5rem var(--ruler-m-l) 0;

	&__text {
		&_n0 {
			@include font(1.6rem, 400, 1.4em, -0.03em);

			margin-top: 5.9rem;
			padding: 0 3rem;
			color: var(--color-text);
			text-align: center;
		}
	}

	&__action {
		&_n0 {
			margin-top: 3.4rem;
		}
	}

	.MobSectionScrollPhotoSlider {
		margin-top: 7rem;
	}
}
</style>
