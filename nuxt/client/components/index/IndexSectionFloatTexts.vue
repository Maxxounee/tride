<template>
	<div class="IndexSectionFloatTexts">
		<div
			class="IndexSectionFloatTexts__img"
			ref="imgWrapper"
		>
			<NuxtImg
				class="IndexSectionFloatTexts__img"
				src="/images/index/float-bg-1.jpg"
				format="webp"
			/>
		</div>

		<div class="IndexSectionFloatTexts__items">
			<div
				v-for="(item, key) in items"
				:key
				class="IndexSectionFloatTexts__item"
			>
				<p
					class="IndexSectionFloatTexts__title"
					v-html="item.title"
				/>
				<p
					class="IndexSectionFloatTexts__text"
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
};
const items = ref<TItem[]>(floatTexts);


const el = useCurrentElement<HTMLElement>();
const scroller = inject<HTMLElement>('pageScroller');
const imgWrapper = ref();

function animateImage() {
	useScrollTrigger.create({
		pin: imgWrapper.value,
		scroller,
		trigger: unrefElement(el),
		start: () => 'top top',
		end: () => 'bottom top',
	})
	useGsap.to('.IndexSectionFloatTexts__img img', {
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
	const textItems = el.value?.querySelectorAll('.IndexSectionFloatTexts__item');

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
				end: () => 'top top',
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
.IndexSectionFloatTexts {
	position: relative;

	overflow: hidden;
	display: grid;
	grid-template-areas: 'center';
	place-items: stretch center;

	width: 100vw;

	color: var(--color-white);

	&__image {

		@include div100m;

		user-select: none;
	}

	&__img {
		@include div100;

		height: unset;

	}

	&__img,
	&__items {
		grid-area: center;
	}

	&__items {
		@include flexColumn(center, space);

		position: relative;

		gap: 34rem;

		padding-top: 34rem;
		padding-bottom: 20rem;

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
		@include font(12rem, 300, 1em, -0.04em);
	}

	&__text {
		@include font(2.4rem, 300, 1.2em, -0.03em);
	}
}
</style>
