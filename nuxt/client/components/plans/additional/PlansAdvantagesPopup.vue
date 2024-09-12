<template>
	<Lenis
		ref="lenis"
		class="PlansAdvantagesPopup"
		:class="{ active: popupStore.advantagesActive }"
	>
		<div class="PlansAdvantagesPopup__title">
			<BigTitleText :style="{ marginRight: '36rem' }">
				Больше
			</BigTitleText>
			<BigTitleTextAccent>для собственников</BigTitleTextAccent>
		</div>
		<div class="content">
			<div
				v-for="(row, rowIndex) in rows"
				:key="rowIndex"
				class="content__row"
			>
				<div
					v-for="(card, index) in row"
					:key="index"
					class="card"
					:style="{
						'--color': card.color ?? 'var(--color-white)',
					}"
				>
					<NuxtImg
						class="card__image"
						:src="card.image"
						format="webp"
					/>
					<div class="card__content">
						<h4
							class="card__title"
							v-html="card.title"
						/>
						<p
							class="card__text"
							v-html="card.text"
						/>
					</div>
				</div>
			</div>
		</div>
	</Lenis>
</template>

<script lang="ts" setup>
const { $bus } = useNuxtApp();

const popupStore = usePopupStore();
const rows = [
	[
		{
			image: '/images/plans/advantages/00.jpg',
			title: 'СПЕЦИАЛЬНЫЕ<br/>УСЛОВИЯ ОТДЫХА',
			text: `Собственники апартаментов могут<br/>
			проживать бесплатно 4 недели,<br/>
			в остальное время действует скидка — 18%.`,
			color: 'var(--color-forest)',
		},
		{
			image: '/images/plans/advantages/01.jpg',
			title: `ДИЗАЙНЕРСКИЙ<br/>
			РЕМОНТ, ВКЛЮЧЕННЫЙ<br/>
			В СТОИМОСТЬ`,
			text: `Комплектация апартамента соответствует<br/>
			международным стандартам отеля 4* и сервисным<br/>
			стандартам гостиничного бренда Alean Collection`,
		},
	],
	[
		{
			image: '/images/plans/advantages/02.jpg',
			title: `ФОНД<br/>
			КАПИТАЛЬНОГО<br/>
			РЕМОНТА`,
			text: `Из операционных доходов арендатора формируется<br/>
			фонд капитального ремонта, за счет которого после<br/>
			каждого высокого сезона ремонтируется номерной<br/>
			фонд. Это поддерживает апартаменты в идеальном<br/>
			состоянии на протяжении всего срока использования.`,
		},
		{
			image: '/images/plans/advantages/03.jpg',
			title: `ПЕРСОНАЛЬНЫЕ<br/>
			ПРЕДЛОЖЕНИЯ`,
			text: `Собственнику предоставляются скидки<br/>
			на все услуги курорта.`,
			color: 'var(--color-sea)',
		},
	],
];

watch(
	() => popupStore.advantagesActive,
	(value) => {
		if (value) {
			$bus.$emit('activateHeaderClose', {
				callback: popupStore.hideAdvantages,
				keepPreviousCallback: true,
			});
		}
	},
);
</script>

<style lang="scss">
.PlansAdvantagesPopup {
	@include div100;

	translate: 0 -100%;

	overflow: hidden;

	padding-bottom: 5.6rem;

	background-color: var(--color-background);

	transition-timing-function: var(--easeInOutQuart);
	transition-duration: 0.6s;
	transition-property: translate;

	&.active {
		translate: none;
	}

	.PlansAdvantagesPopup__title {
		padding-top: 24rem;
		text-align: center;

		.BigTitleText {
			color: var(--color-sea);
		}

		.BigTitleTextAccent {
			// margin-left: 49rem;
		}
	}

	.content {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr 1fr;
		gap: 2rem;

		margin-top: 9rem;
		padding: 0 var(--ruler-d-l);

		&__row {
			display: grid;
			gap: 2rem;
			height: 43rem;

			&:first-of-type {
				grid-template-columns: 10fr 9fr;
			}

			&:last-of-type {
				grid-template-columns: 9fr 10fr;
			}
		}

		.card {
			position: relative;

			&__image {
				@include div100;
			}

			&__content {
				@include flexColumn(null, space);

				position: relative;
				height: 100%;
				padding: 3.6rem 4.5rem 4.3rem;
				color: var(--color);
			}

			&__title {
				@include font(3rem, 400, 1.1em, -0.04em);
			}

			&__text {
				@include font(1.5rem, 400, 1.4em, -0.03em);
			}
		}
	}
}
</style>
