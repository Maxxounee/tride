<template>
	<section class="OperatorWelcome">
		<!-- pin -->
		<div
			ref="pin"
			class="OperatorWelcome__pin"
		>
			<!-- появление -->
			<div
				ref="appearance"
				class="OperatorWelcome__appearance"
			>
				<!-- Уход -->
				<div
					ref="inner"
					class="OperatorWelcome__inner"
				>
					<h1 class="OperatorWelcome__title">
						Alean Collection — это больше, чем отельный оператор,
						это&nbsp;лидер в развитии
						<mark>All Inclusive</mark>
						и
						<mark>Ultra All Inclusive</mark>
						в России
					</h1>
					<div class="OperatorWelcome__cards">
						<OperatorWelcomeCard
							v-for="(card, index) in cards"
							:key="index"
							v-bind="card"
						/>
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
import { cards } from '~/configs/pages/operator';

const scroller = inject('pageScroller');
const appearance = ref();
const inner = ref();
const pin = ref();
const el = useCurrentElement();

function pinSection() {
	useScrollTrigger.create({
		scroller,
		pin: pin.value,
		start: () => 'top top',
		end: (self: { start: number }) => self.start + innerHeight,
	});
}

function appearanceAnimation() {
	useGsap.from(appearance.value, {
		filter: 'blur(24px)',
		opacity: 0,
		y: () => '10rem',
		scrollTrigger: {
			scroller,
			trigger: el.value,
			start: () => 'top top',
			end: () => 'bottom bottom',
		},
	});

	useGsap.to(inner.value, {
		y: () => '-10rem',
		scrollTrigger: {
			scroller,
			trigger: el.value,
			start: () => 'bottom bottom',
			end: () => 'bottom top',
		},
	});
}

function cardsAnimation() {
	const cards = el.value.querySelectorAll('.OperatorWelcomeCard');

	useGsap.from(cards, {
		x: () => '50vw',
		stagger: 0.05,
		ease: 'power1.out',
		scrollTrigger: {
			scroller,
			trigger: el.value,
			scrub: 1,
			start: () => 'top top',
			end: () => 'bottom 90%',
		},
	});
}

onMounted(() => {
	pinSection();
	appearanceAnimation();
	cardsAnimation();
});
</script>

<style lang="scss">
.OperatorWelcome {
	position: relative;

	&__title {
		@include font(6rem, 400, 1.2em, -0.05em);

		color: var(--color-sea);

		mark {
			color: var(--color-sun);
		}
	}

	&__inner {
		@include flexColumn(center, end);

		width: 100vw;
		height: 100dvh;
		padding: 0 var(--ruler-d-l) 13rem;
	}

	&__cards {
		@include flex(null, space);

		width: 100%;
		margin-top: 13.6rem;
	}
}
</style>
