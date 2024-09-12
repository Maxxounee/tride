<template>
	<section class="LocationNewPlace">
		<ScaleSection
			selector=".LocationNewPlace__scale-element"
			left-origin="10%"
		>
			<BigTitle show-ignore-class="LocationNewPlace__scale-element">
				<BigTitleRow>
					<BigTitleTextAccent class="LocationNewPlace__scale-element">
						новый&nbsp;
					</BigTitleTextAccent>
					<BigTitleText :style="{ translate: '15rem' }">
						сочи
					</BigTitleText>
				</BigTitleRow>
				<BigTitleRow
					left="35rem"
					:style="{ marginTop: '2.6rem' }"
				>
					<BigTitleText :style="{ translate: '-20rem' }">
						для тех,&nbsp;
					</BigTitleText>
					<BigTitleTextAccent :style="{ translate: '10rem' }">
						кто
					</BigTitleTextAccent>
				</BigTitleRow>
				<BigTitleRow
					left="22rem"
					:style="{ marginTop: '3rem' }"
				>
					<BigTitleTextAccent :style="{ translate: '-20rem' }">
						хочет&nbsp;
					</BigTitleTextAccent>
					<BigTitleText :style="{ translate: '20rem' }">
						большего
					</BigTitleText>
				</BigTitleRow>
			</BigTitle>
		</ScaleSection>

		<UtilsAppearanceDisappearanceBlock>
			<p
				v-nbsp
				class="LocationNewPlace__text-1"
			>
				Сочи ждет очередной виток развития и роста инвестиционной привлекательности. Курорт Alean Resort
				Montvert 4* станет неотъемлемой частью Нового Сочи.
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<UtilsAppearanceDisappearanceBlock>
			<p
				v-nbsp
				class="LocationNewPlace__text-2"
			>
				Развитие Лазаревского района сравнимо с развитием Красной Поляны перед Олимпиадой 2014. Курортная
				недвижимость создает рабочие места, привлекает туристов и инвесторов, способствует сохранению природы,
				развивает культурный и социальный потенциал территории.
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<SectionGridImages
			:grid-matrix="gridMatrix"
		/>
		<FooterScrollToStartButton />
	</section>
</template>

<script
	lang="ts"
	setup
>
import FooterScrollToStartButton from "~/components/footer/FooterScrollToStartButton.vue";

const scroller = inject<HTMLElement>('pageScroller');

// onMounted(() => {
// 	showFromOpacity('.LocationNewPlace__text-1');
// 	showFromOpacity('.LocationNewPlace__action-1');
// });
const gridMatrix = [
	[
		'/images/location/grid/00.png',
		'/images/location/grid/01.png',
		'/images/location/grid/02.png',
		'Больше людей,<br/>влюбленных<br/>в Сочи',
		null,
		'/images/location/grid/03.png',
	],
	[
		'/images/location/grid/04.png',
		'Больше<br/>уникальных<br/>объектов',
		null,
		'/images/location/grid/05.png',
		'/images/location/grid/06.png',
		'Больше<br/>скоростных трасс<br/>без пробок',
	],
	[
		null,
		'/images/location/grid/07.png',
		null,
		'/images/location/grid/08.png',
		'Больше масштаб<br/>и бюджеты<br/>на развитие',
		'/images/location/grid/09.png',
	],
]


</script>

<style lang="scss">
.LocationNewPlace {
	@include flexColumn(center);

	padding: 13rem var(--ruler-d-r) 0 var(--ruler-d-l);
	background-color: var(--color-background);

	&__text-1 {
		@include font(6rem, 400, 1.2em, -0.05em);

		max-width: 130rem;
		margin-top: 17rem;
		color: var(--color-sea);
		text-align: center;
	}

	&__text-2 {
		@include font(2rem, 400, 1.4em, -0.03em);

		max-width: 75rem;
		margin-top: 12rem;
		color: var(--color-text);
		text-align: center;
	}

	.SectionGridImages {
		margin-top: 30rem;
	}
}
</style>
