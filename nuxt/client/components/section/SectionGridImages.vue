<template>
	<section class="SectionGridImages">
		<div class="SectionGridImages__inner">
			<div
				class="SectionGridImages__row"
				v-for="(row, rowIndex) in gridMatrix"
				:key="rowIndex"
			>
				<div
					class="SectionGridImages__cell"
					v-for="(cell, cellIndex) in row"
					:key="cellIndex"
				>
					<NuxtImg
						v-if="testImage(cell)"
						format="webp"
						width="300"
						quality="80"
						:src="cell"
					/>
					<p
						v-else
						v-html="cell"
					></p>
				</div>
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
const gridRule = ref({columns: `repeat(${props.gridMatrix?.[0]?.length}, 1fr)`}); //CSS

function testImage(string: string): boolean {
	return /\.jpg|\.jpeg|\.webp|\.png/.test(String(string));
}

async function animateRowsAppearance(rows: []) {
	await delay(0);
	await nextTick();
	rows.forEach((row: HTMLElement, rowIndex) => {
		const cells = row.querySelectorAll('.SectionGridImages__cell');

		useGsap.from(cells, {
			ease: 'sine.out',
			opacity: 0,
			stagger: (cellIndex) => 0.03 * (cellIndex > (cells.length - 1) / 2 ? 1 : -1),
			x: (cellIndex) => {
				const dir = cellIndex > (cells.length - 1) / 2 ? 1 : -1;
				const indexedValue = (dir > 0 ? cellIndex : (cells.length - cellIndex - 1)) * 10;

				return (indexedValue + 10) * dir + 'rem'
			},
			scrollTrigger: {
				scroller,
				trigger: row,
				scrub: 1,
				start: () => 'top bottom',
				end: () => 'bottom bottom',
			},
		});
	})
}

onMounted(() => {
	const rows: [] = Array.from(el.value.querySelectorAll('.SectionGridImages__row'));
	animateRowsAppearance(rows);
});
</script>

<style lang="scss">
.SectionGridImages {
	@include flex(end, start);

	position: relative;
	width: 100%;
	color: var(--color-sea);
	background-color: var(--color-background);

	&__inner {
		@include flexColumn;

		gap: 4rem;
		width: 100%;
	}

	&__row {
		display: grid;
		grid-template-columns: v-bind('gridRule.columns');
		gap: 4rem;
	}

	&__cell {
		display: flex;

		p {
			@include font(1.2rem, 500, 1.2em);

			margin-top: auto;
			margin-left: -1rem;
			color: var(--color-text);
			text-transform: uppercase;
		}
	}
}
</style>
