<template>
	<div class="BlockImageWithList">
		<div class="BlockImageWithList__image">
			<NuxtImg
				v-if="image"
				:src="image"
				format="webp"
				width="1000"
				preset="default"
			/>
		</div>
		<div class="BlockImageWithList__text">
			<p
				class="BlockImageWithList__title"
				v-html="title"
			></p>
			<ul
				class="BlockImageWithList__list"
				v-if="list"
			>
				<li
					class="BlockImageWithList__list-item"
					v-for="(item, index) in list"
					:key="index"
					v-html="item"
					v-nbsp
				></li>
			</ul>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
type TProps = {
	title: string;
	list?: string[];
	image: string;
}
const props = defineProps<TProps>();

</script>

<style lang="scss">

.BlockImageWithList {
	@include flex;

	gap: 5rem;

	&__image {
		position: relative;
		overflow: hidden;
		aspect-ratio: 13/ 10;
		height: 62vh;

		img {
			// position: absolute;
			// top: 0;
			// left: 0;

			width: 100%;
			max-width: unset;

			// height: unset;
			min-height: 100%;
			object-position: bottom;
		}
	}

	&__text {
		width: 68rem;
		color: var(--color-white);
	}

	&__title {
		@include font(4rem, 400, 1em, -0.04em);
	}

	&__list {
		@include flexColumn;

		gap: 2.4rem;
		margin-top: 5rem;

		// margin: 0;
		padding-left: 2.1rem;
	}

	&__list-item {
		@include font(2rem, 400, 1.4em, -0.03em);

		max-width: 40rem;
	}
}
</style>
