<template>
	<div class="InfrastructureInfoCards">
		<!-- Пин секции -->
		<div
			class="InfrastructureInfoCards__pin"
			ref="pin"
		>
			<div
				class="InfrastructureInfoCards__bar"
				ref="bar"
			>
				<div
					class="InfrastructureInfoCards__bar-thumb"
					ref="barThumb"
				></div>
			</div>
			<!-- Горизонтальный скролл-->
			<div
				class="InfrastructureInfoCards__inner"
				ref="inner"
			>

				<!-- Анимация ухода -->
				<div
					class="InfrastructureInfoCards__container"
					ref="container"
				>
					<!-- Анимация появления-->
					<div
						class="InfrastructureInfoCards__container-inner"
						ref="containerInner"
					>

						<div class="InfrastructureInfoCards__bottom">
							<BlockImageWithList
								v-for="(item, index) in items"
								:key="index"
								v-bind="item"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
import {items} from '@/configs/pages/infrastructure.ts'

const scroller = inject<HTMLElement>('pageScroller');
const el = useCurrentElement();
let unrefEl: HTMLElement;

const pin = ref();
const inner = ref();
const container = ref();
const containerInner = ref();
const barThumb = ref();
const bar = ref();

let fakeHorizontalScrollTween;

function pinSection() {
	useScrollTrigger.create({
		scroller,
		trigger: pin.value,
		pin: true,
		start: () => 'top top',
		end: (self) => self.start + (items.length - 1) * innerHeight * 1.2,
	})
}

function appearanceAnimation() {
	const tl = useGsap.timeline({
		ease: 'none',
		scrollTrigger: {
			trigger: pin.value,
			scroller,
			start: () => 'top bottom',
			end: () => 'bottom bottom',
		},
	})
	tl.from(containerInner.value, {y: () => '-35vw',}, 0);
	tl.to(bar.value, {

		keyframes: {
			0: {opacity: 0, y: '-80vh'},
			70: {opacity: 0},
			100: {opacity: 1, y: 0},
			easeEach: 'none',
		}
	}, 0);
}

function disappearanceAnimation() {
	useGsap.to(container.value, {
		ease: 'none',
		y: () => '-10vw',
		scrollTrigger: {
			trigger: unrefEl,
			scroller,
			start: () => 'bottom bottom',
			end: () => 'bottom top',
		},
	});
}

function fakeHorizontalScroll() {
	fakeHorizontalScrollTween = useGsap.to(inner.value, {
		ease: 'none',
		x: () => '100vw',
		xPercent: () => -100,
		scrollTrigger: {
			anticipatePin: 1,
			trigger: unrefEl,
			scroller,
			start: () => 'top top',
			end: () => 'bottom bottom',
		},
	});
}

function scrollBarAnimation() {
	useGsap.fromTo(barThumb.value,
		{width: '0%',},
		{
			ease: 'none',
			width: '100%',
			scrollTrigger: {
				anticipatePin: 1,
				trigger: unrefEl,
				scroller,
				start: () => 'top top',
				end: () => 'bottom bottom',
			},
		});
}

function cardsAnimation() {
	const cards = Array.from(unrefEl.querySelectorAll('.BlockImageWithList'));

	cards.forEach((card) => {
		useGsap.from(card.querySelector('.BlockImageWithList__image img'), {
			ease: 'none',
			scale: 1.069,
			scrollTrigger: {
				scroller,
				trigger: card,
				scrub: 0.2,
				containerAnimation: fakeHorizontalScrollTween,
				start: () => 'left right',
				end: () => 'right left',
			},
		})
	})
}


onMounted(() => {
	unrefEl = el.value;

	pinSection();
	appearanceAnimation();
	fakeHorizontalScroll();
	cardsAnimation();
	disappearanceAnimation();
	scrollBarAnimation();
})
</script>

<style lang="scss">
.InfrastructureInfoCards {
	&__pin {
		height: 100vh;
		background: var(--color-sun);
	}

	&__inner {
		display: inline-flex;
		height: 100%;
		padding: 0 var(--ruler-d-l);
	}

	&__container,
	&__container-inner {
		display: inline-flex;
		height: 100%;
	}

	&__bottom {
		display: inline-flex;
		margin-top: auto;
	}

	&__bar {
		position: absolute;
		right: var(--ruler-d-l);
		bottom: calc(62vh + 7.6rem);
		left: var(--ruler-d-l);

		height: 1px;

		background: rgb(255 255 255 / 30%);
	}

	&__bar-thumb {
		position: absolute;
		left: 0;

		width: 0;
		height: 100%;

		background: white;
	}
}
</style>
