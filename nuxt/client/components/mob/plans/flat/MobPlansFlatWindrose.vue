<template>
	<div class="MobPlansFlatWindrose">
		<RotatingWindrose
			:angle="45"
			gap="0.5rem"
			:letters="{}"
		>
			<NuxtIcon
				name="genplan/windrose-small"
				:filled="true"
			/>
		</RotatingWindrose>

		<p class="MobPlansFlatWindrose__letter">
			C
		</p>
	</div>
</template>

<script lang="ts" setup>
</script>

<style lang="scss">
.MobPlansFlatWindrose {
	position: relative;
	width: 3.8rem;

	.RotatingWindrose {
		&__icon {
			.nuxt-icon svg {
				width: 100%;
				height: auto;
			}
		}
	}

	&__letter {
		@include center;
		@include font(1.4rem, 400, 1em);

		color: var(--color-sun);
	}
}
</style>
