<template>
	<div class="MobLocationNewPlace">
		<ScaleSection
			selector=".MobLocationNewPlace__scale-element"
			left-origin="10%"
		>
			<MobBigTitle show-ignore-class="MobLocationNewPlace__scale-element">
				<MobBigTitleRow :style="{ marginTop: '1.3rem'}">
					<MobBigTitleTextAccent class="MobLocationNewPlace__scale-element">
						новый&nbsp;
					</MobBigTitleTextAccent>
					<MobBigTitleText :style="{ translate: '5rem'}">
						сочи
					</MobBigTitleText>
				</MobBigTitleRow>
				<MobBigTitleRow :style="{ marginTop: '1.3rem'}">
					<MobBigTitleText :style="{ translate: '-5rem'}">
						ДЛЯ ТЕХ,
					</MobBigTitleText>
				</MobBigTitleRow>
				<MobBigTitleRow :style="{ marginTop: '1.3rem'}">
					<MobBigTitleTextAccent :style="{ translate: '-4rem'}">
						кто&nbsp;
					</MobBigTitleTextAccent>
					<MobBigTitleText :style="{ translate: '4rem'}">
						хочет
					</MobBigTitleText>
				</MobBigTitleRow>
				<MobBigTitleRow :style="{ marginTop: '1.3rem'}">
					<MobBigTitleText :style="{ translate: '-5rem'}">
						большего
					</MobBigTitleText>
				</MobBigTitleRow>
			</MobBigTitle>
		</ScaleSection>
		<p class="MobLocationNewPlace__text MobLocationNewPlace__text_n0">
			Сочи ждет
			очередной виток развития и роста инвестиционной привлекательности. Курорт Alean Resort Montvert 4* станет
			неотъемлемой частью Нового Сочи.
		</p>
		<p class="MobLocationNewPlace__text MobLocationNewPlace__text_n1">
			Развитие Лазаревского района сравнимо с развитием Красной Поляны перед Олимпиадой 2014. Курортная
			недвижимость создает рабочие места, привлекает туристов и инвесторов, способствует сохранению природы,
			развивает культурный и социальный потенциал территории.
		</p>

		<MobSectionGridImages :grid-matrix="gridMatrix" />

		<FooterScrollToStartButton />
	</div>
</template>

<script
	lang="ts"
	setup
>
const gridMatrix = [
	'Больше людей,<br/>влюбленных<br/>в Сочи',
	'/images/location/grid/00.png',
	'/images/location/grid/01.png',
	null,
	'/images/location/grid/02.png',
	'/images/location/grid/03.png',
	null,
	'Больше<br/>уникальных<br/>объектов',
	'/images/location/grid/04.png',
	'/images/location/grid/05.png',
	'/images/location/grid/06.png',
	null,
	'Больше<br/>скоростных трасс<br/>без пробок',
	'/images/location/grid/07.png',
	null,
	'/images/location/grid/08.png',
	'/images/location/grid/09.png',
	'Больше масштаб<br/>и бюджеты<br/>на развитие',
]
onMounted(() => {

})
</script>

<style lang="scss">

.MobLocationNewPlace {
	@include flexColumn(center);

	margin-top: 7rem;
	padding: 0 var(--ruler-m-l);
	background: var(--color-background);

	&__text {
		&_n0 {
			@include font(3rem, 400, 1.1em);

			margin-top: 4.4rem;
			color: var(--color-sea);
			text-align: center;
		}

		&_n1 {
			@include font(1.6rem, 400, 1.4em);

			margin-top: 4.4rem;
			padding: 0 3rem;
			color: var(--color-text);
			text-align: center;
		}
	}

	.MobSectionGridImages {
		margin-top: 6.4rem;
	}
}
</style>
