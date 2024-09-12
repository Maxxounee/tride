<template>
	<div class="OperatorAleanInfo">
		<UtilsAppearanceDisappearanceBlock>
			<p class="OperatorAleanInfo__title">
				Alean Collection — российский гостиничный<br>
				оператор, управляющий курортными отелями<br>
				и апартаментами класса 4* и 5*
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<div class="OperatorAleanInfo__center">
			<div class="back-text">
				<div class="back-text__row">
					<span>Alean Resort Montvert&nbsp;Alean Resort Montvert</span>
					<span>Alean Resort Montvert&nbsp;Alean Resort Montvert</span>
				</div>
				<div class="back-text__row back-text__row_reverse">
					<span>Alean Resort Montvert&nbsp;Alean Resort Montvert</span>
					<span>Alean Resort Montvert&nbsp;Alean Resort Montvert</span>
				</div>
			</div>
			<div
				ref="imageWrapper"
				class="OperatorAleanInfo__image"
			>
				<NuxtImg
					ref="image"
					src="/images/operator/01.jpg"
					format="webp"
					quality="80"
				/>
			</div>

			<UtilsAppearanceDisappearanceBlock>
				<p class="OperatorAleanInfo__text">
					Alean Collection входит в список системообразующих<br>
					предприятий России, развивает сеть семейных курортов<br>
					под брендом Alean Family и курортных апартаментов<br>
					под брендом Alean Residence.
				</p>
			</UtilsAppearanceDisappearanceBlock>
			<FooterScrollToStartButton />
		</div>
	</div>
</template>

<script lang="ts" setup>
const scroller = inject<string>('pageScroller');
const el = useCurrentElement();
const imageWrapper = ref();
const image = ref();

function animation() {
	const tl = useGsap.timeline({
		scrollTrigger: {
			scroller,
			scrub: 1,
			trigger: imageWrapper.value,
			start: () => 'top bottom',
			end: () => 'bottom 80%',
		},
	});
	// useGsap.set(imageWrapper.value, {'clip-path': 'inset(20% 10% 0)'})
	tl.from(imageWrapper.value, {
		'clip-path': 'inset(20% 10%)',
	}, 0);
	tl.from(unrefElement(image), {
		scale: 1.2,
	}, 0);
}

onMounted(() => {
	animation();
});
</script>

<style lang="scss">
.OperatorAleanInfo {
	@include flexColumn;

	padding: 22.6rem 0 0;
	background: #F5E3D7;

	&__title {
		@include font(6rem, 400, 1.1em, -0.05em);

		text-align: center;
		white-space: nowrap;
	}

	&__center {
		@include flexColumn(center, center);

		position: relative;
		margin-top: 11rem;
	}

	&__image {
		position: relative;
		overflow: hidden;

		img {
			width: 42vw;
			height: 111rem;
		}
	}

	&__text {
		@include font(2rem, 400, 1.4em, -0.03em);

		margin-top: 9rem;
		color: var(--color-text);
		text-align: center;
	}

	.back-text {
		@include center(y);

		left: 0;

		&__row {
			display: flex;
			width: 100%;

			span {
				@include font(23rem, 300, 1.1em, -0.04em);

				display: flex;
				color: var(--color-sun);
				white-space: nowrap;
				animation: translate 20s infinite linear;
			}

			&_reverse {
				span {
					animation-direction: reverse;
				}
			}
		}
	}

	@keyframes translate {
		from {
			translate: 0;
		}

		to {
			translate: -100%;
		}
	}
}

.layout-mobile .OperatorAleanInfo {
	padding: 0 var(--ruler-m-r) 0 var(--ruler-m-l);
	background: none;

	&__title {
		@include font(3rem, 400, 1.1em, -0.12rem);

		hyphens: auto;
		white-space: wrap;

		br {
			display: none;
		}
	}

	&__center {
		margin-top: 18rem;
	}

	.back-text {
		@include flexColumn(center, space);

		top: 0;
		translate: 0;
		height: 44.6rem;

		.back-text__row {
			translate: 0 calc(-100% - 3rem);

			span {
				@include font(10rem, 300,  1.1em, -0.4rem);
			}
		}

		.back-text__row_reverse {
			translate: 0 calc(100% + 2rem)
		}
	}

	&__image {
		img {
			width: 100%;
			height: 44.6rem;
		}
	}

	&__text {
		@include font(1.6rem, 400, 1.4em, -0.048rem);

		margin-top: 17rem;

		br {
			display: none;
		}
	}
}
</style>
