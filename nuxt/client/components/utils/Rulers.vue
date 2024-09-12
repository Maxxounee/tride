<!-- eslint-disable -->
<template>
	<div
		v-if="dev && on"
		class="Rulers"
		:class="device.isMobileOrTablet ? 'mobile' : 'desktop'"
	>
		<div ruler="v" class="l" />
		<div ruler="v" class="l1" />
		<div ruler="v" class="l2" />
		<div ruler="v" class="r" />
		<div ruler="v" class="c" />
		<div ruler="h" class="t" />
		<!-- <div ruler="h" class="c"></div> -->
	</div>
</template>

<script setup lang="ts">
const device = useDevice();
const dev = import.meta.dev;
const on = ref(false);
useEventListener('keydown', keydownHandler);

function keydownHandler(event: KeyboardEvent) {
	if (event.key === 'F4') {
		on.value = !on.value;
	}
}
</script>

<style lang="scss" scoped>
.Rulers {
	&>[ruler] {
		pointer-events: none;

		position: absolute;
		z-index: 99999;

		border-color: rgb(0 255 8 / 50%);
		border-style: dashed;
		border-width: 0.15rem;

		&::before {
			content: attr(class);

			position: absolute;
			top: 1rem;
			left: 1rem;

			font-family: Arial, serif !important;
			font-size: 1rem;
			color: rgb(128 128 255 / 100%);
			text-transform: uppercase;
			white-space: nowrap;
		}

		&[ruler="v"] {
			top: 0;
			height: 100vh;
			margin: 0 -0.075rem;

			&.c {
				left: 50%;
				background-color: rgb(0 128 0 / 20%);
			}
		}

		&[ruler="h"] {
			left: 0;
			width: 100%;
			margin: -0.075rem 0;

			&.c {
				top: 50%;
				background-color: rgb(0 128 0 / 20%);
			}
		}
	}

	&.desktop {
		&>[ruler] {
			&.l {
				left: var(--ruler-d-l);
			}

			&.l1 {
				left: calc(var(--ruler-d-l1) + var(--ruler-d-l));
			}

			&.l2 {
				left: calc(var(--ruler-d-l2) + var(--ruler-d-l));
			}

			&.r {
				right: var(--ruler-d-r);
			}

			&.t {
				top: var(--ruler-d-t);
				display: none;
			}
		}
	}

	&.mobile {
		&>[ruler] {
			&.l {
				left: var(--ruler-m-l);
			}

			&.r {
				right: var(--ruler-m-r);
			}

			&.t {
				top: var(--ruler-m-t);
			}

			&.b {
				bottom: var(--ruler-m-b);
			}
		}
	}
}
</style>
