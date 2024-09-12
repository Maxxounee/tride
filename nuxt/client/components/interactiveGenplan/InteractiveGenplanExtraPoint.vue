<template>
	<div class="InteractiveGenplanExtraPoint">
		<div class="InteractiveGenplanExtraPoint__point">
			<NuxtIcon
				mode="css"
				filled
				:name="`genplan/${icon}`"
			/>
		</div>

		<div class="InteractiveGenplanExtraPoint__main">
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
	icon: string;
}>();
</script>

<style lang="scss">
.InteractiveGenplanExtraPoint {
	cursor: pointer;

	position: absolute;
	top: v-bind(top);
	left: v-bind(left);
	transform: translate(-50%, -50%);

	&__point {
		@include size(6rem);
		@include flex(center, center);

		grid-area: center;

		font-size: 3rem;
		color: var(--color-sun);

		background-color: var(--color-white);
		border-radius: 100%;

		.icon {
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

		background-color: var(--color-white);
		clip-path: inset(0 50% 0 50%);
		border-radius: 3rem;

		transition: clip-path 0.4s;

		p {
			@include textCrop;

			font-size: 1.8rem;
			font-weight: 500;
			color: var(--color-sun);
		}
	}

	&:hover {
		.InteractiveGenplanExtraPoint__main {
			pointer-events: all;
			clip-path: inset(0);
		}
	}
}
</style>
