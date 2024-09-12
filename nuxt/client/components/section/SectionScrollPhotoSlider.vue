<template>
	<section class="SectionScrollPhotoSlider">
		<div
			class="SectionScrollPhotoSlider__pin"
			ref="pin"
		>
			<div class="SectionScrollPhotoSlider__inner">
				<div
					class="SectionScrollPhotoSlider__item"
					v-for="(item, index) in items"
					:key="index"
				>
					<NuxtImg
						class="SectionScrollPhotoSlider__image"
						preset="default"
						:src="item.image"
						format="webp"
						width="1000"
						quality="80"
					/>
					<div
						class="SectionScrollPhotoSlider__container"
						:style="{ '--background': item.background }"
					>
						<p
							class="SectionScrollPhotoSlider__title"
							v-html="item.title"
						></p>
						<p
							class="SectionScrollPhotoSlider__text"
							v-html="item.text"
						></p>
					</div>
				</div>
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
	text: string;
}
type TProps = {
	items: TItem[]
}
const props = defineProps<TProps>()
const el = useCurrentElement();
const pin = ref();
const inner = ref();
const scroller = inject<HTMLElement>('pageScroller');

function pinSection() {
	useScrollTrigger.create({
		scroller,
		trigger: pin.value,
		pin: true,
		pinSpacing: true,
		invalidateOnRefresh: true,
		start: () => 'bottom bottom-=5%',
		end: (self) => self.start + (props.items.length - 1) * innerHeight * 1.5,
	})
}

function scrollAnimation() {
	const unrefEl: HTMLElement = unrefElement(el);
	const items: [] = Array.from(unrefEl.querySelectorAll('.SectionScrollPhotoSlider__item'));

	items.forEach((item: HTMLElement, index) => {
		const container: HTMLElement = item.querySelector('.SectionScrollPhotoSlider__container');
		const image: HTMLElement = item.querySelector('.SectionScrollPhotoSlider__image');

		const tl = useGsap.timeline({
			ease: 'power2.inOut',
			scrollTrigger: {
				scroller,
				trigger: unrefEl,
				scrub: 0.2,
				start: () => 'top top',
				end: () => 'bottom bottom',
			}
		})
		tl[index ? 'to' : 'from'](container, {xPercent: index ? -100 : 100}, 0)
		tl[index ? 'from' : 'to'](image, {rotate: '0.69deg', scale: 1.1}, 0)
	})
}

async function main() {
	await delay(0);
	await nextTick();
	useScrollTrigger.refresh();
	pinSection();
	scrollAnimation();
}

onMounted(() => {
	main();
});
</script>

<style lang="scss">
.SectionScrollPhotoSlider {
	&__inner {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.4rem;
	}

	&__item {
		position: relative;
		overflow: hidden;
		height: 65vh;
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
		@include font(4rem, 400, 1.1em, -0.04em);
	}

	&__text {
		@include font(2rem, 400, 1.4em, -0.03em);
	}
}
</style>
