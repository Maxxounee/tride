<template>
	<section class="MobOperatorItems">
		<MobSimpleColoredText>
			<span>
				Alean Collection — <br>
				это больше, чем <br>
				отельный оператор, <br>
				это лидер в развитии <br>
				<mark>All Inclusive</mark> и <mark>Ultra All</mark> <br>
				<mark>Inclusive</mark> в России
			</span>
		</MobSimpleColoredText>

		<div
			class="MobOperatorItems__slider"
			data-lenis-prevent
		>
			<SwiperGalleryFree
				slides-per-view="auto"
				:space-between="20"
				:swiper-additional-options="{
					freeMode: true,
				}"
			>
				<SwiperGallerySlide
					v-for="(card, index) in cards"
					:key="index"
				>
					<OperatorWelcomeCard v-bind="card" />
				</SwiperGallerySlide>
			</SwiperGalleryFree>
		</div>
	</section>
</template>

<script lang="ts" setup>
import { cards } from '~/configs/pages/operator';
</script>

<style lang="scss">
.MobOperatorItems {
	padding: 4.6rem var(--ruler-m-r) 10rem var(--ruler-m-l);
	background-color: var(--color-background);

	&__slider {
		margin-top: 6.2rem;
	}

	.SwiperGallery {
		overflow: visible;
	}

	.SwiperGallerySlide {
		min-width: max-content;
	}
}
</style>
