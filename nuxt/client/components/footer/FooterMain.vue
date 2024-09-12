<template>
	<footer class="FooterMain">
		<main class="FooterMain__top">
			<NuxtLink
				class="FooterMain__logo"
				to="/"
				@click.native="emitLogoClick"
			>
				<img src="/images/other/logo.png">
			</NuxtLink>
			<div class="FooterMain__blocks">
				<FooterBlock
					title="Отель"
					:items="menuStore.mainLinks"
				/>
				<FooterBlock
					title="Информация"
					:items="menuStore.sideLinks"
				/>
				<FooterBlock title="Офис продаж">
					<p
						class="FooterBlock__item"
						v-html="mainStore.address"
					/>
					<a
						v-format-phone="mainStore.phone"
						class="FooterBlock__item"
						v-html="mainStore.phone"
					/>
					<a
						v-format-email="mainStore.email"
						class="FooterBlock__item"
						v-html="mainStore.email"
					/>
				</FooterBlock>
				<FooterBlock
					title="Соцсети"
				>
					<BlockSocials />
				</FooterBlock>
			</div>
		</main>
		<div class="FooterMain__bottom">
			<div class="FooterMain__bottom-container">
				<a
					href="https://astrumgroup.ru/maintenance.html"
					target="_blank"
				>
					Девелопер проекта ASTRUM GROUP ©
				</a>
				<a
					href="https://xn--d1aqf.xn--p1ai/"
					target="_blank"
				>
					ДОМ.РФ
				</a>
			</div>
			<p>
				{{ new Date().getFullYear() }}
			</p>
		</div>
	</footer>
</template>

<script
	lang="ts"
	setup
>
const {$bus} = useNuxtApp();
const menuStore = useMenuStore();
const mainStore = useMainStore();

function emitLogoClick() {
	$bus.$emit('logoLinkClick');
}

onMounted(() => {

});
</script>

<style lang="scss">
.FooterMain {
	@include flexColumn;

	width: 100%;
	padding: 9rem var(--ruler-d-l) 4.6rem;
	background: var(--color-white);

	&__top {
		@include flex(null, space);

		width: 100%;
		padding-bottom: 9.2rem;
	}

	&__bottom {
		@include flex(null, space);

		width: 100%;
		padding-top: 2.6rem;
		border-top: 1px solid var(--color-sun);

		a {
			@include font(2rem, 400, 1em, -0.03em);

			color: var(--color-sea);

			&:hover {
				text-decoration: underline;
			}
		}
	}

	&__bottom-container {
		@include flex;

		gap: 8rem;
	}

	&__logo {
		position: relative;
		display: block;
		flex: 1 1;
		color: var(--color-sea);

		img {
			position: absolute;
			width: unset;
			object-fit: contain;
		}
	}

	&__blocks {
		@include flex;

		gap: 13rem;
	}
}
</style>
