<template>
	<nav class="MenuMainLinks">
		<NuxtLink
			v-for="(item, index) in menuStore.mainLinks"
			:key="index"
			class="MenuMainLinks__item"
			:class="{ active: item.to === $route.path }"
			:to="item.to"
			@click="menuStore.closeMenu"
		>
			<p class="MenuMainLinks__number">
				{{ Intl.NumberFormat('ru-RU', { minimumIntegerDigits: 2 }).format(index + 1) }}
			</p>
			<p class="MenuMainLinks__text">
				{{ item.text }}
			</p>
		</NuxtLink>
	</nav>
</template>

<script lang="ts" setup>
const menuStore = useMenuStore();
</script>

<style lang="scss">
.MenuMainLinks {
	@include flexColumn(start, space);

	height: 100%;
	text-transform: uppercase;

	&__item {
		@include flex(center);

		transition: color 0.3s;

		&.active {
			color: var(--color-sun);

			.MenuMainLinks__text {
				@include textCrop(1, -17px, -4px);

				font-family: NotoSerifDisplay, serif;
				font-size: 11rem;
				font-style: italic;
				text-transform: lowercase;
				letter-spacing: -0.4382rem;
			}
		}

		@media(hover) {
			&:hover {
				color: var(--color-sun);
			}
		}
	}

	&__number {
		@include textCrop;

		width: 4.5rem;
		font-size: 1.4rem;
		line-height: 150%;
		letter-spacing: -0.07rem;
	}

	&__text {
		@include textCrop(1, 0.1px, -11px);

		font-size: 8.4rem;
		font-weight: 300;
		line-height: 110%;
		letter-spacing: -0.5884rem;
	}
}

.layout-mobile .MenuMainLinks {
	gap: 2.4rem;
	justify-content: start;

	&__item {
		&.active {
			.MenuMainLinks__text {
				@include textCrop(1, -5px, 0.1px);

				font-family: NotoSerifDisplay, serif;
				font-size: 3.2rem;
				font-style: italic;
				text-transform: lowercase;
				letter-spacing: -0.1383rem;
			}
		}
	}

	&__number {
		@include textCrop;

		width: 3rem;
		font-size: 0.8rem;
		line-height: 150%;
		letter-spacing: -0.04rem;
	}

	&__text {
		@include textCrop(1, 0.1px, -4px);

		font-size: 2.5rem;
		font-weight: 300;
		line-height: 110%;
		letter-spacing: -0.1864rem;
	}
}
</style>
