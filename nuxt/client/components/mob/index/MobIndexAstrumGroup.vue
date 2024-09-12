<template>
	<section class="MobIndexAstrumGroup">
		<ScaleSection
			selector=".MobIndexAstrumGroup__scale-element"
			left-origin="10%"
		>
			<MobBigTitle show-ignore-class="MobIndexAstrumGroup__scale-element">
				<MobBigTitleRow>
					<MobBigTitleTextAccent class="MobIndexAstrumGroup__scale-element">
						Astrum Group
					</MobBigTitleTextAccent>
				</MobBigTitleRow>
				<MobBigTitleRowWrapper :style="{marginTop: '1.3rem'}">
					<MobBigTitleImg
						src="/images/index/astrum/0.png"
						:style="{ marginRight: '2rem' }"
						height="7.5rem"
					/>
					<template #col2>
						<MobBigTitleRow>
							<MobBigTitleText>партнер</MobBigTitleText>
						</MobBigTitleRow>
						<MobBigTitleRow
							:style="{marginTop: '-1rem'}"
						>
							<MobBigTitleTextAccent>вашего</MobBigTitleTextAccent>
						</MobBigTitleRow>
					</template>
				</MobBigTitleRowWrapper>

				<MobBigTitleRow
					:style="{ marginTop: '1.3rem' }"
				>
					<MobBigTitleText>
						успеха
					</MobBigTitleText>
					<MobBigTitleImg
						height="3.7rem"
						:style="{ marginLeft: '1.4rem' }"
						src="/images/index/astrum/1.png"
					/>
				</MobBigTitleRow>

			</MobBigTitle>
		</ScaleSection>

		<UtilsAppearanceDisappearanceBlock>
			<p
				class="MobIndexAstrumGroup__text MobIndexAstrumGroup__text_n0"
				v-nbsp
			>
				Курорт строит группа компаний Astrum Group&nbsp;— краснодарский девелопер со специализацией на
				современных
				туристических комплексах и курортной инфраструктуре
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<UtilsAppearanceDisappearanceBlock>
			<p
				class="MobIndexAstrumGroup__text MobIndexAstrumGroup__text_n1"
				v-nbsp
			>
				Российская промышленно-строительная компания Astrum Group на
				рынке более 20 лет. Компания строит объекты в
				местах с инвестиционным потенциалом и участвует
				в проектах, которые приносят пользу людям.
				<br /><br />
				Для Astrum Group важно способствовать развитию территории
				и формированию нового взгляда на туристические
				места. В нее входят компании, занимающиеся девелопментом,
				фудтех, коммуникационными и медицинскими услугами.
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<UtilsAppearanceDisappearanceBlock>
			<MobSimpleColoredText class="MobIndexAstrumGroup__text MobIndexAstrumGroup__text_n2">
				<mark> Миссия компании —</mark>
				<br />
				<span>
					делать то, чего <br />
					не делают другие
				</span>
			</MobSimpleColoredText>
		</UtilsAppearanceDisappearanceBlock>
		<UtilsAppearanceDisappearanceBlock>
			<p
				class="MobIndexAstrumGroup__text MobIndexAstrumGroup__text_n3"
				v-nbsp
			>
				Astrum Group акцентирует внимание на благотворительности,
				социальной ответственности и заботе о людях.
				Объекты компании конкурируют с мировыми семейными All Inclusive отелями по благоустройству.
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<ClippedIntersectImg
			direction="left"
			class="MobIndexAstrumGroup__img MobIndexAstrumGroup__img_n0"
			src="/images/index/astrum/2.png"
			preset="default"
		/>
		<ClippedIntersectImg
			direction="left"
			class="MobIndexAstrumGroup__img MobIndexAstrumGroup__img_n1"
			src="/images/index/astrum/2.png"
			preset="default"
		/>

		<AppearanceDisappearanceBlock>
			<div class="MobIndexAstrumGroup__img-container">

				<NuxtImg
					direction="left"
					class="MobIndexAstrumGroup__img MobIndexAstrumGroup__img_n2"
					src="/images/index/astrum/2.png"
					preset="default"
				/>
				<p class="MobIndexAstrumGroup__text MobIndexAstrumGroup__text_n4">
					СРОК СДАЧИ КУРОРТА <br>
					ALEAN RESORT MONTVERT 4* <br>
					1 КВАРТАЛ 2027 ГОДА
				</p>
			</div>
		</AppearanceDisappearanceBlock>
		<UtilsAppearanceDisappearanceBlock class="MobIndexAstrumGroup__text MobIndexAstrumGroup__text_n5">
			<MobSimpleColoredText>
				<mark>У проектов компании</mark>
				<br />
				<span>
					высокий потенциал для <br>
					инвесторов и партнеров
				</span>
			</MobSimpleColoredText>
		</UtilsAppearanceDisappearanceBlock>

		<UtilsAppearanceDisappearanceBlock class="MobIndexAstrumGroup__text MobIndexAstrumGroup__text_n6">
			<p>
				Astrum Group создает целые курортные кластеры и повышает экономический потенциал территорий.
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<ClippedIntersectImg
			direction="left"
			class="MobIndexAstrumGroup__img MobIndexAstrumGroup__img_n3"
			src="/images/index/astrum/2.png"
			preset="default"
		/>
	</section>
