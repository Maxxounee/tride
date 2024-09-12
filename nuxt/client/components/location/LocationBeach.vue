<template>
	<section class="LocationBeach">
		<ScaleSection
			selector=".LocationBeach__scale-element"
			left-origin="70%"
		>
			<BigTitle show-ignore-class="LocationBeach__scale-element">
				<BigTitleRow>
					<BigTitleText :style="{ translate: '-10rem' }">
						больше&nbsp;
					</BigTitleText>
					<BigTitleTextAccent
						class="LocationBeach__scale-element"
					>
						места
					</BigTitleTextAccent>
				</BigTitleRow>
				<BigTitleRow
					left="51rem"
					:style="{ marginTop: '4rem' }"
				>
					<BigTitleText :style="{ translate: '-20rem' }">
						на частном
					</BigTitleText>
				</BigTitleRow>
				<BigTitleRow left="33.6rem">
					<BigTitleTextAccent :style="{ translate: '20rem' }">
						пляже
					</BigTitleTextAccent>
				</BigTitleRow>
			</BigTitle>
		</ScaleSection>


		<p class="LocationBeach__text-1 txt-h7">
			САМЫЙ БОЛЬШОЙ ЧАСТНЫЙ ПЛЯЖ 800 М. <br>
			Первая береговая линия, современная пляжная инфраструктура.
		</p>

		<BlockActionLink
			class="LocationBeach__action-1"
			first="Сколько это в"
			second="шагах?"
		/>

		<ClientOnly>
			<BlockMustache class="LocationBeach__mustache">
				Курорт расположен <br>
				в Лазаревском районе, вдали<br>
				от магистралей и суеты
			</BlockMustache>
		</ClientOnly>

		<div class="LocationBeach__main">
			<div class="LocationBeach__main-col">
				<ClippedIntersectImg
					direction="top"
					class="LocationBeach__img-0"
					src="/images/location/beach/0.png"
				/>

				<p class="LocationBeach__img-text">
					Самый большой <br>
					на побережье комплекс <br>
					открытых бассейнов
				</p>

				<ClippedIntersectImg
					direction="left"
					class="LocationBeach__img-1"
					src="/images/location/beach/2.png"
				/>

				<p class="LocationBeach__img-text">
					Целые зоны <br>
					детского счастья <br>
				</p>
			</div>

			<div class="LocationBeach__main-col">
				<p class="LocationBeach__text-2 txt-h7">
					Лазаревский район Большого Сочи восхищает природными красотами. Горные вершины, покрытые лесами,
					сменяются чистыми пляжами и изумрудными водами. Мягкий климат и морской воздух благотворно влияют на
					самочувствие. <br><br>
					Alean Resort Montvert 4* предлагает гостям как активный отдых, так и оздоровление.
				</p>

				<ClippedIntersectImg
					direction="top"
					class="LocationBeach__img-2"
					src="/images/location/beach/1.png"
				/>

				<p class="LocationBeach__img-text">
					Лечебные <br>
					процедуры
				</p>

				<ClippedIntersectImg
					direction="top"
					class="LocationBeach__img-3"
					src="/images/location/beach/3.png"
				/>

				<p class="LocationBeach__img-text">
					Крытый <br>
					аквапарк
				</p>
			</div>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>
const scroller = inject<HTMLElement>('pageScroller');

onMounted(() => {
	showFromOpacity('.LocationBeach__text-1');
	showFromOpacity('.LocationBeach__action-1');
});

function showFromOpacity(selector: gsap.DOMTarget) {
	useGsap.from(selector, {
		opacity: 0,
		scrollTrigger: {
			scroller,
			trigger: selector,
			scrub: false,
			start: () => 'center bottom-=25%',
		},
	});
}
</script>

<style lang="scss">
.LocationBeach {
	@include flexColumn(center);

	padding: 13rem var(--ruler-d-r) 0 var(--ruler-d-l);
	background-color: var(--color-background);

	&__text-1 {
		margin-top: 13.1rem;
		color: var(--color-text);
		text-align: center;
	}

	&__action-1 {
		margin-top: 6.2rem;
	}

	&__mustache {
		margin-top: 30rem;
	}

	&__main {
		@include flex(stretch, space);

		align-self: stretch;
		margin-top: 35rem;
		color: var(--color-text);
	}

	&__main-col {
		@include flexColumn(start);
	}

	&__img-0 {
		width: 85.5rem;
		height: 117.3rem;
	}

	&__img-text {
		margin-top: 2.8rem;

		font-size: 1.2rem;
		font-weight: 500;
		line-height: 130%;
		text-transform: uppercase;
	}

	&__img-1 {
		width: 61.5rem;
		height: 46.5rem;
		margin-top: 22rem;
	}

	&__text-2 {
		max-width: 63.2rem;
	}

	&__img-2 {
		width: 76.2rem;
		height: 60.3rem;
		margin-top: 9.2rem;
	}

	&__img-3 {
		width: 53.5rem;
		height: 63.7rem;
		margin-top: 14.8rem;
	}
}
</style>
