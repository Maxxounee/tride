<template>
	<section class="UltraAllInclusiveSection">
		<div class="UltraAllInclusiveSection__inner">
			<NuxtImg
				class="UltraAllInclusiveSection__bg div_100"
				src="/images/index/allinclusive/bg.webp"
			/>
			<div class="UltraAllInclusiveSection__content">
				<div class="UltraAllInclusiveSection__content-top">
					<BigTitle
						:exit-blur="false"
						:show-scrub="0.8"
					>
						<BigTitleRowWrapper>
							<BigTitleRow left="10rem">
								<BigTitleTextAccent :style="{ translate: '-10rem' }">система&nbsp;</BigTitleTextAccent>
								<BigTitleText :style="{ translate: '-7rem' }">Ultra</BigTitleText>
							</BigTitleRow>

							<BigTitleRow
								left="10.7rem"
							>
								<BigTitleText :style="{ translate: '-20rem' }">
									ALL INCLUSIVE
								</BigTitleText>
							</BigTitleRow>

							<template #col2>
								<BigTitleImg
									src="/images/index/allinclusive/0.png"
									width="15.5rem"
									height="21.9rem"
									:style="{ marginLeft: '4.7rem' }"
								/>
							</template>
						</BigTitleRowWrapper>

						<BigTitleRow :style="{ marginTop: '3.4rem' }">
							<BigTitleText :style="{ translate: '-15rem' }">для тех,&nbsp;</BigTitleText>
							<BigTitleTextAccent :style="{ translate: '12rem' }">кто&nbsp;</BigTitleTextAccent>
							<BigTitleText :style="{ translate: '17rem' }">хочет</BigTitleText>
						</BigTitleRow>

						<BigTitleRow
							left="28rem"
							:style="{ marginTop: '1.6rem' }"
						>
							<BigTitleImg src="/images/index/allinclusive/1.png" />
							<BigTitleTextAccent :style="{ marginLeft: '5.2rem', translate: '30rem' }">
								большего
							</BigTitleTextAccent>
						</BigTitleRow>
					</BigTitle>

					<p
						class="UltraAllInclusiveSection__text-1 txt-h7"
						v-nbsp
					>
						Alean Resort Montvert 4* предполагает круглогодичное удовольствие от отдыха. Выбирайте тот сезон
						и
						формат, который нравится лично вам, и наслаждайтесь системой Ultra All Inclusive.
					</p>

					<BlockActionLink
						class="UltraAllInclusiveSection__action-1"
						first="Хотите узнать больше?"
						first-color="var(--color-white)"
					/>
				</div>


				<div class="UltraAllInclusiveSection__bottom">
					<div class="UltraAllInclusiveSection-arrow-block">
						<UIArrow
							:width="39"
							dir="left"
						/>
						<p class="UltraAllInclusiveSection-arrow-block__text">
							более 800 м
						</p>
						<UIArrow :width="39" />
					</div>

					<p class="UltraAllInclusiveSection__bottom-text txt-h7">
						Самый большой частный пляж<br />на черноморском побережье
					</p>
				</div>
			</div>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>
const el = useCurrentElement();
const scroller = inject<HTMLElement>('pageScroller');


onMounted(() => {
	const unrefed = unrefElement(el);

	const blurItems = [
		unrefed.querySelector('.BigTitle'),
		unrefed.querySelector('.UltraAllInclusiveSection__text-1'),
		unrefed.querySelector('.UltraAllInclusiveSection__action-1'),
	]

	useGsap.to(blurItems, {
		y: () => '5rem',
		opacity: 0,
		stagger: 0.7,
		filter: 'blur(20px)',
		scrollTrigger: {
			scroller,
			trigger: '.UltraAllInclusiveSection__content-top',
			scrub: 1,
			start: () => 'top top-=40%',
			end: () => 'bottom 20%',
		},
	})
	const bottomEl = '.UltraAllInclusiveSection__bottom';

	useGsap.from(bottomEl, {
		opacity: 0,
		filter: 'blur(20px)',
		y: () => '5rem',
		scrollTrigger: {
			scroller,
			trigger: bottomEl,
			scrub: 1,
			start: () => 'top bottom',
			end: () => 'bottom bottom',
		},
	});
});

</script>

<style lang="scss">
.UltraAllInclusiveSection {
	position: relative;
	z-index: 1;

	overflow: hidden;

	height: 201.6rem;

	color: var(--color-white);

	&__inner {
		@include container100;

		padding: 0 var(--ruler-d-r) 11.6rem var(--ruler-d-l);
	}

	&__bg {
		object-position: bottom center;
	}

	&__content {
		@include container100;
		@include flexColumn(center);
	}

	&__content-top {
		@include flexColumn(center);

		padding-top: 28rem;
	}

	.BigTitleTextAccent {
		color: var(--color-white);
	}

	&__text-1 {
		width: 72.4rem;
		margin-top: 16rem;
		text-align: center;
	}

	&__action-1 {
		margin-top: 7rem;

		.ButtonRoundArrow_active .UIArrow {
			color: var(--color-sea);
		}
	}

	&__bottom {
		@include flexColumn(center);

		margin-top: auto;
		white-space: nowrap;
	}

	.UltraAllInclusiveSection-arrow-block {
		@include flex(center);

		gap: 6rem;

		&__text {
			@include font(10rem);
			@include textCrop;
		}
	}

	&__bottom-text {
		margin-top: 3rem;
		text-align: center;
	}
}
</style>
