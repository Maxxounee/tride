<template>
	<div class="MobIndexAstrumProjectsCard">
		<img
			class="MobIndexAstrumProjectsCard__logo"
			:src="`/images/index/astrum/projects/${id}.png`"
		/>
		<p
			v-nbsp
			class="MobIndexAstrumProjectsCard__text"
			v-html="text"
		>
		</p>
	</div>
</template>

<script
	lang="ts"
	setup
>
defineProps<{ id: string; text: string; }>()
onMounted(() => {

})
</script>

<style lang="scss">

.MobIndexAstrumProjectsCard {
	@include font(1.4rem, 400, 1.4em, -0.03em);
	@include flexColumn(center);

	padding: 3.5rem 3rem 2.4rem;
	color: var(--color-text);
	text-align: center;
	border: 1px solid var(--color-sun);

	&__logo {
		max-width: 14rem;
		max-height: 14rem;
		object-fit: contain;
	}

	&__text {
		margin-top: 5.7rem;
	}
}
</style>
