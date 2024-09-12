<template>
	<div class="OperatorAdvantages">
		<p class="OperatorAdvantages__title">
			Преимущества<br>
			Alean Collection
		</p>
		<div class="OperatorAdvantages__cards">
			<OperatorAdvantagesCard
				v-for="(card, index) in advantages"
				:key="index"
				:border-bottom="index === advantages.length - 1"
				v-bind="card"
			/>
		</div>
	</div>
</template>

<script lang="ts" setup>
import { advantages } from '~/configs/pages/operator';

onMounted(() => {

});
</script>

<style lang="scss">
.OperatorAdvantages {
	@include flexColumn;

	padding: 0 var(--ruler-d-l);
	padding-top: 30.6rem;
	background: #F5E3D7;

	&__title {
		@include font(6rem, 400, 1.1em, -0.05em);

	}

	&__cards {
		@include flexColumn;

		margin-top: 7.2rem;
	}
}

.layout-mobile .OperatorAdvantages {
	padding: 0 var(--ruler-m-r) 0 var(--ruler-m-l);
	background-color: transparent;

	&__title {
		@include font(3rem, 400, 1.1em, -0.12rem);
	}

	&__cards {
		margin-top: 2.4rem;
	}
}
</style>
