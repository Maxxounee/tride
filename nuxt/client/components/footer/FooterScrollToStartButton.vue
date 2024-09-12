<template>
	<div
		class="FooterScrollToStartButton"
		:class="{ mobile: isMobile, desktop: !isMobile}"
	>
		<button
			class="FooterScrollToStartButton__button"
			@click="clickHandler"
		>
			<NuxtIcon
				filled
				name="ui/angle-top"
			/>
		</button>
	</div>
</template>

<script
	lang="ts"
	setup
>
const {$bus} = useNuxtApp();
const {isMobile} = useDevice();
const emit = defineEmits(['click'])

function clickHandler() {
	emit('click');
	$bus.$emit('scrollToStartClick');
}

onMounted(() => {

})
</script>

<style lang="scss">

.FooterScrollToStartButton {
	@include flex(null, center);

	width: 100%;

	-webkit-tap-highlight-color: transparent;

	&__button {
		@include flex(center, center);

		color: var(--color-sea);
		border: 1px solid var(--color-sea);
		border-radius: 50%;

		path {
			fill: transparent !important;
		}
	}

	&:active {
		scale: 0.98;
	}

	&.desktop {
		padding: 10.6rem 0;

		.FooterScrollToStartButton__button {
			@include size(11rem);

			font-size: 5rem;
		}
	}

	&.mobile {
		padding: 3rem 0 4rem;

		.FooterScrollToStartButton__button {
			@include size(4rem);

			font-size: 2rem;
		}
	}
}
</style>
