<template>
	<div class="MobSectionHeroPlate">
		<div class="MobSectionHeroPlate__container">
			<p
				class="MobSectionHeroPlate__id"
				v-html="String(id).padStart(2, '0')"
			/>
			<p
				class="MobSectionHeroPlate__text"
				v-html="text"
			/>
		</div>
		<div class="MobSectionHeroPlate__container">
			<NuxtLink
				v-if="prevPage"
				:to="prevPage"
			>
				<Icon
					name="ui:arrow-h"
					class="MobSectionHeroPlate__arrow MobSectionHeroPlate__arrow_1"
				/>
			</NuxtLink>
			<NuxtLink :to="nextPage">
				<Icon
					name="ui:arrow-h"
					class="MobSectionHeroPlate__arrow"
				/>
			</NuxtLink>
		</div>
	</div>
</template>

<script
	setup
	lang="ts"
>
type Props = {
	id: number;
	text: string;
	prevPage?: string;
	nextPage: string;
};
defineProps<Props>();

onMounted(() => {

});
</script>

nuxt i
<style lang="scss">
.MobSectionHeroPlate {
	@include flex(center, space);

	position: absolute;
	bottom: 0;
	left: 0;

	width: 100%;
	height: 5.4rem;
	padding: 0 var(--ruler-m-l);

	text-transform: uppercase;

	background: var(--color-background);

	&__container {
		@include flex(center);
	}

	&__id,
	&__text {
		@include font(1.6rem, 500, 1em, -0.04em);

	}

	&__id {
		color: var(--color-sun);
	}

	&__text {
		margin-left: 2rem;
		color: var(--color-sea);
	}

	&__arrow {
		// color: var(--color-sea);
		// fill: var(--color-sea);
		&:first-of-type {
			margin-right: 1.4rem;
		}

		&_1 {
			rotate: 180deg;
		}
	}

}
</style>
