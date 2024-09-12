<template>
	<section class="LocationPark">
		<BigTitle>
			<BigTitleRowWrapper>
				<BigTitleImg
					src="/images/location/park/0.png"
					width="14.5rem"
					height="22.4rem"
					:style="{ marginRight: '4rem' }"
				/>

				<template #col2>
					<BigTitleRow :style="{ marginTop: '3rem' }">
						<BigTitleText :style="{ translate: '20rem' }">
							Национальный
						</BigTitleText>
					</BigTitleRow>
					<BigTitleRow>
						<BigTitleTextAccent>парк&nbsp;</BigTitleTextAccent>
						<BigTitleText>Рядом</BigTitleText>
					</BigTitleRow>
				</template>
			</BigTitleRowWrapper>
			<BigTitleRow
				:style="{ marginTop: '5rem' }"
			>
				<BigTitleText :style="{ translate: '-10rem' }">
					с курортом –
				</BigTitleText>
				<BigTitleImg
					class="LocationPark__big-title-img-1"
					src="/images/location/park/1.png"
					width="36rem"
					height="21.7rem"
				/>
			</BigTitleRow>
			<BigTitleRow
				left="46rem"
				:style="{ marginTop: '1.4rem' }"
			>
				<BigTitleTextAccent :style="{ translate: '10rem' }">
					больше,&nbsp;
				</BigTitleTextAccent>
				<BigTitleText :style="{ translate: '20rem' }">
					чем
				</BigTitleText>
			</BigTitleRow>
			<BigTitleRow
				left="22rem"
				:style="{ marginTop: '3rem' }"
			>
				<BigTitleText :style="{ translate: '-20rem' }">
					место&nbsp;
				</BigTitleText>
				<BigTitleTextAccent :style="{ translate: '20rem' }">
					отдыха
				</BigTitleTextAccent>
			</BigTitleRow>
		</BigTitle>

		<ClientOnly>
			<BlockMustache class="LocationPark__mustache">
				Заповедная зона <br>
				с уникальной реликтовой <br>
				флорой
			</BlockMustache>
		</ClientOnly>

		<p class="LocationPark__text-1">
			Помимо парка рядом с курортом есть и другие <br>
			удивительные по своей красоте места.
		</p>

		<div class="LocationPark__images">
			<div class="LocationPark__img-text LocationPark__img-text_0">
				<ParallaxImg src="/images/location/park/park-0.png" />
				<p>
					Горные реки <br>
					и водопады
				</p>
			</div>
			<div class="LocationPark__img-text LocationPark__img-text_1">
				<ParallaxImg src="/images/location/park/park-1.png" />
				<p>
					Чайные плантации
				</p>
			</div>
			<div class="LocationPark__img-text LocationPark__img-text_2">
				<ParallaxImg src="/images/location/park/park-2.png" />
				<p>
					Исторические <br>
					памятники
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
	showFromOpacity('.LocationPark__text-1');
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
.LocationPark {
	@include flexColumn(center);

	padding: 22rem var(--ruler-d-r) 0 var(--ruler-d-l);
	background-color: var(--color-background);

	.BigTitle {
		position: relative;
	}

	&__big-title-img-1 {
		position: absolute;
		top: 17rem;
		right: 0;
	}

	&__mustache {
		margin-top: 26rem;
	}

	&__text-1 {
		@include fontItalic(3rem, 300, 1.4em);

		margin-top: 12rem;
		color: var(--color-text);
		text-align: center;
	}

	&__images {
		@include flex;

		align-self: stretch;
		margin-top: 30rem;
	}

	&__img-text {
		p {
			margin-top: 2.9rem;

			font-size: 1.2rem;
			font-weight: 500;
			line-height: 120%;
			color: var(--color-text);
			text-transform: uppercase;
		}

		&_0 {
			.ParallaxImg {
				width: 31.6rem;
				height: 65.4rem;
			}
		}

		&_1 {
			margin-left: 4.6rem;

			.ParallaxImg {
				width: 47.7rem;
				height: 43.5rem;
			}
		}

		&_2 {
			margin-left: auto;

			.ParallaxImg {
				width: 61.8rem;
				height: 89.2rem;
			}
		}
	}
}
</style>
