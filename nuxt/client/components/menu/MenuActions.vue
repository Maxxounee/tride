<template>
	<div class="MenuActions">
		<!-- <NuxtLink -->
		<!--	to="/" -->
		<!--	class="MenuActions__item MenuActions__item_favorites" -->
		<!-- &gt; -->
		<!--	<div class="MenuActions__icon"> -->
		<!--		<Icon -->
		<!--			stroke-width="0" -->
		<!--			name="common:heart" -->
		<!--		/> -->
		<!--	</div> -->
		<!--	<p class="MenuActions__text txt-h7"> -->
		<!--		Избранное -->
		<!--	</p> -->
		<!-- </NuxtLink> -->
		<a
			href="/docs/alean-presentation.pdf"
			target="_blank"
			class="MenuActions__item MenuActions__item_presentation"
		>
			<div class="MenuActions__icon">
				<NuxtIcon
					filled
					name="common/book"
				/>
			</div>
			<p class="MenuActions__text txt-h7">
				Скачать презентацию
			</p>
		</a>
		<div
			class="MenuActions__item MenuActions__item_excursion"
			@click="callbackStore.show()"
		>
			<div class="MenuActions__icon">
				<NuxtIcon
					filled
					name="common/pencil"
				/>
			</div>
			<p class="MenuActions__text txt-h7">
				Записаться на экскурсию
			</p>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const callbackStore = useCallbackStore();
</script>

<style lang="scss">
.MenuActions {
	@include flexColumn;

	gap: 1.2rem;

	&__item {
		cursor: pointer;
		user-select: none;

		display: grid;
		grid-template-columns: max-content max-content;
		gap: 3rem;
		align-items: center;

		&_favorites {
			.MenuActions__icon {
				font-size: 2.2rem;
			}
		}

		&_presentation {
			.MenuActions__icon {
				font-size: 2rem;
			}
		}

		&_excursion {
			.MenuActions__icon {
				font-size: 2.3rem;
			}
		}
	}

	&__icon {
		@include flex(center, center);

		width: 3rem;
		color: var(--color-sun);
	}
}

.layout-mobile .MenuActions {
	gap: 1.7rem;

	&__item {
		gap: 2.7rem;
	}

	&__icon {
		width: 2.7rem;
	}

	&__text {
		@include font(1.8rem, 400, 1.5em, -0.09rem);
	}
}
</style>
