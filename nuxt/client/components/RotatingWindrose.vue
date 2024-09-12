<template>
	<div class="RotatingWindrose">
		<div class="RotatingWindrose__icon">
			<slot />
		</div>
		<div
			v-for="(letter, name) in letters"
			:key="name"
			class="RotatingWindrose__letter"
			:class="`RotatingWindrose__letter_${name}`"
			v-html="letter"
		/>
	</div>
</template>

<script lang="ts" setup>
const props = defineProps({
	letters: {
		type: Object,
		default: () => ({
			n: 'С',
			e: 'В',
			s: 'Ю',
			w: 'З',
		}),
	},
	angle: {
		type: Number,
		default: 45,
	},
	duration: {
		type: Number,
		default: 0.3,
	},
	gap: {
		type: String,
		default: '1rem',
	},
});

const animAngle = computed(() => props.angle + 'deg');
const animTime = computed(() => props.duration + 's');
</script>

<style lang="scss">
.RotatingWindrose {
	pointer-events: none;
	position: relative;
	rotate: v-bind(animAngle);
	transition: rotate v-bind(animTime);

	&__icon {
		grid-area: icon;
	}

	&__letter {
		--letter-distance: 120%;

		position: absolute;
		rotate: calc(v-bind(animAngle) * -1);

		width: 2em;
		margin: -1em;

		font-size: 1.5rem;
		line-height: 2;
		text-align: center;

		transition: rotate v-bind(animTime);

		&_n {
			bottom: var(--letter-distance);
			left: 50%;
		}

		&_s {
			top: var(--letter-distance);
			left: 50%;
		}

		&_w {
			top: 50%;
			right: var(--letter-distance);
		}

		&_e {
			top: 50%;
			left: var(--letter-distance);
		}
	}
}
</style>
