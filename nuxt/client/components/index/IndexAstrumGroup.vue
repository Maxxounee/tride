<template>
	<section class="IndexAstrumGroup">
		<ScaleSection
			selector=".IndexAstrumGroup__scale-element"
			left-origin="20%"
		>
			<BigTitle show-ignore-class="IndexAstrumGroup__scale-element">
				<BigTitleRow>
					<BigTitleTextAccent class="IndexAstrumGroup__scale-element">
						Astrum Group
					</BigTitleTextAccent>
					<BigTitleImg
						src="/images/index/astrum/0.png"
						:style="{ marginLeft: '5.6rem' }"
					/>
				</BigTitleRow>

				<BigTitleRow
					left="11rem"
					:style="{ marginTop: '3.4rem' }"
				>
					<BigTitleText>партнер&nbsp;</BigTitleText>
					<BigTitleTextAccent>вашего</BigTitleTextAccent>
				</BigTitleRow>

				<BigTitleRow
					left="26.8rem"
					:style="{ marginTop: '3.4rem' }"
				>
					<BigTitleImg src="/images/index/astrum/1.png" />
					<BigTitleText :style="{ marginLeft: '4.5rem' }">
						успеха
					</BigTitleText>
				</BigTitleRow>
			</BigTitle>
		</ScaleSection>

		<UtilsAppearanceDisappearanceBlock>
			<p
				class="IndexAstrumGroup__text-1 txt-h3"
				v-nbsp
			>
				Курорт строит группа компаний Astrum Group&nbsp;— краснодарский девелопер со специализацией на
				современных
				туристических комплексах и курортной инфраструктуре
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<UtilsAppearanceDisappearanceBlock>
			<p
				class="IndexAstrumGroup__text-2 txt-h7"
				v-nbsp
			>
				Российская промышленно-строительная компания Astrum Group на рынке более 20 лет. Компания строит объекты
				в
				местах с инвестиционным потенциалом и участвует в проектах, которые приносят пользу людям. Для Astrum
				Group
				важно способствовать развитию территории и формированию нового взгляда на туристические места. В нее
				входят
				компании, занимающиеся девелопментом, фудтех, коммуникационными и медицинскими услугами.
			</p>
		</UtilsAppearanceDisappearanceBlock>

		<div class="IndexAstrumGroup__columns">
			<div class="IndexAstrumGroup__col">
				<div class="IndexAstrumGroup__text-block-1">
					<UtilsAppearanceDisappearanceBlock>
						<p class="IndexAstrumGroup__text-3 txt-h3">
							<span class="txt_color-sun">Миссия компании —</span> <br>
							решать амбициозные задачи<br>
							в области строительства<br>современных объектов.
						</p>
					</UtilsAppearanceDisappearanceBlock>
					<UtilsAppearanceDisappearanceBlock>
						<p
							class="IndexAstrumGroup__text-4 txt-h7"
							v-nbsp
						>
							Astrum Group акцентирует внимание на благотворительности,
							социальной ответственности и заботе о людях.
							Объекты компании конкурируют с мировыми семейными All Inclusive отелями по благоустройству.
						</p>
					</UtilsAppearanceDisappearanceBlock>
				</div>

				<ClippedIntersectImg
					direction="left"
					class="IndexAstrumGroup__img-1"
					src="/images/index/astrum/2.png"
					preset="default"
				/>

				<ClippedIntersectImg
					ref="img1"
					direction="left"
					class="IndexAstrumGroup__img-2"
					src="/images/index/astrum/3.png"
					preset="default"
				/>
			</div>

			<div class="IndexAstrumGroup__col IndexAstrumGroup__col_2">
				<ClippedIntersectImg
					class="IndexAstrumGroup__img-3"
					src="/images/index/astrum/4.png"
					preset="default"
					width="800"
				/>

				<div class="IndexAstrumGroup__img-text">
					<NuxtImg
						class="IndexAstrumGroup__img-4"
						src="/images/index/astrum/5.png"
						preset="default"
					/>

					<p class="IndexAstrumGroup__text-5 txt-h8">
						СРОК СДАЧИ КУРОРТА <br>
						ALEAN RESORT MONTVERT 4* <br>
						1 КВАРТАЛ 2027 ГОДА
					</p>
				</div>

				<UtilsAppearanceDisappearanceBlock class="IndexAstrumGroup__text-6">
					<p class="txt-h3">
						<span class="txt_color-sun">У проектов компании</span> <br>
						высокий потенциал для <br>
						инвесторов и партнеров
					</p>
				</UtilsAppearanceDisappearanceBlock>

				<UtilsAppearanceDisappearanceBlock>
					<p class="IndexAstrumGroup__text-7 txt-h7">
						Astrum Group создает целые курортные кластеры и повышает экономический потенциал территорий.
					</p>
				</UtilsAppearanceDisappearanceBlock>
			</div>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>
const img1 = ref();
const scroller = inject<HTMLElement>('pageScroller');

onMounted(() => {
	// showFromOpacity('.IndexAstrumGroup__text-1');
	// showFromOpacity('.IndexAstrumGroup__text-2');
	//
	// useGsap.to('.IndexAstrumGroup__img-text', {
	// 	y: '50rem',
	// 	scrollTrigger: {
	// 		scroller,
	// 		trigger: unrefElement(img1),
	// 	},
	// });
	//
	// useGsap.to('.IndexAstrumGroup__text-block-1', {
	// 	y: '35rem',
	// 	scrollTrigger: {
	// 		scroller,
	// 		trigger: '.IndexAstrumGroup__text-block-1',
	// 	},
	// });
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
.IndexAstrumGroup {
	@include flexColumn(center);

	min-height: 100vh;
	padding: 11rem var(--ruler-d-r) 0 var(--ruler-d-l);
	background-color: var(--color-background);

	&__text-1 {
		max-width: 142rem;
		margin-top: 18rem;
		text-align: center;
	}

	&__text-2 {
		max-width: 100rem;
		margin-top: 12rem;
		color: var(--color-text);
		text-align: center;
	}

	&__columns {
		@include flex(stretch, space);

		align-self: stretch;
		margin-top: 26rem;
	}

	&__col {
		@include flexColumn(start);

		&_2 {
			translate: calc(var(--ruler-d-r) + 1px);
		}
	}

	&__text-3 {
	}

	&__text-4 {
		max-width: 53.3rem;
		margin-top: 4rem;
		color: var(--color-text);
	}

	&__img-1 {
		width: 62.9rem;
		height: auto;
		margin-top: 50rem;
	}

	&__img-2 {
		width: 93.3rem;
		height: auto;
		margin-top: 21rem;
		margin-left: calc(-1 * var(--ruler-d-l));
	}

	&__img-3 {
		width: 86.9rem;
		height: auto;
	}

	&__img-text {
		@include flex(end);

		gap: 3rem;
		margin-top: 33rem;
	}

	&__img-4 {
		width: 29.1rem;
	}

	&__text-5 {
		color: var(--color-text);
	}

	&__text-6 {
		margin-top: auto;
	}

	&__text-7 {
		max-width: 62.2rem;
		margin-top: 4rem;
		color: var(--color-text);
	}
}
</style>
