<template>
	<section class="MobSectionScrollPhotoSlider">
		<div
			class="MobSectionScrollPhotoSlider__item"
			v-for="(item, index) in items"
			:key="index"
		>
			<NuxtImg
				class="MobSectionScrollPhotoSlider__image"
				preset="default"
				:src="item.image"
				format="webp"
				width="1000"
				quality="80"
			/>
			<div
				class="MobSectionScrollPhotoSlider__container"
				:style="{ '--background': item.background }"
			>
				<p
					class="MobSectionScrollPhotoSlider__title"
					v-html="item.title"
				></p>
				<p
					class="MobSectionScrollPhotoSlider__text"
					v-html="item.textNoBr"
				></p>
			</div>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>

type TItem = {
	image: string;
	background: string;
	title: string;
	textNoBr: string;
}
type TProps = {
	items: TItem[]
}
const props = defineProps<TProps>()
const el = useCurrentElement();
const pin = ref();
const inner = ref();
const scroller = inject<HTMLElement>('pageScroller');

function scrollAnimation() {
	const unrefEl: HTMLElement = unrefElement(el);
	const items: [] = Array.from(unrefEl.querySelectorAll('.MobSectionScrollPhotoSlider__item'));

	items.forEach((item: HTMLElement, index) => {
		const container: HTMLElement = item.querySelector('.MobSectionScrollPhotoSlider__container');
		const image: HTMLElement = item.querySelector('.MobSectionScrollPhotoSlider__image');

		const tl = useGsap.timeline({
			ease: 'power2.inOut',
			scrollTrigger: {
				scroller,
				trigger: unrefEl,
				scrub: 0.2,
				start: () => 'top 30%',
				end: () => 'top 5%',
			}
		})
		tl[index ? 'from' : 'to'](container, {yPercent: index ? -100 : 100}, 0)
		tl[index ? 'from' : 'to'](image, {rotate: '0.69deg', scale: 1.1}, 0)
	})
}

async function main() {
	await delay(0);
	await nextTick();
	useScrollTrigger.refresh();

	scrollAnimation();
}

onMounted(() => {
	main();
});
</script>

<style lang="scss">
.MobSectionScrollPhotoSlider {
	@include flexColumn;

	gap: 1rem;

	&__item {
		position: relative;
		overflow: hidden;
		height: 40dvh;
	}

	&__container {
		@include div100;
		@include flexColumn(center, center);

		will-change: transform, translate;

		gap: 5rem;

		color: var(--color-white);
		text-align: center;

		background: var(--background);
	}

	&__image {
		will-change: transform, translate;

	}

	&__title {
		@include font(2rem, 400, 1.1em, -0.04em);
	}

	&__text {
		@include font(1.2rem, 400, 1.2em, -0.03em);

		padding: 0 3rem;
	}
}
</style>