</template>

<script
	lang="ts"
	setup
>
import AppearanceDisappearanceBlock from "~/components/utils/AppearanceDisappearanceBlock.vue";

const img1 = ref();
const scroller = inject<HTMLElement>('pageScroller');

onMounted(() => {
	// showFromOpacity('.MobIndexAstrumGroup__text-1');
	// showFromOpacity('.MobIndexAstrumGroup__text-2');
	//
	// useGsap.to('.MobIndexAstrumGroup__img-text', {
	// 	y: '50rem',
	// 	scrollTrigger: {
	// 		scroller,
	// 		trigger: unrefElement(img1),
	// 	},
	// });
	//
	// useGsap.to('.MobIndexAstrumGroup__text-block-1', {
	// 	y: '35rem',
	// 	scrollTrigger: {
	// 		scroller,
	// 		trigger: '.MobIndexAstrumGroup__text-block-1',
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
.MobIndexAstrumGroup {
	@include flexColumn;

	min-height: 100vh;
	padding: 6rem var(--ruler-m-r) 0;
	background-color: var(--color-background);

	&__text {
		&_n0 {
			@include font(2.4rem, 400, 1.1em, -0.04em);

			margin-top: 4.4rem;
			color: var(--color-sea);
			text-align: center;
		}

		&_n1 {
			@include font(1.6rem, 400, 1.4em, -0.03em);

			margin-top: 4.4rem;
			color: var(--color-text);
			text-align: center;
		}

		&_n2 {
			margin-top: 6.6rem;
		}

		&_n3 {
			@include font(1.6rem, 400, 1.4em, -0.03em);

			margin-top: 1.9rem;
			color: var(--color-text);
		}

		&_n4 {
			@include font(1rem, 500, 1.2em);

			color: var(--color-text);
		}

		&_n5 {
			margin-top: 6.6rem;
		}

		&_n6 {
			@include font(1.6rem, 400, 1.4em, -0.03em);

			margin-top: 1.9rem;
			color: var(--color-text);
		}
	}

	&__img {
		&_n0 {
			margin-top: 4.4rem;
		}

		&_n1 {
			align-self: flex-end;
			width: 69vw;
			margin-top: 4.4rem;
		}

		&_n2 {
		}

		&_n3 {
			margin-top: 4.4rem;
		}
	}

	&__img-container {
		@include flex(end);

		gap: 1.5rem;
		margin-top: -5.7rem;

		img {
			width: unset;
		}

		p {
			flex: 1 1;
		}
	}
}
</style>
