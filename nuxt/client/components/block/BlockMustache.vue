<template>
	<div
		class="BlockMustache"
		:class="{ BlockMustache_active: elVisible }"
	>
		<div class="BlockMustache__item BlockMustache__item_left">
			<NuxtIcon name="common/mustache" />
		</div>
		<p class="BlockMustache__text">
			<slot />
		</p>
		<div class="BlockMustache__item BlockMustache__item_right">
			<NuxtIcon name="common/mustache" />
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
.BlockMustache {
	@include flex(center);

	position: relative;
	gap: 10rem;

	&__item {
		position: absolute;
		top: 50%;
		translate: 0 -50%;

		width: auto;
		height: auto;

		font-size: 17.2rem;
		color: var(--color-sun);

		opacity: 0;

		transition: left 0.8s, right 0.8s, opacity 0.4s;
		transition-delay: 0.4s;

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

			span {
				rotate: 180deg;
			}
		}
	}

	&__text {
		@include font(10rem, 400, 1.1em, -0.04em);

		text-align: center;
		opacity: 0;
		transition: opacity 0.4s;
	}

	&_active {
		.BlockMustache__item {
			opacity: 1;
			transition-delay: 0s;

			&_left {
				right: calc(100% + 10rem);
			}

			&_right {
				left: calc(100% + 10rem);
			}
		}

		.BlockMustache__text {
			opacity: 1;
			transition-delay: 0.4s;
		}
	}
}
</style>
