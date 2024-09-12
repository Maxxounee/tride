<template>
	<div class="PlansFlatPlan">
		<div
			class="PlansFlatPlan__inner"
		>
			<div class="top">
				<PlansFlatTop :flat-data="flatDataCached" />
			</div>
			<div class="bottom">
				<div class="image">
					<PlansFlatImage :flat-data="flatDataCached" />
				</div>
				<div class="bottom__info">
					<PlansFlatInfoTable :flat-data="flatDataCached" />
					<PlansFlatActionButtons />
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
import PlansFlatInfoTable from '~/components/plans/additional/PlansFlatInfoTable.vue';
import PlansFlatActionButtons from '~/components/plans/additional/PlansFlatActionButtons.vue';

const livingStore = useLotsLivingStore();
const flatData = computed(() => livingStore.apartData);

const flatDataCached = ref();

watch(
	() => flatData.value,
	(value) => {
		if (value) {
			flatDataCached.value = value;
		}
	},
	{ immediate: true },
);
</script>

<style lang="scss">
.PlansFlatPlan {
	@include div100m;

	overflow: hidden;
	background: var(--color-background);

	&__inner {
		@include div100;
		@include flexColumn;

		padding: 21rem var(--ruler-d-l) 4rem;
	}

	.top {
		padding-bottom: 3.6rem;
		border-bottom: 1px solid rgb(185 212 215);
	}

	.bottom {
		@include flex;

		position: relative;
		flex: 1 1;
		padding: 9.8rem 0 0;

		.image {
			position: relative;
			flex: 1 1;
		}

		.PlansFlatImage {
			@include div100;
		}

		&__info {
			@include flexColumn(null, space);

			height: 100%;
			padding: 4rem 20rem 6rem 0;

			.PlansFlatActionButtons {
			}
		}
	}
}
</style>
