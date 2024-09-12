<template>
	<div
		class="PlansMasterPlanPoint"
		:class="{ hidden }"
	>
		<div class="PlansMasterPlanPoint__outer">
			<div class="PlansMasterPlanPoint__inner" />
		</div>
	</div>
</template>

<script lang="ts" setup>
type TProps = {
	left: number;
	top: number;
	alt: string;
};
const props = defineProps<TProps>();

const livingStore: TLotsLivingStore = useLotsLivingStore();

const hidden = computed(() => livingStore.buildingAltHovered === props.alt);
</script>

<style lang="scss">
.PlansMasterPlanPoint {

	@include size(6rem);

	pointer-events: none;
	will-change: scale, opacity;

	position: absolute;
	top: calc(v-bind('top') * 1%);
	left: calc(v-bind('left') * 1%);
	translate: -50% -50%;

	background-color: rgb(255 255 255 / 50%);
	border-radius: 50%;

	transition: scale, opacity;
	transition-duration: 0.3s;

	&__outer,
	&__inner {
		@include center;

		will-change: scale, opacity;
		border-radius: 50%;
	}

	&__outer {
		@include size(2rem);

		background: var(--color-white);
	}

	&__inner {
		@include size(1.4rem);

		background: var(--color-sea);
	}

	&.hidden {
		scale: 0;
		opacity: 0.3;
	}
}

.layout-mobile .PlansMasterPlanPoint {
	@include size(4rem);

	&__outer {
		@include size(1.4rem);
	}

	&__inner {
		@include size(1rem);
	}
}
</style>
