<template>
	<a
		class="DocumentsItem"
		target="_blank"
		:href="src"
	>
		<svg
			width="514"
			height="366"
			viewBox="0 0 514 366"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<path
				d="M32.7752 365H481.225C498.774 365 513 350.774 513 333.225V94.2135C513 76.6645 498.774 62.4382 481.225 62.4382H257.024C250.063 62.4382 243.295 60.1524 237.759 55.9321L174.241 7.50613C168.705 3.2858 161.937 1 154.976 1H32.7752C15.2263 1 1 15.2263 1 32.7752V333.225C1 350.774 15.2263 365 32.7752 365Z"
				stroke="null"
				stroke-width="0"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
		<span
			v-nbsp
			class="DocumentsItem__title"
			v-html="title"
		/>
	</a>
</template>

<script setup lang="ts">
type TProps = {
	src: string;
	title: string;
};
defineProps<TProps>();
</script>

<style lang="scss">
.DocumentsItem {
	cursor: pointer;

	position: relative;

	display: block;

	color: var(--color-sea);

	transition: color 0.2s;

	svg {
		width: 100%;
		height: auto;
		fill: var(--color-white);
		transition: fill 0.2s;
	}

	&__title {
		@include font(2.2rem, 400, 1.1em, -0.03em);

		position: absolute;
		bottom: 3.5rem;
		left: 4rem;

		display: block;

		width: 22rem;

	}

	@media(hover) {
		&:hover {
			color: var(--color-white);

			svg {
				fill: var(--color-sea);
			}
		}
	}
}

.layout-mobile .DocumentsItem {
	&__title {
		font-size: 2rem;
	}
}
</style>
