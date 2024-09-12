<template>
	<button
		class="BlockActionLink"
		@mouseenter="hovered = true"
		@mouseleave="hovered = false"
		@click="callbackStore.show()"
		:class="{ mobile: isMobileOrTablet }"
	>
		<p class="BlockActionLink__text">
			<span
				class="BlockActionLink__first"
				v-html="first"
			></span>
			<span
				class="BlockActionLink__second"
				v-html="' ' + second"
			></span>
		</p>
		<ButtonRoundArrow
			:active="hovered"
			:size="isMobileOrTablet ? '2.4rem' : '4.8rem'"
			:hover="false"
		/>
	</button>
</template>

<script
	lang="ts"
	setup
>
const hovered = ref(false);
const callbackStore = useCallbackStore();
const {isMobileOrTablet} = useDevice();

const props = defineProps({
	first: {
		type: String,
		default: '',
	},
	second: {
		type: String,
		default: '',
	},
	action: {
		type: String,
		default: '',
	},
	firstColor: {
		type: String,
		default: 'var(--color-sea)',
	},
	secondColor: {
		type: String,
		default: 'var(--color-sun)',
	}
})

</script>

<style lang="scss">
.BlockActionLink {
	@include flex(center);

	color: v-bind('firstColor');

	&__first {

	}

	&__second {
		color: v-bind('secondColor');
	}

	&:hover {
	}

	&:not(.mobile) {
		@include font(3rem, 400, 1em, -0.05em);

		gap: 2rem;
	}

	&.mobile {
		@include font(1.8rem, 400, 1em, -0.05em);

		gap: 1.4rem;
	}
}
</style>
