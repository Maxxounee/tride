<template>
	<div class="MobIndexSectionFloatTexts">
		<div
			class="MobIndexSectionFloatTexts__img"
			ref="imgWrapper"
		>
			<NuxtImg
				class="MobIndexSectionFloatTexts__img"
				src="/images/index/float-bg-1.jpg"
				format="webp"
			/>
		</div>

		<div class="MobIndexSectionFloatTexts__items">
			<div
				v-for="(item, key) in items"
				:key
				class="MobIndexSectionFloatTexts__item"
			>
				<p
					class="MobIndexSectionFloatTexts__title"
					:class="{ isBig: item.isBigTitle }"
					v-html="item.title"
				/>
				<p
					class="MobIndexSectionFloatTexts__text"
					v-html="item.text"
				/>
				<NuxtIcon
					v-if="item.icon"
					:name="item.icon.path"
					:class="item.icon.class"
				/>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
import {floatTexts} from "~/assets/script/configs/index.js";

type TItem = {
	title: string;
	text?: string;
	icon?: { path: string; class: string };
	isBigTitle?: boolean;
};
const items = ref<TItem[]>(floatTexts);

const el = useCurrentElement<HTMLElement>();
const scroller = inject<HTMLElement>('pageScroller');
const imgWrapper = ref();

function animateImage() {
	useScrollTrigger.create({
		normalizeScroll: true,
		pin: imgWrapper.value,
		scroller,
		trigger: unrefElement(el),
		// ignoreMobileResize: true,
		pinType: 'fixed',
		pinSpacing: false,
		start: () => 'top top',
		end: () => 'bottom top',
	})
	useGsap.to('.MobIndexSectionFloatTexts__img img', {
		keyframes: {
			easeEach: 'none',
			0: {scale: 1.05},
			100: {scale: 1, yPercent: () => -100, y: () => '100vh'},
		},
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el),
			start: () => 'top top',
			end: () => 'bottom top',
		},
	});
}

function animateItems() {
	const textItems = el.value?.querySelectorAll('.MobIndexSectionFloatTexts__item');

	textItems.forEach((item: HTMLElement) => {
		useGsap.to(item, {
			keyframes: {
				0: {opacity: 0, filter: 'blur(20px)'},
				30: {opacity: 1, filter: 'blur(0px)'},
				70: {opacity: 1, filter: 'blur(0px)'},
				100: {opacity: 0, filter: 'blur(20px)'},
			},
			scrollTrigger: {
				scroller,
				trigger: item,
				start: () => 'top bottom',
				end: () => 'bottom top',
			},
		});
	});
}

onMounted(() => {
	animateImage();
	animateItems()
});
</script>

<style lang="scss">

.MobIndexSectionFloatTexts {
	position: relative;

	overflow: hidden;
	display: grid;
	grid-template-areas: 'center';
	place-items: stretch center;

	width: 100vw;

	color: var(--color-white);

	clip-path: inset(0);

	&__image {
		@include div100m;

		user-select: none;
	}

	&__img {
		@include div100;

		height: 120dvh;

	}

	&__img,
	&__items {
		grid-area: center;
	}

	&__items {
		@include flexColumn(center, space);

		position: relative;

		gap: 10rem;

		padding-top: 13rem;
		padding-bottom: 6rem;

		text-align: center;
	}

	&__item {
		position: relative;

		.star {
			position: absolute;
			top: 1.2rem;
			left: calc(50% + 4rem);
			font-size: 2rem;
		}
	}

	&__title {
		@include font(6rem, 300, 1em, -0.04em);

		&.isBig {
			font-size: 4rem;
		}
	}

	&__text {
		@include font(1.6rem, 300, 1.2em, -0.03em);

		margin-top: 2rem;
	}
}
</style>
