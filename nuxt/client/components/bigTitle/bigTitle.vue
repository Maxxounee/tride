<template>
	<div class="BigTitle">
		<div
			class="BigTitle__inner"
			ref="inner"
		>
			<slot />
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>

type TProps = {
	showAnimation?: boolean
	scrollTriggerStart?: string
	scrollTriggerEnd?: string
	showScrub?: boolean | number
	showIgnoreClass?: string

	exitBlur?: boolean
	inverseExit?: boolean
	exitTriggerStart?: string
	exitTriggerEnd?: string

	trigger?: string
	endTrigger?: string
}

const props = withDefaults(defineProps<TProps>(), {
	showAnimation: true,
	scrollTriggerStart: 'top bottom',
	scrollTriggerEnd: 'top 20%',
	showScrub: 0.4,
	showIgnoreClass: '',

	exitBlur: true,
	inverseExit: false,
	exitTriggerStart: 'top top',
	exitTriggerEnd: 'bottom top',

	trigger: undefined,
	endTrigger: undefined,
});

const el = useCurrentElement();
const scroller = inject<HTMLElement>('pageScroller');
const inner = ref(null);

onMounted(() => {
	const trigger = props.trigger ? document.querySelector(props.trigger) : unrefElement(useCurrentElement());

	const availableItems = [
		'.BigTitleText',
		'.BigTitleTextAccent',
	]
	const items = Array.from(unrefElement(el)?.querySelectorAll(availableItems.join())).filter((item) => !item.classList.contains(props.showIgnoreClass));
	const images = unrefElement(el)?.querySelectorAll('.BigTitleImg');

	async function animate() {

		if (props.exitBlur) {
			await delay(0);
			await nextTick();

			useGsap.fromTo(unrefElement(inner), {
				filter: 'blur(0px)',
				opacity: 1,
			}, {
				filter: 'blur(20px)',
				opacity: 0,
				y: () => props.inverseExit ? '5rem' : '-5rem',
				ease: 'power2.out',
				scrollTrigger: {
					scroller,
					trigger,
					scrub: 0.1,
					start: () => props.exitTriggerStart,
					end: () => props.exitTriggerEnd,
				},
			})
		}

		if (props.showAnimation && items) {
			await delay(0);
			await nextTick();

			const randomId = 'ST' + Math.random();
			useGsap.fromTo(items, {
				filter: 'blur(50px)',
				opacity: 0,
			}, {
				translate: 0,
				opacity: 1,
				ease: 'power2.inOut',
				filter: 'blur(0px)',
				stagger: 0.02,
				scrollTrigger: {
					scroller,
					trigger,
					scrub: props.showScrub,
					start: () => props.scrollTriggerStart,
					end: () => props.scrollTriggerEnd,
					id: randomId,
				},
			});

			const clips = [
				// 'inset(100% 0% 0% 0%)',
				'inset(0% 100% 0% 0%)',
				// 'inset(0% 0% 100% 0%)',
				'inset(0% 0% 0% 100%)',
			]
			images.forEach((image) => {
				useGsap.set(image, {'clip-path': clips[Math.floor(Math.random() * clips.length)]})
				useGsap.to(image, {
					ease: 'sine.out',
					'clip-path': 'inset(0% 0% 0% 0%)',
					scrollTrigger: {
						scroller,
						trigger,
						scrub: props.showScrub,
						start: () => {
							const st = useScrollTrigger.getById(randomId)
							return st?.start + (st?.end - st?.start) * 0.5;
						},
						end: () => props.scrollTriggerEnd,
					},
				});
			})
		}
	}

	animate();
});
</script>

<style lang="scss">
.BigTitle {
	@include flexColumn(start);

	gap: 4rem;
}
</style>
