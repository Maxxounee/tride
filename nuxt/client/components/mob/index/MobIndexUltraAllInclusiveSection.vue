<template>
	<div class="MobIndexUltraAllInclusiveSection">

		<div class="MobIndexUltraAllInclusiveSection__inner">
			<div class="MobIndexUltraAllInclusiveSection__bg">
				<NuxtImg
					src="/images/index/allinclusive/mob/bg.jpg"
				/>
			</div>
			<div class="MobIndexUltraAllInclusiveSection__content">
				<div class="MobIndexUltraAllInclusiveSection__content-top">
					<MobBigTitle
						:exit-blur="false"
						:show-scrub="0.8"
					>
						<MobBigTitleRow left="10rem">
							<MobBigTitleTextAccent :style="{ translate: '6rem' }">
								система
							</MobBigTitleTextAccent>
						</MobBigTitleRow>
						<MobBigTitleRowWrapper :style="{ marginTop: '1.6rem' }">
							<MobBigTitleRow>
								<MobBigTitleText :style="{ marginLeft: '1rem', translate: '-6rem' }">
									Ultra ALL
								</MobBigTitleText>
							</MobBigTitleRow>
							<MobBigTitleRow>
								<MobBigTitleText :style="{ translate: '-6rem' }">
									INCLUSIVE
								</MobBigTitleText>
							</MobBigTitleRow>
							<template #col2>
								<MobBigTitleImg
									src="/images/index/allinclusive/0.png"
									width="5.9rem"
									height="8.3rem"
									:style="{ marginLeft: '2.4rem' }"
								/>
							</template>
						</MobBigTitleRowWrapper>

						<MobBigTitleRow
							:style="{ marginTop: '1.6rem' }"
							align="center"
						>
							<MobBigTitleImg
								src="/images/index/allinclusive/1.png"
								width="7.5rem"
								height="3.7rem"
								:style="{ marginLeft: '4.7rem' }"
							/>
							<MobBigTitleText :style="{ marginLeft: '1rem', translate: '6rem' }">для тех
							</MobBigTitleText>
						</MobBigTitleRow>

						<MobBigTitleRow
							:style="{ marginTop: '1.6rem' }"
						>
							<MobBigTitleTextAccent :style="{ translate: '-6rem' }">
								кто
							</MobBigTitleTextAccent>
							<MobBigTitleText :style="{ marginLeft: '1rem' }">
								Хочет
							</MobBigTitleText>
						</MobBigTitleRow>
						<MobBigTitleRow
							left="9rem"
							:style="{ marginTop: '1.6rem' }"
						>
							<MobBigTitleTextAccent :style="{  translate: '8rem' }">
								большего
							</MobBigTitleTextAccent>
						</MobBigTitleRow>
					</MobBigTitle>

					<AppearanceDisappearanceBlock>
						<p
							class="MobIndexUltraAllInclusiveSection__text MobIndexUltraAllInclusiveSection__text_n0"
							v-nbsp
						>
							Alean Resort Montvert 4* предполагает круглогодичное удовольствие от отдыха. Выбирайте тот
							сезон
							и
							формат, который нравится лично вам, и наслаждайтесь системой Ultra All Inclusive.
						</p>

					</AppearanceDisappearanceBlock>

					<BlockActionLink
						class="MobIndexUltraAllInclusiveSection__action MobIndexUltraAllInclusiveSection__action_n0"
						first="Хотите узнать больше?"
						first-color="var(--color-white)"
					/>
				</div>


				<footer class="footer">
					<p class="footer__title">
						более <strong>800</strong> м
					</p>
					<div class="footer__arrow-block">
						<div class="footer__arrow">
							<Icon name="ui:arrow-l" />
						</div>
						<p class="footer__text">
							протяженность<br />частного пляжа
						</p>
						<div class="footer__arrow">
							<Icon name="ui:arrow-l" />
						</div>
					</div>


				</footer>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
import AppearanceDisappearanceBlock from "~/components/utils/AppearanceDisappearanceBlock.vue";

onMounted(() => {

})
</script>

<style lang="scss">

.MobIndexUltraAllInclusiveSection {
	position: relative;
	z-index: 1;
	overflow: hidden;
	color: var(--color-white);

	&__inner {
		@include container100;

	}

	&__bg {
		@include div100;

		img {
			scale: 1.01;
			object-position: bottom center;
		}
	}

	&__content {
		@include flexColumn(center);

		position: relative;
		top: 0;
		left: 0;

		width: 100%;
		min-height: 100%;
		padding: 3.7rem var(--ruler-m-l) 5.4rem;

	}

	&__content-top {
		@include flexColumn(center);
	}

	.MobBigTitleTextAccent {
		color: var(--color-white);
	}

	&__action {
		&_n0 {
			margin-top: 3.4rem;
		}

		.ButtonRoundArrow_active .UIArrow {
			color: var(--color-sea);
		}
	}

	&__text {
		&_n0 {
			@include font(1.6rem, 400, 1.4em, -0.03em);

			margin-top: 4.4rem;
			text-align: center;
		}
	}

	.footer {
		@include flexColumn(center);

		width: 100%;
		margin-top: 34rem;
		white-space: nowrap;

		&__title {
			@include font(4rem, 400, 1em);

			strong {
				@include font(6rem, 400, 1em);
			}
		}

		&__arrow-block {
			@include flex(center);

			gap: 3rem;
			width: 100%;
			margin-top: 2rem;
		}

		&__arrow {
			position: relative;
			flex: 1 1;
			width: 100%;
			font-size: 1rem;

			&::before {
				content: '';

				position: relative;
				top: 50%;

				display: block;

				width: 100%;
				height: 1px;

				background: var(--color-white);
			}

			svg {
				position: absolute;
				top: 50%;
				translate: 0 -50%;

				display: none;

				font-size: 0.6rem;
			}

			&:first-of-type {
				svg {
					left: -2px;
				}
			}

			&:last-of-type {
				svg {
					right: -2px;
					rotate: 180deg;
				}
			}

			path {
				stroke: white;
			}
		}

		&__text {
			@include font(1.6rem, 400, 1.2em, -0.03em);

			text-align: center;
		}
	}
}
</style>
