<template>
	<div class="MobPlansFlatCard">
		<div class="MobPlansFlatCard__header">
			<p class="MobPlansFlatCard__title">
				<span class="txt_color-sun">№ {{ data.tr_n }}</span>
				<span>{{ data?.rc === 2 ? 'ЛЮКС' : 'СТАНДАРТ' }}</span>
			</p>
		</div>

		<div class="MobPlansFlatCard__plan">
			<img :src="data.$lot">
		</div>

		<div class="MobPlansFlatCard__footer">
			<div class="MobPlansFlatCard__info">
				<p>{{ data?.tr_b }}</p>
				<p>{{ data?.f }} этаж</p>
				<p>{{ data?.rc }} комнат{{ wordEnd(data?.rc) }}</p>
				<p>{{ data?.sq }} м<sup>2</sup></p>
			</div>

			<div class="MobPlansFlatCard__price">
				<p class="MobPlansFlatCard__price-title">
					Цена
				</p>
				<p class="MobPlansFlatCard__price-value txt_color-sun">
					{{ formatCost(data.tc) }}
				</p>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
type Props = {
	data: any;
};

defineProps<Props>();
</script>

<style lang="scss">
.MobPlansFlatCard {
	padding: 2rem;
	color: var(--color-sea);
	background-color: var(--color-white);
	border-radius: 2.2rem;

	&__header {
		@include flex(stretch, space);
	}

	&__title {
		@include font(3rem, 400, 1.1em, -0.15rem);

		span {
			display: block;
		}
	}

	&__plan {
		position: relative;
		height: 24rem;
		margin-top: 3rem;

		img {
			@include div100;

			object-fit: contain;
		}
	}

	&__footer {
		@include flex(end, space);

		margin-top: 3.6rem;
	}

	&__info {
		@include flexColumn;
		@include font(1.4rem, 400, 1em, -0.042rem);

		gap: 0.8rem;
		color: var(--color-text);
	}

	&__price-title {
		@include font(1.4rem, 400, 1em, -0.042rem);
	}

	&__price-value {
		@include font(3rem, 400, 1.4em, -0.12rem);
	}
}
</style>
