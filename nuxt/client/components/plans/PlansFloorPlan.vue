<template>
	<div class="PlansFloorPlan">
		<div class="PlansFloorPlan__inner">
			<div class="top">
				<div class="top__name">
					{{ buildingData?.tr_b }}
				</div>
				<div class="top__total">
					<strong>
						{{ floorDataCached?.at }}
					</strong>
					<small>
						номер{{ wordEnd(floorDataCached?.at, 'hotelRoom') }}
					</small>
				</div>
			</div>
			<div class="bottom">
				<div class="legend">
					<div
						v-for="(item, index) in legend"
						:key="index"
						class="legend__item"
					>
						<div
							class="legend__circle"
							:style="{
								opacity: item.opacity,
								background: item.color,
							}"
						/>
						<span
							class="legend__text"
							v-html="item.text"
						/>
					</div>
				</div>
				<div
					v-if="activeFloorIdCached"
					class="bottom__floor"
				>
					<FloorPlan
						ref="floorPlanInstance"
						:floor-id="activeFloorIdCached"
						:json-data="livingStore.livingData"
						@area-loaded="floorLoaded"
						@area-mouse-over="flatMouseover"
						@area-mouse-out="flatMouseout"
						@area-click="flatClick"
					/>
				</div>
				<PlansFloorSwitcher @change="changeFloor" />
			</div>
			<footer class="footer">
				<TransitionGroup name="opacity200">
					<template v-if="footerItems[0].value">
						<div
							v-for="(item, index) in footerItems"
							:key="index"
							class="item"
						>
							<span
								class="item__value"
								v-html="item.value"
							/>
							<span
								class="item__text"
								v-html="item.text"
							/>
						</div>
					</template>
				</TransitionGroup>
			</footer>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
import PlansFloorSwitcher from '~/components/plans/additional/PlansFloorSwitcher.vue';

const queryHandler = useQueryHandler();
const livingStore = useLotsLivingStore();
const buildingData = computed(() => livingStore.buildingData);

const activeFloorId = computed(() => livingStore.floorId);
const activeFloorIdCached = ref();

const floorData = computed(() => livingStore.floorData);
const flatDataHovered = computed(() => livingStore.flatDataHovered);
const floorDataCached = ref({});
const floorPlanInstance = ref();

const styles = {
	opacity: { active: 1, notActive: 0.3 },
	color: { lux: '#dc6c2f', standard: '#D9D8D5' },
};

const legend = [
	{
		text: 'Люкс',
		color: styles.color.lux,
		opacity: styles.opacity.notActive,
	},
	{
		text: 'Стандарт',
		color: styles.color.standard,
		opacity: styles.opacity.notActive,
	},
];

const footerItems = computed(() => [
	{ value: flatDataHovered.value.tr_n, text: '№' },
	{ value: flatDataHovered.value.sq, text: 'м<sup>2</sup>' },
	{ value: formatCost(flatDataHovered.value.tc), text: 'Стоимость, руб.' },
]);

watch(
	() => activeFloorId.value,
	(value) => {
		if (value) {
			activeFloorIdCached.value = value;
		}
	},
	{ immediate: true },
);

watch(
	() => floorData.value,
	(value) => {
		if (value) {
			floorDataCached.value = value;
		}
	},
	{ immediate: true },
);

function flatMouseover(el) {
	el.bottom.attr({ opacity: styles.opacity.active });
	livingStore.setHoveredFlat(el.alt);
}

function flatMouseout(el) {
	el.bottom.attr({ opacity: styles.opacity.notActive });
	livingStore.setHoveredFlat();
}

function flatClick(el) {
	const [building, section, floor, flat] = el.alt.split('-');
	queryHandler.change({ building, section, floor, flat });
}

function changeFloor(alt) {
	const [building, section, floor] = alt.split('-');
	queryHandler.change({ building, section, floor });
}

function floorLoaded() {
	floorPlanInstance.value?.areaInstance.forEach((el: any) => {
		const apart = livingStore.livingData?.apartments[el.alt];

		/* TODO: у всех хат ST === 0 */
		if (!apart || apart?.asddassdadsast === 0) {
			return;
		}
		else {
			el.attr({ opacity: 0 });
			el.bottom.attr({ 'opacity': styles.opacity.notActive, 'fill-opacity': 1 });

			if (apart?.rc === 2) {
				el.bottom.attr({ fill: styles.color.lux });
			}
			if (apart?.rc === 1) {
				el.bottom.attr({ fill: styles.color.standard });
			}
		}
	});
}

onMounted(() => {
});
</script>

<style lang="scss">
.PlansFloorPlan {
	@include div100;

	height: 100%;
	background: var(--color-background);

	&__inner {
		@include div100;
		@include flexColumn;

		padding: 21rem var(--ruler-d-l) 4rem;
	}

	.FloorPlan {
		&__content {
			width: auto;
			height: 100%;
		}

		&__label {
			pointer-events: none;
		}

		&__label-content {
			@include flex(center, center);
			@include font(2rem);

			border-radius: 100%;
		}

		&__label_st {
			&-0 {
				display: none;
			}

			&-1 {
				@include size(6rem);

				color: var(--color-black);
				background-color: var(--color-orange);
			}

			&-2,
			&-3 {
				@include size(5.4rem);

				color: var(--color-white);
				background-color: var(--color-black);
			}
		}

		path {
			transition: fill 0.2s, opacity 0.2s;
		}
	}

	.top {
		@include flex(null, space);

		padding-bottom: 2rem;
		border-bottom: 1px solid rgb(185 212 215);

		&__name {
			@include font(16rem, 300, 1em, -0.07em);

			color: var(--color-sea);
		}

		&__total {
			strong {
				@include fontItalic(16rem, 300, 1em, -0.04em);

				color: var(--color-sun);
			}

			small {
				@include font(4rem, 400, 1em, -0.07em);

				margin-left: 1rem;
				color: var(--color-sea);
			}
		}
	}

	.bottom {
		@include flex(center);

		width: 100%;
		padding-top: 14rem;

		&__floor {
			flex: 1 1;
			padding: 0 10rem 0 8rem;
		}

		.legend {
			@include flexColumn;

			gap: 2rem;

			&__item {
				@include flex(center);
			}

			&__circle {
				@include size(1.2rem);

				border-radius: 50%;
			}

			&__text {
				@include font(2rem, 400, 1em, -0.03em);

				margin-left: 1.2rem;
				color: var(--color-sea);
			}
		}

		.PlansFloorSwitcher {
			&__text {
				p {
					@include font(7rem, 300, 1em);

					color: var(--color-sun);
				}

				span {
					@include font(2rem, 400, 1em, -0.03em);

					color: var(--color-sea);
				}
			}
		}
	}

	.footer {
		@include flex(bottom, center);

		gap: 10rem;
		margin-top: auto;

		.item {
			@include flex(end);

			gap: 1.6rem;

			&__value {
				@include font(7rem, 300, 0.7em, -0.04em);

				color: var(--color-sun);
			}

			&__text {
				@include font(2rem, 400, 1em, -0.04em);

				position: relative;
				display: block;
				color: var(--color-sea);
			}
		}
	}

}
</style>
