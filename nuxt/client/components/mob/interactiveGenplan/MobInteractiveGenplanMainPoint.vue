<template>
	<div class="MobInteractiveGenplanMainPoint">
		<div class="MobInteractiveGenplanMainPoint__point" />

		<div class="MobInteractiveGenplanMainPoint__main">
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
.MobInteractiveGenplanMainPoint {
	cursor: pointer;

	position: absolute;
	top: v-bind(top);
	left: v-bind(left);
	transform: translate(-50%, -50%);

	&__point {
		@include size(4rem);

		grid-area: center;
		background-color: rgb(255 255 255 / 50%);
		border-radius: 100%;

		&::after {
			@include pseudo;
			@include center;
			@include size(1.6rem);

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
		height: 4rem;
		padding: 0 2rem;

		background-color: var(--color-sea);
		clip-path: inset(0 50% 0 50%);
		border-radius: 3rem;

		transition: clip-path 0.4s;

		p {
			@include textCrop;

			font-size: 1.2rem;
			font-weight: 500;
			color: var(--color-white);
		}
	}

	&:hover {
		.MobInteractiveGenplanMainPoint__main {
			pointer-events: all;
			clip-path: inset(0);
		}
	}
}
</style>
