<template>
	<div class="HeaderLeftButtons">
		<ButtonBase
			class="HeaderLeftButtons__close"
			ref="closeButton"
			:class="{ hidden: !closeButtonActive }"
			@click="headerCloseClickHandler"
		>
			назад
		</ButtonBase>
		<div
			class="container"
			ref="buttonContainer"
		>
			<ButtonBase
				:to="plansButtonValues.path"
			>
				{{ plansButtonValues.text }}
			</ButtonBase>
			<div class="container__inner">
				<HeaderCircleButton
					class="n0"
					icon="ui/play"
					:to="{ query: { video: 'project' }}"
				/>
				<HeaderCircleButton
					class="n1"
					icon="ui/360"
					to="/tour"
				/>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
import HeaderCircleButton from "~/components/header/HeaderCircleButton.vue";

const {$bus} = useNuxtApp();

const router = useRouter();
const closeButton = ref();
const buttonContainer = ref();
const closeButtonCallbackQueue = ref([]);

const closeButtonActive = ref(false);

const plansButtonValues = computed(() => {
	let text = 'Выбрать номер';
	let path = '/plans';

	const currentPath = router.currentRoute.value.path;

	if (currentPath === '/search') {
		text = 'Визуальный выбор';
	} else if (currentPath === '/plans') {
		text = 'По параметрам'
		path = '/search';
	}
	return {text, path};
})

function setListeners() {
	$bus.$on('activateHeaderClose', activateHeaderClose);
	$bus.$on('deactivateHeaderClose', () => {
		changeCloseButtonPositionState(false)
	});
}

const closeButtonCallback = ref();

async function changeCloseButtonPositionState(activate: boolean) {
	console.log('deactivate')
	const closeButtonState = useFlip.getState(unrefElement(closeButton));
	const containerButtonState = useFlip.getState(unrefElement(buttonContainer));
	const opt = {duration: 0.8, ease: "power4.inOut"}

	closeButtonActive.value = activate;

	await nextTick();

	useFlip.from(closeButtonState, opt);
	useFlip.from(containerButtonState, opt);
}

function activateHeaderClose(arg: { callback: () => void, keepPreviousCallback?: boolean } | Function): void {
	console.log('activate')
	if (typeof arg === 'object') {
		if (arg.keepPreviousCallback) {
			closeButtonCallbackQueue.value.push(closeButtonCallback.value);
		}
	}

	closeButtonCallback.value = typeof arg === 'function' ? arg : arg.callback;

	changeCloseButtonPositionState(true);
}

function headerCloseClickHandler() {
	closeButtonCallback.value && closeButtonCallback.value();
	if (closeButtonCallbackQueue.value.length) {
		closeButtonCallback.value = closeButtonCallbackQueue.value.pop();
	} else {
		changeCloseButtonPositionState(false);
	}
}

/** 🔐🔐🔐 END CLOSE BUTTON */
onBeforeMount(() => {
	setListeners();
})
</script>

<style lang="scss">

.HeaderLeftButtons {
	@include flex;


	&__close {
		margin-right: 3.4rem;

		&.hidden {
			pointer-events: none;
			position: absolute;
			left: -20rem;
		}
	}

	.container {
		@include flex;

		gap: 5rem;

		&__inner {
			@include flex;

			gap: 1.5rem;

			.HeaderCircleButton {
				&.n0 {
					padding-left: 0.4rem;
				}

				&.n1 {
					padding-bottom: 0.2rem;
					padding-left: 0.2rem;
				}
			}
		}
	}
}
</style>
