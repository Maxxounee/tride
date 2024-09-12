<template>
	<div
		class="OperatorAdvantagesCard"
		:class="{ borderBottom }"
	>
		<div
			ref="inner"
			class="OperatorAdvantagesCard__inner"
		>
			<NuxtImg
				format="webp"
				quality="80"
				:src="image"
				class="OperatorAdvantagesCard__image"
			/>
			<div class="OperatorAdvantagesCard__container">
				<p
					class="OperatorAdvantagesCard__title"
					v-html="title"
				/>
				<p
					class="OperatorAdvantagesCard__text"
					v-html="text"
				/>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
type Props = {
	image: string;
	title: string;
	text: string;
	borderBottom?: boolean;
};
const { isMobileOrTablet } = useDevice();
const scroller = inject<string>('pageScroller');
defineProps<Props>();
const el = useCurrentElement();
const inner = ref();

function appearanceAnimation() {
	useGsap.from(inner.value, {
		y: () => isMobileOrTablet ? '10rem' : '20rem',
		ease: 'sine.inOut',
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el.value),
			scrub: 1.2,
			start: () => 'top bottom',
			end: () => 'top 60%',
		},
	});
}

onMounted(() => {
	appearanceAnimation();
});
</script>

<style lang="scss">
.OperatorAdvantagesCard {
	--border: 1px solid #79B6BB;

	position: relative;
	width: 100%;

	&__inner {
		@include flex;

		gap: 15vw;

		width: 100%;
		height: 50.6rem;
		padding: 2.8rem 0;

		border-top: var(--border);
	}

	&__image {
		width: 71.3rem;
	}

	&__container {
		@include flexColumn(null, space);
	}

	&__title {
		@include font(3rem, 400, 1.1em, -0.04em);
	}

	&__text {
		@include font(2rem, 400, 1.4em, -0.03em);

		color: var(--color-text);
	}

	&.borderBottom {
		.OperatorAdvantagesCard__inner {
			border-bottom: var(--border);
		}
	}
}

.layout-mobile .OperatorAdvantagesCard {
	width: auto;

	&__inner {
		flex-direction: column;
		gap: 1.4rem;
		height: auto;
		padding: 1.5rem 0 3rem;
	}

	&__image {
		width: 100%;
	}

	&__container {
		gap: 2rem;
	}

	&__title {
		@include font(2.4rem, 400, 1.1em, -0.096rem);
	}

	&__text {
		@include font(1.6rem, 400, 1.4em, -0.048rem);
	}
}
</style>
