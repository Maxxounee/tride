<template>
	<section class="MobLocationBeach">
		<ScaleSection
			selector=".MobLocationBeach__scale-element"
			left-origin="70%"
		>
			<MobBigTitle show-ignore-class="MobLocationBeach__scale-element">
				<MobBigTitleRow
					justify="center"
				>
					<MobBigTitleTextAccent
						class="MobLocationBeach__scale-element"
					>
						больше&nbsp;
					</MobBigTitleTextAccent>
				</MobBigTitleRow>
				<MobBigTitleRow
					left="3rem"
					:style="{ marginTop: '1.3rem' }"
				>
					<MobBigTitleText :style="{ translate: '10rem' }">
						места
					</MobBigTitleText>
				</MobBigTitleRow>
				<MobBigTitleRow>
					<MobBigTitleTextAccent :style="{ translate: '-5rem' }">
						на частном
					</MobBigTitleTextAccent>
				</MobBigTitleRow>
				<MobBigTitleRow
					justify="flex-end"
					:style="{ marginTop: '1.3rem' }"
				>
					<MobBigTitleText :style="{ translate: '10rem' }">
						пляже
					</MobBigTitleText>
				</MobBigTitleRow>
			</MobBigTitle>
		</ScaleSection>

		<p
			class="MobLocationBeach__text MobLocationBeach__text_n0"
		>
			Самый большой частный пляж 800&nbsp;м.
			Первая береговая линия, современная пляжная инфраструктура.
		</p>

		<BlockActionLink
			class="MobLocationBeach__action MobLocationBeach__action_n0"
			first="Сколько это в"
			second="шагах?"
		/>

		<ClientOnly>
			<MobBlockMustache class="MobLocationBeach__mustache">
				Курорт расположен
				в Лазаревском районе, вдали
				от магистралей и суеты
			</MobBlockMustache>
		</ClientOnly>

		<div class="image-item">
			<ClippedIntersectImg
				direction="top"
				class="image-item__image image-item__image_n0"
				src="/images/location/beach/0.png"
			/>

			<p class="image-item__text">
				Самый большой на побережье<br />
				комплекс открытых бассейнов
			</p>
		</div>
		<div class="image-item">
			<ClippedIntersectImg
				direction="top"
				class="image-item__image image-item__image_n1"
				src="/images/location/beach/1.png"
			/>

			<p class="image-item__text">
				Лечебные процедуры
			</p>
		</div>
		<p
			class="MobLocationBeach__text MobLocationBeach__text_n1"
			v-nbsp
		>
			Лазаревский район Большого Сочи восхищает природными красотами. Горные вершины, покрытые лесами,
			сменяются чистыми пляжами и изумрудными водами. Мягкий климат и морской воздух благотворно влияют на
			самочувствие. <br><br>
			Alean Resort Montvert 4* предлагает гостям как активный отдых, так и оздоровление.
		</p>
		<div class="image-item">
			<ClippedIntersectImg
				direction="top"
				class="image-item__image image-item__image_n2"
				src="/images/location/beach/2.png"
			/>

			<p class="image-item__text">
				Крытый аквапарк
			</p>
		</div>
		<div class="image-item">
			<ClippedIntersectImg
				direction="top"
				class="image-item__image image-item__image_n3"
				src="/images/location/beach/3.png"
			/>

			<p class="image-item__text">
				Целые зоны детского счастья
			</p>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>
const scroller = inject<HTMLElement>('pageScroller');

onMounted(() => {
	showFromOpacity('.MobLocationBeach__text-1');
	showFromOpacity('.MobLocationBeach__action-1');
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
.MobLocationBeach {
	@include flexColumn(center);

	padding: 0 var(--ruler-m-l);
	background-color: var(--color-background);

	&__text {
		@include font(1.6rem, 400);

		color: var(--color-text);

		&_n0 {
			margin-top: 4.4rem;
			text-align: center;
		}

		&_n1 {
			margin-top: 6.6rem;
			text-align: center;
		}
	}

	&__action {
		&_n0 {
			margin-top: 3.4rem;
		}
	}

	&__mustache {
		margin: 5rem 6.6rem 0;
	}

	.image-item {
		position: relative;
		width: 100%;

		&__image {
			width: 100%;
			height: 34.5rem;

			&_n0 {
				margin-top: 5.6rem;
			}

			&_n1 {
				margin-top: 3.7rem;
			}

			&_n2 {
				margin-top: 6.4rem;
			}

			&_n3 {
				margin-top: 3.7rem;
			}

		}

		&__text {
			@include font(1rem, 500, 1.2em);

			margin-top: 1.4rem;
			color: var(--color-text);
			text-align: start;
			text-transform: uppercase;
		}
	}
}
</style>
