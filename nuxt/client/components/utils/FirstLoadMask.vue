<template>
	<Transition name="first-load-mask-fade">
		<div
			v-if="active"
			class="FirstLoadMask"
			:style="{ '--background': background }"
			:class="{ centerSlot }"
		>
			<div class="FirstLoadMask__slot">
				<slot></slot>
			</div>
		</div>
	</Transition>
</template>

<script>
export default {
	props: {
		afterWindowLoadDelay: {
			type: Number,
			default: 300,
		},
		background: {
			type: String,
			default: 'white',
		},
		centerSlot: {
			type: Boolean,
			default: true,
		},
	},
	emits: ['FirstLoadMaskComplete', 'preloaderToggle'],
	data() {
		return {
			active: true,
		};
	},
	beforeMount() {
		this.$bus.$emit('preloaderToggle', true);
		this.$emit('preloaderToggle', true);

		// window.addEventListener('load', () => { this.delay(this.afterWindowLoadDelay).then(this.onComplete); });
		// window.addEventListener('DOMContentLoaded', () => { this.delay(this.afterWindowLoadDelay).then(this.onComplete); });

		setTimeout(this.onComplete, this.afterWindowLoadDelay + 500);
	},
	methods: {
		delay(ms) {
			return new Promise((resolve) => { setTimeout(resolve, ms); });
		},
		onComplete() {
			if (!this.active) { return null; }

			this.$bus.$emit('preloaderToggle', false);
			this.$bus.$emit('FirstLoadMaskComplete');
			this.$emit('FirstLoadMaskComplete');
			this.active = false;
		},
	},
};
</script>

<style lang="scss">

.first-load-mask-fade {
	&-enter {
		opacity: 0;
	}

	&-enter-active,
	&-leave-active {
		transition: opacity 0.4s ease !important;
	}

	&-enter-from,
	&-leave-to {
		opacity: 0;
		transition: opacity 0.4s ease !important;
	}

	&-leave-active {
		position: absolute !important;
	}
}

.FirstLoadMask {
	position: fixed;
	z-index: 1069;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	background: var(--background);

	&.centerSlot {
		.FirstLoadMask__slot {
			position: absolute;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
		}
	}
}
</style>
