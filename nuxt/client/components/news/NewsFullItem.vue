<template>
	<div class="NewsFullItem">
		<time
			class="NewsFullItem__date"
			v-html="formattedData"
		/>
		<h3
			class="NewsFullItem__title"
			v-html="newsData.params.pageTitle"
		/>
		<NuxtImg
			v-if="newsData.content.image"
			class="NewsFullItem__image"
			:src="newsData.content.image"
		/>
		<div
			class="NewsFullItem__text"
			v-html="newsData.content.text"
		/>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps<{
	newsData: any;
}>();

const formattedData = computed(() => new Date(props.newsData?.params?.created).toLocaleDateString());
</script>

<style lang="scss">
.NewsFullItem {
	text-transform: none;

	&__date {
		@include font(1.6rem, 400, 1em, -0.03em);

		color: var(--color-sun);
	}

	&__title {
		@include font(4rem, 400, 1em, -0.05em);

		margin-top: 4.6rem;
		color: var(--color-sea);
	}

	&__image {
		height: 30rem;
		margin-top: 4rem;
	}

	&__text {
		@include font(2rem, 400, 1.4em, -0.03em);

		margin-top: 3.8rem;
		color: var(--color-text);

		p:not(:first-of-type) {
			margin-top: 3rem;
		}
	}
}

.layout-mobile .NewsFullItem {
	&__date {
		font-size: 1.2rem;
	}

	&__title {
		margin-top: 2.5rem;
		font-size: 2.4rem;
		letter-spacing: -0.04em;
	}

	&__image {
		aspect-ratio: 325 / 182;
		height: auto;
		margin-top: 2.4rem;
	}

	&__text {
		margin-top: 2rem;
		font-size: 1.6rem;

		p:not(:first-of-type) {
			margin-top: 1em;
		}
	}
}
</style>
