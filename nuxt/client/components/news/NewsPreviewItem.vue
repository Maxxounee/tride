<template>
	<div
		class="NewsPreviewItem"
		@click="open"
	>
		<div class="NewsPreviewItem__inner">
			<time
				class="NewsPreviewItem__date"
				v-html="getFormattedDate(params.created)"
			/>
			<h3
				class="NewsPreviewItem__title"
				v-html="params.pageTitle"
			/>
			<div
				class="NewsPreviewItem__text"
				v-html="content.short"
			/>
			<NuxtImg
				v-if="content.image"
				class="NewsPreviewItem__image"
				:src="content.image"
			/>
			<NuxtLink
				class="NewsPreviewItem__link"
				:to="`/news/${params.slug}`"
			>
				Подробнее
			</NuxtLink>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const router = useRouter();
type TProps = {
	content: { short: string; image?: string };
	params: { created: string; slug: string; pageTitle: string };
};
const props = defineProps<TProps>();

function getFormattedDate(string: string) {
	return new Date(string).toLocaleDateString();
}

function open() {
	router.push(`/news/${props.params.slug}`);
}

onMounted(() => {

});
</script>

<style lang="scss">
.NewsPreviewItem {
	cursor: pointer;
	padding-bottom: 10rem;
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

	&__text {
		@include font(2rem, 400, 1.4em, -0.03em);

		margin-top: 3.8rem;
		color: var(--color-text);
	}

	&__image {
		height: 30rem;
		margin-top: 4rem;
	}

	&__link {
		@include font(2rem, 400, 1em, -0.05em);

		display: block;
		margin-top: 3.3rem;
		color: var(--color-sea);
	}
}

.layout-mobile .NewsPreviewItem {
	padding-bottom: 3.5rem;
	border-bottom: 1px solid var(--color-sea);

	&__date {
		font-size: 1.2rem;
	}

	&__title {
		margin-top: 2.5rem;
		font-size: 2.4rem;
		letter-spacing: -0.04em;
	}

	&__text {
		margin-top: 2rem;
		font-size: 1.6rem;
	}

	&__image {
		aspect-ratio: 325 / 182;
		height: auto;
		margin-top: 2rem;
	}

	&__link {
		display: none;
	}

	&:last-child {
		border-bottom: none;
	}
}
</style>
