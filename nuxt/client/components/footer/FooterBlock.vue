<template>
	<div class="FooterBlock">
		<p
			class="FooterBlock__title"
			v-html="title"
		></p>
		<div class="FooterBlock__container">
			<slot>

			</slot>
			<NuxtLink
				v-for="(item, index) in items"
				:key="index"
				:to="item.to"
				class="FooterBlock__item"
				@click.native="clickHandler(item.to)"
			>
				{{ item.text }}
			</NuxtLink>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const {$bus} = useNuxtApp();
const route = useRoute();
type TProps = {
	title: string;
	items?: {
		to: string;
		text: string;
	}[];
}
const props = defineProps<TProps>();

function clickHandler(path) {
	if (route.path === path) {
		$bus.$emit('scrollToStartClick');
	}
}

onMounted(() => {

})
</script>

<style lang="scss">

.FooterBlock {
	@include flexColumn;

	gap: 4rem;

	&__title {
		@include fontItalic(3.4rem, 300, 1em, -0.04em);

		color: var(--color-sun);
	}

	&__container {
		@include flexColumn;

		gap: 1rem;
	}

	&__item {
		@include font(2rem, 400, 1.4em, -0.03em);

		color: var(--color-sea);
	}
}
</style>
