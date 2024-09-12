<template>
	<div class="InteractiveGenplanMainPoint">
		<div class="InteractiveGenplanMainPoint__point" />

		<div class="InteractiveGenplanMainPoint__main">
			<p v-html="text" />
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
defineProps<{
	top: string;
	left: string;
	text: string;
}>();
</script>

<style lang="scss">
.InteractiveGenplanMainPoint {
	cursor: pointer;

	position: absolute;
	top: v-bind(top);
	left: v-bind(left);
	transform: translate(-50%, -50%);

	&__point {
		@include size(6rem);

		grid-area: center;
		background-color: rgb(255 255 255 / 50%);
		border-radius: 100%;

		&::after {
			@include pseudo;
			@include center;
			@include size(2rem);

			background-color: var(--color-sea);
			border: 0.3rem solid var(--color-white);
			border-radius: 100%;
		}
	}

	&__main {
		@include center;
		@include flex(center, center);

		pointer-events: none;

		z-index: 1;

		grid-area: center;

		width: max-content;
		height: 6rem;
		padding: 0 3.2rem;

		background-color: var(--color-sea);
		clip-path: inset(0 50% 0 50%);
		border-radius: 3rem;

		transition: clip-path 0.4s;

		p {
			@include textCrop;

			font-size: 1.8rem;
			font-weight: 500;
			color: var(--color-white);
		}
	}

	&:hover {
		.InteractiveGenplanMainPoint__main {
			pointer-events: all;
			clip-path: inset(0);
		}
	}
}
</style>
