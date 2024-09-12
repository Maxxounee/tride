<template>
	<div
		v-if="flatData"
		class="PlansFlatTop"
	>
		<div class="PlansFlatTop__name">
			{{ flatData.rc === 2 ? 'ЛЮКС' : 'СТАНДАРТ' }}
		</div>
		<div class="PlansFlatTop__total">
			<strong>
				{{ flatData.sq }}
			</strong>
			<small>
				м<sup>2</sup>
			</small>
		</div>
	</div>
</template>

<script lang="ts" setup>
defineProps<{
	flatData?: Apartment;
}>();
</script>

<style lang="scss">
.PlansFlatTop {
	@include flex(null, space);

	&__name {
		@include font(16rem, 300, 0.9em, -0.07em);

		position: relative;
		bottom: -0.6rem;
		display: block;
		color: var(--color-sea);
	}

	&__total {
		@include flex(end);

		strong {
			@include fontItalic(16rem, 300, 0.9em, -0.04em);

			color: var(--color-sun);
		}

		small {
			@include font(4rem, 400, 1em, -0.07em);

			position: relative;

			display: block;

			margin-bottom: 0.2rem;
			margin-left: 1.6rem;

			color: var(--color-sea);

			sup {
				top: 0;
				right: 0;
				font-size: 0.6em;
			}
		}
	}
}

.layout-mobile .PlansFlatTop {
	&__name {
		@include font(3rem, 300, 1.1em, -0.15rem);

		@include text-crop(1, 0.1rem, 0.1rem);

		bottom: unset;
	}

	&__total {
		strong {
			@include fontItalic(3rem, 300, 1em, -0.12rem);
			@include text-crop(1, 0.4rem, 0.2rem);
		}

		small {
			@include font(1.8rem, 400, 0.6em, -0.07em);

			margin-bottom: 0;
			margin-left: 0.5rem;

			sup {
				font-size: 0.4em;
			}
		}
	}
}
</style>
