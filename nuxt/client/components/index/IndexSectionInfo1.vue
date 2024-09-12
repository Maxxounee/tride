<template>
	<section class="IndexSectionInfo1">
		<div class="IndexSectionInfo1__row-1">
			<ClippedIntersectImg
				direction="top"
				class="IndexSectionInfo1__img-1"
				src="/images/index/info-1/0.png"
				preset="default"
			/>

			<div class="IndexSectionInfo1__text-block-1">
				<p class="txt-h3">
					<span class="txt_color-sun">Инвестируйте</span> <br>
					в новый курорт <br>
					в новом Сочи
				</p>

				<BlockActionLink
					class="IndexSectionInfo1__action-1"
					first="Рассчитать"
					second="прибыль"
				/>
			</div>

			<div class="IndexSectionInfo1__img-text-block">
				<ClippedIntersectImg
					direction="top"
					class="IndexSectionInfo1__img-2"
					src="/images/index/info-1/1.png"
					preset="default"
				/>
				<p
					class="txt-h8"
					v-nbsp
				>
					БОЛЬШЕ ВОЗМОЖНОСТЕЙ ДЛЯ ИНВЕСТИЦИЙ С ALEAN RESORT MONTVERT 4*! ВЛОЖИТЕСЬ В МАСШТАБНЫЙ, ЗАМЕТНЫЙ
					ПРОЕКТ В БОЛЬШОМ СОЧИ СО СРОКОМ СДАЧИ В 1 КВАРТАЛЕ 2027 ГОДА И ЕЖЕКВАРТАЛЬНО ПОЛУЧАЙТЕ ПРИБЫЛЬ
				</p>
			</div>
		</div>

		<ClippedIntersectImg
			direction="left"
			class="IndexSectionInfo1__img-3"
			src="/images/index/info-1/2.png"
			preset="default"
		/>

		<div class="IndexSectionInfo1-row-2">
			<div class="IndexSectionInfo1-row-2__col">
				<UtilsAppearanceDisappearanceBlock>
					<p class="IndexSectionInfo1-row-2__text-1 txt-h2">
						От <span class="txt_color-sun">300 000</span> ₽/м <br>
						на старте
					</p>
				</UtilsAppearanceDisappearanceBlock>
				<UtilsAppearanceDisappearanceBlock>
					<p class="IndexSectionInfo1-row-2__text-2 txt-h2">
						К <span class="txt_color-sun">1 750 000</span> ₽/м <br>
						после сдачи
					</p>
				</UtilsAppearanceDisappearanceBlock>

				<UtilsAppearanceDisappearanceBlock>
					<p class="IndexSectionInfo1-row-2__text-3 txt-h3">
						Инвестиции для тех, <br>
						кто хочет большего
					</p>
				</UtilsAppearanceDisappearanceBlock>

				<UtilsAppearanceDisappearanceBlock>
					<p
						class="IndexSectionInfo1-row-2__text-4 txt-h7"
						v-nbsp
					>
						Инвестируйте в готовый бизнес от крупнейшего туроператора в России. Alean Collection за 20 лет
						на
						рынке обеспечил себе лояльность более 300 000 клиентов. Уровень удовлетворенностей гостей
						курортов
						Alean — 95% и выше, а 60% повторяют отдых. <br><br>

						Вкладывайтесь безопасно и получайте
						постоянный доход!
					</p>
				</UtilsAppearanceDisappearanceBlock>

				<BlockActionLink
					class="IndexSectionInfo1__action-2"
					first="Как увеличить"
					second="доход"
				/>
			</div>

			<div class="IndexSectionInfo1-row-2__col">
				<ParallaxImg
					class="IndexSectionInfo1__img-4"
					src="/images/index/info-1/3.png"
					:ipx-options="{ width: 900, format: 'webp' }"
					preset="default"
				/>
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
	useGsap.to('.IndexSectionInfo1__text-block-1', {
		yPercent: 100,
		ease: 'power1.inOut',
		scrollTrigger: {
			scroller,
			trigger: '.IndexSectionInfo1__img-1',
		},
	});
});
</script>

<style lang="scss">
.IndexSectionInfo1 {
	padding: 28rem var(--ruler-d-r) 16rem var(--ruler-d-l);
	color: var(--color-sea);
	background-color: var(--color-background);

	&__row-1 {
		@include flex(start);
	}

	&__img-1 {
		width: 60.5rem;
		height: 78.5rem;
	}

	&__text-block-1 {
		margin-left: 10rem;
		white-space: nowrap;
	}

	&__action-1 {
		margin-top: 7rem;
	}

	&__img-text-block {
		margin-top: 41rem;
		margin-right: 13rem;
		margin-left: auto;

		p {
			max-width: 34.4rem;
			margin-top: 4rem;
			color: var(--color-text);
		}
	}

	&__img-2 {
		width: 44.7rem;
		height: 44.7rem;
	}

	&__img-3 {
		width: 34.5rem;
		height: 25.4rem;
		margin-left: 46rem;
	}

	.IndexSectionInfo1-row-2 {
		@include flex(start, space);

		margin-top: 25rem;

		&__text-1 {
			@include textCrop;
		}

		&__text-2 {
			@include textCrop;

			margin-top: 6.3rem;
		}

		&__text-3 {
			@include textCrop;

			margin-top: 12rem;
		}

		&__text-4 {
			width: 55rem;
			margin-top: 5rem;
			color: var(--color-text);
		}
	}

	&__action-2 {
		margin-top: 7rem;
	}

	&__img-4 {
		translate: var(--ruler-d-r);
		width: 79.8rem;
		min-height: 108.2rem;
	}
}
</style>
