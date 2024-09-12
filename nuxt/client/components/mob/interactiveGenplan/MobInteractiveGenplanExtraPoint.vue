<template>
	<div class="MobInteractiveGenplanExtraPoint">
		<div class="MobInteractiveGenplanExtraPoint__point">
			<NuxtIcon
				mode="css"
				filled
				:name="`genplan/${icon}`"
			/>
		</div>

		<div class="MobInteractiveGenplanExtraPoint__main">
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
.MobInteractiveGenplanExtraPoint {
	cursor: pointer;

	position: absolute;
	top: v-bind(top);
	left: v-bind(left);
	transform: translate(-50%, -50%);

	&__point {
		@include size(4rem);
		@include flex(center, center);

		grid-area: center;

		font-size: 2rem;
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
		height: 4rem;
		padding: 0 2rem;

		background-color: var(--color-white);
		clip-path: inset(0 50% 0 50%);
		border-radius: 3rem;

		transition: clip-path 0.4s;

		p {
			@include textCrop;

			font-size: 1.2rem;
			font-weight: 500;
			color: var(--color-sun);
		}
	}

	&:hover {
		.MobInteractiveGenplanExtraPoint__main {
			pointer-events: all;
			clip-path: inset(0);
		}
	}
}
</style>
