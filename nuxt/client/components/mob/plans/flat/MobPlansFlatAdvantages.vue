<template>
	<Transition name="moveUp">
		<Lenis
			v-if="popupStore.advantagesActive"
			class="MobPlansFlatAdvantages"
		>
			<div class="MobPlansFlatAdvantages__container">
				<div class="MobPlansFlatAdvantages__title">
					<MobBigTitleRowWrapper
						col-align="flex-end"
						align="flex-end"
					>
						<MobBigTitleRow>
							<MobBigTitleText>Больше</MobBigTitleText>
							<MobBigTitleTextAccent>&nbsp;для</MobBigTitleTextAccent>
						</MobBigTitleRow>
						<MobBigTitleRow>
							<MobBigTitleTextAccent :style="{ marginRight: '1.3rem' }">
								собственников
							</MobBigTitleTextAccent>
						</MobBigTitleRow>
					</MobBigTitleRowWrapper>
				</div>

				<div class="MobPlansFlatAdvantages__list">
					<div
						v-for="(item, key) in items"
						:key
						class="advantage-item"
					>
						<NuxtImg
							class="advantage-item__image"
							:src="item.image"
							preset="default"
						/>
						<p
							class="advantage-item__title"
							v-html="item.title"
						/>
						<p
							class="advantage-item__text"
							v-html="item.text"
						/>
					</div>
				</div>
			</div>
		</Lenis>
	</Transition>
</template>

<script lang="ts" setup>
const { $bus } = useNuxtApp();
const popupStore = usePopupStore();

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

const items = ref([
	{
		image: '/images/plans/advantages/00_m.png',
		title: `
			Специальные<br/>
			условия отдыха`,
		text: `
			Собственники апартаментов могут <br/>
			проживать бесплатно 4 недели, <br/>
			в остальное время действует скидка — 18%.`,
		color: 'var(--color-forest)',
	},
	{
		image: '/images/plans/advantages/01_m.png',
		title: `
			Дизайнерский ремонт, <br/>
			включенный в стоимость`,
		text: `
			Комплектация апартамента соответствует <br/>
			международным стандартам отеля 4* и сервисным <br/>
			стандартам гостиничного бренда Alean Collection`,
	},
	{
		image: '/images/plans/advantages/02_m.png',
		title: `
			Фонд капитального <br/>
			ремонта`,
		text: `
			Из операционных доходов арендатора формируется <br/>
			фонд капитального ремонта, за счет которого после <br/>
			каждого высокого сезона ремонтируется номерной <br/>
			фонд. Это поддерживает апартаменты в идеальном <br/>
			состоянии на протяжении всего срока использования.`,
	},
	{
		image: '/images/plans/advantages/03_m.png',
		title: `
			Персональные <br/>
			предложения`,
		text: `Собственнику предоставляются скидки <br/>
			на все услуги курорта.`,
		color: 'var(--color-sea)',
	},
]);
</script>

<style lang="scss">
.MobPlansFlatAdvantages {
	@include div100m;

	overflow: hidden;
	padding-top: 6.4rem;
	background-color: var(--color-background);

	&__container {
		padding: 4rem var(--ruler-m-r) 4rem var(--ruler-m-l);
	}

	&__list {
		@include flexColumn;

		gap: 1.5rem;
		margin-top: 4rem
	}

	.advantage-item {
		padding-bottom: 3rem;
		border-bottom: 1px solid var(--color-sea);

		&:last-child {
			border-bottom: none;
		}

		&__image {
			aspect-ratio: 1 / 1;
			width: 100%;
			height: auto;
		}

		&__title {
			@include font(2.4rem, 400, 1.1em, -0.04em);

			margin-top: 1.5rem;
			text-transform: none;
		}

		&__text {
			@include font(1.6rem, 400, 1.4em, -0.03em);

			margin-top: 2rem;
			color: var(--color-text);

			br {
				display: none;
			}
		}
	}
}
</style>
