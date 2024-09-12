<template>
	<div
		class="MobBlockMustache"
		:class="{ MobBlockMustache_active: elVisible }"
	>
		<div class="MobBlockMustache__item MobBlockMustache__item_left">
			<Icon name="common:mustache" />
		</div>
		<p
			class="MobBlockMustache__text"
			v-nbsp
		>
			<slot />
		</p>
		<div class="MobBlockMustache__item MobBlockMustache__item_right">
			<Icon name="common:mustache" />
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const el = useCurrentElement<HTMLElement>();
const elVisible = ref(false);
const scroller = inject<HTMLElement>('pageScroller');

onMounted(() => {
	useScrollTrigger.create({
		scroller,
		trigger: unrefElement(el),
		start: 'top center+=25%',
		scrub: false,
		onEnter: () => {
			elVisible.value = true;
		},
		onLeaveBack: () => {
			elVisible.value = false;
		},
	});
});
</script>

<style lang="scss">
.MobBlockMustache {
	@include flex(center);

	position: relative;
	gap: 10rem;

	&__item {
		position: absolute;
		top: 50%;
		translate: 0 calc(-50% + 0.1rem);

		width: auto;
		height: auto;

		font-size: 4.6rem;
		color: var(--color-sun);

		opacity: 0;

		transition: left 0.8s, right 0.8s, opacity 0.4s;
		transition-delay: 0.4s;

		svg {
			max-width: unset;
		}

		span {
			display: block;
			width: 6rem;
			font-size: 6rem;
		}

		&_left {
			right: 50%;
		}

		&_right {
			left: 50%;

			svg {
				rotate: 180deg;
			}
		}
	}

	&__text {
		@include font(2.4rem, 400, 1.1em, -0.04em);

		text-align: center;
		opacity: 0;
		transition: opacity 0.4s;
	}

	&_active {
		.MobBlockMustache__item {
			opacity: 1;
			transition-delay: 0s;

			&_left {
				right: calc(100% + 2rem);
			}

			&_right {
				left: calc(100% + 2rem);
			}
		}

		.MobBlockMustache__text {
			opacity: 1;
			transition-delay: 0.4s;
		}
	}
}
</style>
