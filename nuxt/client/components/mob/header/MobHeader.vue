<template>
	<div
		class="MobHeader"
		:class="{ MobHeader_opened: isHeaderSmall }"
	>
		<div class="MobHeader__inner">
			<div class="MobHeader__actions">
				<button
					v-if="closeButtonActive"
					class="MobHeader__close"
					@click="headerCloseClickHandler"
				>
					назад
				</button>
				<NuxtLink
					v-else
					class="MobHeader__button"
					:to="route.name === 'plans' ? '/search' : '/plans'"
				>
					<NuxtIcon name="ui/key" />
				</NuxtLink>
				<button class="MobHeader__button">
					<NuxtIcon name="ui/phone" />
				</button>
			</div>

			<div class="MobHeader__menu-button">
				<HeaderMenuButton />
			</div>
		</div>

		<MobHeaderLogoPlain />

		<MobHeaderLogoCard />
	</div>
</template>

<script lang="ts" setup>
const menuStore = useMenuStore();

const isHeaderSmall = computed(() => isForcedSmall.value || menuStore.isMenuOpened);

const isForcedSmall = ref(false);
const { $bus } = useNuxtApp();

$bus.$on('mobHeaderForce', setForcedState);

function setForcedState(value: boolean) {
	isForcedSmall.value = value;
}

const route = useRoute();

watch(() => route.name, () => {
	// deactivateHeaderClose();
});

onBeforeMount(() => {
	setListeners();
});

const closeButtonCallbackQueue = ref([]);
const closeButtonActive = ref(false);

function setListeners() {
	$bus.$on('activateHeaderClose', activateHeaderClose);
	$bus.$on('deactivateHeaderClose', deactivateHeaderClose);
}

const closeButtonCallback = ref();

function activateHeaderClose(arg: { callback: () => void; keepPreviousCallback?: boolean } | Function): void {
	if (typeof arg === 'object') {
		if (arg.keepPreviousCallback) {
			closeButtonCallbackQueue.value.push(closeButtonCallback.value);
		}
	}

	closeButtonCallback.value = typeof arg === 'function' ? arg : arg.callback;
	closeButtonActive.value = true;
}

function deactivateHeaderClose() {
	closeButtonActive.value = false;
}

function headerCloseClickHandler() {
	closeButtonCallback.value && closeButtonCallback.value();
	if (closeButtonCallbackQueue.value.length) {
		closeButtonCallback.value = closeButtonCallbackQueue.value.pop();
	}
}
</script>

<style lang="scss">
.MobHeader {
	position: fixed;
	z-index: 10;
	top: 0;
	left: 0;

	width: 100%;
	padding: 2rem var(--ruler-m-r) 1rem var(--ruler-m-l);

	&__inner {
		@include flex(center, space);
		@include container100;
	}

	&__actions {
		@include flex(center);

		gap: 0.5rem;
	}

	&__button {
		@include flex(center, center);

		width: 4rem;
		height: 4rem;

		font-size: 2rem;
		color: var(--color-sun);

		background-color: var(--color-white);
		border-radius: 100%;
	}

	&__close {
		@include flex(center, center);
		@include font(1.4rem, 500, 1em, -0.056rem);

		height: 4rem;
		padding: 0 1rem;
		color: var(--color-sea);
	}

	.MobHeaderLogoCard,
	.MobHeaderLogoPlain {
		position: absolute;
		top: 0;
		left: 50%;
		transform: translateX(-50%);

		transition: translate 0.5s;
	}

	&_opened {
		background-color: var(--color-background);

		.MobHeaderLogoCard {
			translate: 0 -100%;
		}
	}
}
</style>
