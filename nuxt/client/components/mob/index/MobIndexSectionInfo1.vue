<template>
	<div class="MobIndexSectionInfo1">
		<MobSimpleColoredText class="MobIndexSectionInfo1__text MobIndexSectionInfo1__text_n0">
			<mark>Инвестируйте</mark>
			<br />
			<span>
				в новый курорт<br />
				в новом Сочи
			</span>
		</MobSimpleColoredText>
		<BlockActionLink
			class="MobIndexSectionInfo1__action-link MobIndexSectionInfo1__action-link_n0"
			first="Рассчитать"
			second="прибыль"
		/>
		<div class="MobIndexSectionInfo1__two-images">

			<ClippedIntersectImg
				direction="top"
				class="MobIndexSectionInfo1__img MobIndexSectionInfo1__img_n0"
				src="/images/index/info-1/0.png"
				preset="default"
			/>
			<ClippedIntersectImg
				direction="top"
				class="MobIndexSectionInfo1__img MobIndexSectionInfo1__img_n1"
				src="/images/index/info-1/0.png"
				preset="default"
			/>
		</div>
		<p
			class="MobIndexSectionInfo1__text MobIndexSectionInfo1__text_n1"
			v-nbsp
		>
			БОЛЬШЕ ВОЗМОЖНОСТЕЙ ДЛЯ ИНВЕСТИЦИЙ
			С ALEAN RESORT MONTVERT 4*! ВЛОЖИТЕСь
			В МАСШТАБНЫЙ, ЗАМЕТНЫЙ ПРОЕКТ
			В БОЛЬШОМ СОЧИ СО СРОКОМ СДАЧИ
			В 1 КВАРТАЛЕ 2027 ГОДА И КРУГЛОГОДИЧНО ПОЛУЧАЙТЕ ПРИБЫЛЬ
		</p>
		<MobSimpleColoredText class="MobIndexSectionInfo1__text MobIndexSectionInfo1__text_n2">
			<span>От <mark>300 000</mark> ₽/м</span>
			<br />
			<span>на старте</span>
		</MobSimpleColoredText>
		<MobSimpleColoredText class="MobIndexSectionInfo1__text MobIndexSectionInfo1__text_n3">
			<span>К <mark>2 100 000</mark> ₽/м</span>
			<br />
			<span>после сдачи</span>
		</MobSimpleColoredText>
		<p class="MobIndexSectionInfo1__text MobIndexSectionInfo1__text_n4">
			Инвестиции для тех,<br />
			кто хочет большего
		</p>
		<p class="MobIndexSectionInfo1__text MobIndexSectionInfo1__text_n5">
			Инвестируйте в готовый бизнес
			от крупнейшего туроператора в России. Alean Collection за 20 лет на рынке обеспечил себе лояльность более
			300 000 клиентов. Уровень удовлетворенностей гостей курортов Alean — 95% и выше, а 60% повторяют отдых.
			<br /><br />
			Вкладывайтесь безопасно и получайте
			постоянный доход!
		</p>
		<BlockActionLink
			class="MobIndexSectionInfo1__action-link MobIndexSectionInfo1__action-link_n1"
			first="Как увеличить"
			second="доход?"
		/>
		<div class="MobIndexSectionInfo1__two-images">

			<ClippedIntersectImg
				direction="top"
				class="MobIndexSectionInfo1__img MobIndexSectionInfo1__img_n2"
				src="/images/index/info-1/0.png"
				preset="default"
			/>
			<ClippedIntersectImg
				direction="top"
				class="MobIndexSectionInfo1__img MobIndexSectionInfo1__img_n3"
				src="/images/index/info-1/0.png"
				preset="default"
			/>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
import MobSimpleColoredText from "~/components/mob/simple/MobSimpleColoredText.vue";

onMounted(() => {

})
</script>

<style lang="scss">

.MobIndexSectionInfo1 {
	--ruler-width: calc(100% - var(--ruler-m-er));

	padding: 8rem var(--ruler-m-l);

	&__text {
		&_n1 {
			@include font(1rem, 500, 1.2em);

			width: var(--ruler-width);
			margin-top: 1.4rem;
			color: var(--color-text);
			text-transform: uppercase;
		}

		&_n2 {
			margin-top: 4rem;
		}

		&_n3 {
			margin-top: 2.4rem;
		}

		&_n4 {
			@include font(2.4rem, 400, 1em, -0.04em);

			margin-top: 4.2rem;
			color: var(--color-sea);
		}

		&_n5 {
			@include font(1.6rem, 400, 1.4em, -0.03em);

			margin-top: 2rem;
		}
	}

	&__action-link {
		&_n0 {
			margin-top: 3.2rem;
		}

		&_n1 {
			margin-top: 3.4rem;
		}
	}

	&__two-images {
		margin-top: 7.4rem;

		img:first-of-type {
			width: var(--ruler-width);
		}

		img:last-of-type {
			margin-top: 1.5rem;
		}
	}
}
</style>
