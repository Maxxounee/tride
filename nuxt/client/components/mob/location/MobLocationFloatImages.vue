<template>
	<section class="MobLocationFloatImages">
		<div class="MobLocationFloatImages__main">
			<NuxtImg
				src="/images/location/float/main.jpg"
				preset="default"
				format="webp"
				width="1920"
			/>
		</div>
		<div class="MobLocationFloatImages__float MobLocationFloatImages__float_0">
			<NuxtImg
				src="/images/location/float/0.png"
				preset="default"
				format="webp"
			/>
		</div>
		<div class="MobLocationFloatImages__float MobLocationFloatImages__float_1">
			<NuxtImg
				src="/images/location/float/1.png"
				preset="default"
				format="webp"
			/>
		</div>
		<div class="MobLocationFloatImages__float MobLocationFloatImages__float_2">
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

function mainAnimation() {
	const tlMain = useGsap.timeline({
		scrollTrigger: {
			scroller,
			trigger: unrefElement(el),
			start: () => 'top bottom',
			end: () => 'bottom top',
		},
	});


	const floatTranslateDict = {
		0: {x: '-28rem', y: '-2rem', transformOrigin: 'right bottom'},
		1: {x: '28rem', y: '3rem', transformOrigin: 'left top'},
		2: {x: '-10rem', y: '25rem', transformOrigin: 'top left'},
	}

	useGsap.set('.MobLocationFloatImages__float', {transformOrigin: (index) => floatTranslateDict[index].transformOrigin})

	tlMain
		.to('.MobLocationFloatImages__main', {
			keyframes: {
				0: {'clip-path': 'inset(4vh 23vw)'},
				50: {'clip-path': 'inset(0vh 0vw)'},
			}
		}, 0)
		.to('.MobLocationFloatImages__main img', {
			keyframes: {
				0: {scale: 1.269},
				100: {scale: 1},
			}
		}, 0)
		.to('.MobLocationFloatImages__float', {
			keyframes: {
				20: {x: 0, y: 0, filter: 'blur(0)'},
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
	// appearanceAnimation();
	mainAnimation();
});
</script>

<style lang="scss">
.MobLocationFloatImages {
	@include flexColumn(center, center);

	position: relative;
	z-index: 1;
	height: 60dvh;

	// padding: 0 var(--ruler-d-r) 0 var(--ruler-d-l);
	background-color: var(--color-background);

	&__main {
		position: relative;
		width: 100%;
		height: 19.6rem;
	}

	&__float {
		position: absolute;

		&_0 {
			top: 24%;
			left: 19%;
			width: 7rem;
			height: 10rem;
		}

		&_1 {
			top: 50%;
			right: 25%;
			width: 4.6rem;
			height: 5.6rem;
		}

		&_2 {
			bottom: 28%;
			left: 30%;
			width: 8.8rem;
			height: 7.1rem;
		}
	}
}
</style>
