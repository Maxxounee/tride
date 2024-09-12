<template>
	<div class="PlansFloorSwitcher">
		<button
			class="PlansFloorSwitcher__button PlansFloorSwitcher__button_up"
			:class="{ PlansFloorSwitcher__button_disabled: !nextFloor }"
			@click="goNextFloor"
		>
			<NuxtIcon
				filled
				name="ui/angle-top"
			/>
		</button>
		<div class="PlansFloorSwitcher__text">
			<p>{{ currentFloorCached }}</p>
			<span>этаж</span>
		</div>
		<button
			class="PlansFloorSwitcher__button PlansFloorSwitcher__button_down"
			:class="{ PlansFloorSwitcher__button_disabled: !prevFloor }"
			@click="goPrevFloor"
		>
			<NuxtIcon
				filled
				name="ui/angle-top"
			/>
		</button>
	</div>
</template>

<script
	lang="ts"
	setup
>
const livingStore = useLotsLivingStore();

const floorsInSection = computed(() => (livingStore.sectionId && livingStore.availableFloors[livingStore.sectionId]) || []);

const currentFloorIndex = computed(() => floorsInSection.value.findIndex((i) => livingStore.floorId === i));

const currentFloor = computed(() => livingStore.params.floor);
const currentFloorCached = ref();


const prevFloor = computed(() => floorsInSection.value && floorsInSection.value[currentFloorIndex.value - 1]);
const nextFloor = computed(() => floorsInSection.value && floorsInSection.value[currentFloorIndex.value + 1]);
watch(
	() => currentFloor.value,
	(value) => {
		if (value) {
			currentFloorCached.value = value;
		}
	},
	{immediate: true}
)
const emit = defineEmits([
	'change',
]);

function goPrevFloor() {
	if (prevFloor.value) {
		emit('change', prevFloor.value);
	}
}

function goNextFloor() {
	if (nextFloor.value) {
		emit('change', nextFloor.value);
	}
}
</script>

<style lang="scss">
.PlansFloorSwitcher {
	@include flexColumn(center);

	gap: 4rem;

	&__button {
		@include size(5.7rem);
		@include flex(center, center);

		font-size: 2rem;
		border: 1px solid var(--color-orange);
		border-radius: 100%;
		transition: background-color 0.2s, opacity 0.2s;

		&:hover {
			background-color: var(--color-orange);
		}

		&_down {
			span {
				translate: 0 0.2rem;
				rotate: 180deg;
			}
		}

		&_disabled {
			pointer-events: none;
			opacity: 0.5;
		}
	}

	&__text {
		@include flexColumn(center);

		p {
			@include font(6rem, 300, 1em);
		}

		span {
			@include font(1.2rem, 300, 1.5em);
		}
	}
}
</style>
