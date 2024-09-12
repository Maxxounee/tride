<template>
	<section class="SectionHero">
		<div
			class="SectionHero__background"

		>
			<div
				class="SectionHero__background-inner"
				ref="background"
			>
				<NuxtImg
					class="SectionHero__image"
					:src="lastFrameImage"
					format="webp"
				/>
				<video
					:src="video"
					:poster="poster"
					class="SectionHero__video"
					muted
					autoplay
					@ended="endedVideoHandler"
				/>
			</div>
		</div>
		<div
			ref="controlEl"
			class="SectionHero-control txt-h7 txt_medium"
		>
			<div
				ref="innerControlEl"
				class="SectionHero-control__inner"
			>
				<p class="SectionHero-control__number txt_color-sun">
					{{ Intl.NumberFormat('ru-RU', {minimumIntegerDigits: 2}).format(cardData.id) }}
				</p>

				<p class="SectionHero-control__name">
					{{ cardData.text }}
				</p>

				<div class="SectionHero-control__arrows">
					<button
						v-if="nextPrevPages.prevPage"
						class="SectionHero-control__arrow SectionHero-control__arrow_left"
						@click="$router.push(nextPrevPages.prevPage)"
					>
						<UIArrow dir="left" />
					</button>
					<button
						class="SectionHero-control__arrow SectionHero-control__arrow_right"
						@click="$router.push(nextPrevPages.nextPage)"
					>
						<UIArrow dir="right" />
					</button>
				</div>
			</div>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>
type TProps = {
	lastFrameImage: string;
	video: string;
	poster: string;
	cardData: {
		id: number;
		text: string;
	};
}
defineProps<TProps>();

const scroller = inject<HTMLElement>('pageScroller');

const el = useCurrentElement();
const controlEl = ref<HTMLElement | null>(null);
const innerControlEl = ref<HTMLElement | null>(null);
const background = ref();
const router = useRoute();

const pageOrder = ref<string[]>([
	'/',
	'/location',
	'/infrastructure',
	'/operator',
	'/plans'
]).value;

type TCompPages = { nextPage: string | undefined; prevPage: string | undefined };

const nextPrevPages = computed<TCompPages>(() => {
	const currentIndex = pageOrder.indexOf(router.path);

	const prevPage = pageOrder[currentIndex - 1];
	const nextPage = pageOrder[currentIndex + 1];

	return {prevPage, nextPage}
})

function animation() {
	const tl = useGsap.timeline({
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el),
			start: () => 'top top',
			end: () => innerHeight,
			scrub: true,
			pinSpacing: false,
			pin: true,
		},
	});

	tl
		.to(innerControlEl.value, {
			opacity: 0,
			duration: 1,
		})
		.to(controlEl.value, {
			width: () => '100%',
			height: () => '100%',
			duration: 4,
		}, '=-1')
		.to(background.value, {
			scale: 1.2,
			opacity: 0.7,
			duration: 4,
		}, 0);
}

function endedVideoHandler(event: Event) {
	useGsap.to(event.target, {
		opacity: 0,
		duration: 1,
		onComplete: () => event?.target?.remove(),
	})
}

onMounted(() => {
	animation();
});
</script>

<style lang="scss">
.SectionHero {
	@include flex(end, start);

	position: relative;
	width: 100%;
	height: 100vh;
	color: var(--color-sea);


	&__background {
		@include div100;

		overflow: hidden;
		background-color: var(--color-white);
	}

	&__background-inner {
		@include div100;
	}

	&__image {
		@include div100;
	}

	&__video {
		@include div100;
	}

	.SectionHero-control {
		position: absolute;
		bottom: -10px;
		left: 0;

		width: 77rem;
		height: 10rem;

		background-color: #F9F5F1;

		&__inner {
			@include flex(center);
			@include container100;

			padding: 0 var(--ruler-d-l);
		}

		&__name {
			margin-left: 4rem;
			text-transform: uppercase;
		}

		&__arrows {
			@include flex(center);

			gap: 2.5rem;
			margin-left: auto;
		}
	}
}
</style>
