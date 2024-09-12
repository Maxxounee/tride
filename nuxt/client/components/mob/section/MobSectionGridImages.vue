<template>
	<section class="MobSectionGridImages">
		<div class="MobSectionGridImages__inner">
			<div
				class="MobSectionGridImages__cell"
				v-for="(item, rowIndex) in gridMatrix"
				:key="rowIndex"
			>
				<NuxtImg
					v-if="testImage(item)"
					format="webp"
					width="300"
					quality="80"
					:src="item"
				/>
				<p
					v-else-if="item"
					v-html="item"
				></p>
			</div>
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>

const props = defineProps({
	gridMatrix: {
		type: Array as () => string[string],
		default: () => ([
			['str', 'str', 'str'],
			['str', 'str', 'str'],
			['str', 'str', 'str'],
			['str', 'str', 'str'],
		])
	}
});
const el = useCurrentElement();
const scroller = inject<HTMLElement>('pageScroller');

function testImage(string: string): boolean {
	return /\.jpg|\.jpeg|\.webp|\.png/.test(String(string));
}

async function animateAppearance(items: []) {
	await delay(0);
	await nextTick();
	items.forEach((item, index) => {
		useGsap.from(item, {
			ease: 'sine.out',
			opacity: 0,
			x: () => {
				const dir = index % 2 ? 1 : -1;

				return 10 * dir + 'rem'
			},
			scrollTrigger: {
				scroller,
				trigger: item,
				scrub: 1,
				start: () => 'top bottom',
				end: () => 'bottom bottom',
			},
		});
	})

}

onMounted(() => {
	const items: [] = Array.from(el.value.querySelectorAll('.MobSectionGridImages__cell'));
	animateAppearance(items);
});
</script>

<style lang="scss">
.MobSectionGridImages {
	@include flex(end, start);

	position: relative;
	width: 100%;
	color: var(--color-sea);
	background-color: var(--color-background);

	&__inner {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1.5rem;
		width: 100%;
	}

	&__row {

	}

	&__cell {
		@include flex(center, center);

		height: 28.5rem;

		&:has(p) {
			background: rgb(241 238 234 / 100%);
		}

		p {
			@include font(1rem, 500, 1.2em);

			color: var(--color-text);
			text-align: center;
			text-transform: uppercase;
		}
	}
}
</style>
