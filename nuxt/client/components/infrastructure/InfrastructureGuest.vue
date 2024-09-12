<template>
	<div class="InfrastructureGuest">
		<div class="InfrastructureGuest__inner">
			<BlockMustache>
				Посетите Alean Resort<br />
				Montvert 4* как гость
			</BlockMustache>
			<UtilsAppearanceDisappearanceBlock>
				<p
					class="InfrastructureGuest__text"
					v-nbsp
				>
					Вы можете приобрести доступ на территорию курорта и пользоваться всеми возможностями Ultra All
					Inclusive
				</p>
			</UtilsAppearanceDisappearanceBlock>
			<BlockActionLink
				class="InfrastructureGuest__action-0"
				first="Сколько"
				second="это стоит?"
			/>
			<SectionScrollPhotoSlider
				:items="guest.cards"
			/>
			<FooterScrollToStartButton />

		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>

import {guest} from "~/configs/pages/infrastructure";

const el: HTMLElement = useCurrentElement().value;
const scroller = inject<HTMLElement>('pageScroller');

onMounted(() => {
})
</script>

<style lang="scss">
.InfrastructureGuest {
	&__inner {
		@include flexColumn(center);

		padding: 20rem var(--ruler-d-l) 5vh;
	}

	&__text {
		@include fontItalic(3rem, 300, 1.4em);

		max-width: 84rem;
		margin-top: 15rem;
		color: var(--color-text);
		text-align: center;
	}

	&__action-0 {
		margin-top: 4.5rem;
	}

	.SectionScrollPhotoSlider {
		margin-top: 11.4rem;
	}
}
</style>
