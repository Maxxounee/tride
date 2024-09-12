<template>
	<section class="LocationFloatImages">
		<div class="LocationFloatImages__main">
			<NuxtImg
				src="/images/location/float/main.jpg"
				preset="default"
				format="webp"
				width="1920"
			/>
		</div>
		<div class="LocationFloatImages__float LocationFloatImages__float_0">
			<NuxtImg
				src="/images/location/float/0.png"
				preset="default"
				format="webp"
			/>
		</div>
		<div class="LocationFloatImages__float LocationFloatImages__float_1">
			<NuxtImg
				src="/images/location/float/1.png"
				preset="default"
				format="webp"
			/>
		</div>
		<div class="LocationFloatImages__float LocationFloatImages__float_2">
			<NuxtImg
				src="/images/location/float/2.png"
				preset="default"
				format="webp"
			/>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>
const scroller = inject<HTMLElement>('pageScroller');
const el = useCurrentElement();

function appearanceAnimation() {
	const tlAppearance = useGsap.timeline({
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el),
			start: () => 'top bottom',
			end: () => 'top top',
		},
	});
	tlAppearance.from('.LocationFloatImages__main', {
		y: () => '-10rem',
		opacity: 0,
	}, 0)
	tlAppearance.to('.LocationFloatImages__float img', {
		stagger: 0.05,
		keyframes: {
			0: {
				filter: 'blur(24px)',
				opacity: 0,
				y: (index) => '10rem',
				scale: 0.8,
			},
			100: {
				filter: 'blur(0px)',
				opacity: 1,
				y: () => '0rem',
				scale: 1,
			},
		},
	}, 0)
}

function mainAnimation() {
	const tlMain = useGsap.timeline({
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el),
			pin: true,
			pinSpacing: true,
			start: () => 'top top',
			end: () => '300%',
		},
	});


	const floatTranslateDict = {
		0: {x: '-28rem', y: '-2rem', transformOrigin: 'right bottom'},
		1: {x: '28rem', y: '3rem', transformOrigin: 'left top'},
		2: {x: '2rem', y: '25rem', transformOrigin: 'top left'},
	}

	useGsap.set('.LocationFloatImages__float', {transformOrigin: (index) => floatTranslateDict[index].transformOrigin})

	tlMain
		.to('.LocationFloatImages__main', {
			keyframes: {
				0: {'clip-path': 'inset(4vh 23vw)'},
				100: {'clip-path': 'inset(0vh 0vw)'},
			}
		}, 0)
		.to('.LocationFloatImages__main img', {
			keyframes: {
				0: {scale: 1.269},
				100: {scale: 1},
			}
		}, 0)
		.to('.LocationFloatImages__float', {
			keyframes: {
				0: {x: 0, y: 0, filter: 'blur(0)'},
				80: {
					opacity: 0,
					scale: 1.5,
					filter: 'blur(24px)',
					x: (index) => floatTranslateDict[index].x,
					y: (index) => floatTranslateDict[index].y,
				},
			}
		}, 0)
}

onMounted(() => {
	appearanceAnimation();
	mainAnimation();
});
</script>

<style lang="scss">
.LocationFloatImages {
	@include flexColumn(center, start);

	position: relative;
	height: 100vh;
	padding: 0 var(--ruler-d-r) 0 var(--ruler-d-l);
	background-color: var(--color-background);

	&__main {
		position: relative;
		width: 100%;
		height: 60vh;
		margin-top: 24rem;
	}

	&__float {
		position: absolute;

		&_0 {
			top: 14%;
			left: 4%;
			width: 19.2rem;
			height: 27.3rem;
		}

		&_1 {
			top: 50%;
			right: 4%;
			width: 11.8rem;
			height: 14.1rem;
		}

		&_2 {
			bottom: 11vh;
			left: 55%;
			width: 19.3rem;
			height: 15.6rem;
		}
	}
}
</style>
