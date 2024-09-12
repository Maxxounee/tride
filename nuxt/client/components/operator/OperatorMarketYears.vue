<template>
	<div class="OperatorMarketYears">
		<div class="OperatorMarketYears__inner">
			<div class="section first">
				<p class="section__number">
					20
				</p>
				<p class="section__title">
					Лет<br>на рынке
				</p>
			</div>
			<div class="section second">
				<p class="section__title">
					Единые стандарты<br>
					для всех курортов
				</p>
				<p
					v-nbsp
					class="section__text"
				>
					Alean Collection стремится, чтобы в России было как можно больше<br>
					качественных продуктов и возможностей для семейного отдыха, поэтому предоставляет<br>
					высокий уровень сервиса, не уступающий лучшим мировым примерам.
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.OperatorMarketYears {
	position: relative;
	margin-top: 13rem;

	&__inner {
		@include flex(null, space);

		position: relative;
		width: 100vw;
		height: max-content;
		padding: 0 var(--ruler-d-l);
	}

	.section {
		&.first {
			@include flex;

			gap: 3.2rem;
		}

		&.second {
			@include flexColumn(null, space);
		}

		&__number {
			@include font(34.8rem, 300, 0.8em, -0.05em);

			color: var(--color-sea);
		}

		&__title {
			@include font(6rem, 400, 1.1em, -0.05em);

			color: var(--color-sea);
			white-space: nowrap;
		}

		&__text {
			@include font(2rem, 400, 1.4em, -0.03em);

			color: var(--color-text);
		}
	}
}

.layout-mobile .OperatorMarketYears {
	margin-top: 0;
	padding: 0 var(--ruler-m-r) 0 var(--ruler-m-l);

	&__inner {
		display: block;
		width: auto;
		height: auto;
		padding: 0;
	}

	.section {
		&.first {
			gap: 1.5rem;

			.section__title {
				@include font(2.2rem, 400, 1.1em, -0.088rem);
			}
		}

		&.second {
			@include flexColumn(null, space);

			gap: 2rem;
			margin-top: 6rem;

			.section__title {
				@include font(3rem, 400, 1.1em, -0.12rem);
			}
		}

		&__number {
			@include font(16rem, 300, 1em, -0.87rem);
			@include text-crop(1, 3rem, 0.1rem);
		}

		&__text {
			@include font(1.5rem, 400, 1.4em, -0.0456rem);

			br {
				display: none;
			}
		}
	}
}
</style>
