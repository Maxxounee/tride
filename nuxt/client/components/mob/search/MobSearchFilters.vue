<template>
	<SearcherWrapper
		:data="livingStore.availableAparts"
		class="MobSearchFilters"
		@result="({ values }) => (searchStore.setResults(values))"
	>
		<SearcherReset>
			<button class="MobSearchFilters__reset">
				<div class="MobSearchFilters__reset-icon">
					<NuxtIcon name="ui/plus" />
				</div>
				<p class="MobSearchFilters__reset-text">
					Сбросить фильтр
				</p>
			</button>
		</SearcherReset>

		<div class="MobSearchFilters__inner">
			<div class="item">
				<p class="item__title">
					Комнат
				</p>
				<SearcherCheckbox object-key="rc" />
			</div>

			<div class="item">
				<p class="item__title">
					Этаж
				</p>
				<SearcherSlider object-key="f" />
			</div>

			<div class="item">
				<p class="item__title">
					Площадь, м<sup>2</sup>
				</p>
				<SearcherSlider
					object-key="sq"
					:precision="1"
				/>
			</div>

			<div class="item">
				<p class="item__title">
					Стоимость, млн руб.
				</p>
				<SearcherSlider
					object-key="tc"
					:precision="1"
					:divide="1000000"
					:delta="3000000"
				/>
			</div>
		</div>
	</SearcherWrapper>
</template>

<script lang="ts" setup>
const livingStore = useLotsLivingStore();
const searchStore = useSearchStore();
</script>

<style lang="scss">
.MobSearchFilters {
	&__reset {
		@include flex(center);

		gap: 2rem;
	}

	&__reset-icon {
		@include size(2.6rem);
		@include flex(center, center);

		color: var(--color-sun);
		border: 1px solid var(--color-sea);
		border-radius: 100%;

		.nuxt-icon {
			rotate: 45deg;
			font-size: 1.2rem;
		}
	}

	&__reset-text {
		@include font(1.6rem, 400, 1.4em, -0.048rem);
	}

	&__inner {
		@include flexColumn(null, space);

		gap: 4rem;
		margin-top: 5.5rem;
	}

	.item {
		@include flexColumn(null, space);

		gap: 1.5rem;

		&__title {
			@include font(1.6rem, 400, 1em, -0.03em);

			color: var(--color-sea);
		}
	}

	.SearcherCheckbox {
		--checkbox-background: var(--color-white);
		--checkbox-color: var(--color-sun);
		--checkbox-background-active: var(--color-sea);
		--checkbox-color-active: var(--color-white);

		@include flex;

		gap: 1.5rem;

		&__item {
			@include flex(center, center);
			@include size(4.6rem);
			@include font(1.6rem, 400, 1em, -0.03em);

			border: 1px solid var(--color-sea);
			border-radius: 50%;
		}
	}

	.SearcherSlider {
		--slider-width: 100%;
		--slider-text-color: var(--color-sun);
		--slider-text-animation-color: var(--slider-text-color);
		--slider-line-height: 1px;
		--slider-line-bottom-color: #afd4d7;
		--slider-line-top-color: var(--color-sea);
		--slider-control-width: 4.6rem;
		--slider-control-height: 4.6rem;
		--slider-control-background: var(--color-white);

		&__back {
			display: none;
		}

		&__control {
			@include flex(center, center);
			@include font(1.6rem, 400, 1em, -0.03em);

			border: 1px solid var(--color-sea);
			border-radius: 50%;
		}
	}

	.SearcherWrapper {
		--checkbox-background-hover: var(--checkbox-background-active);
		--checkbox-background-click: var(--checkbox-background-active);
		--checkbox-background-active: white;
		--checkbox-color-hover: var(--checkbox-color-active);
		--checkbox-color-click: var(--checkbox-color-active);
		--checkbox-color-active: var(--checkbox-color);
		--checkbox-transition-duration: 0.1s;

		&__inner {
			height: 100%;
		}
	}
}
</style>
