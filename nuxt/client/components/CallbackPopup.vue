<template>
	<div
		class="CallbackPopup"
		:class="{ active: callbackStore.active }"
	>
		<div class="CallbackPopup__inner">
			<p class="CallbackPopup__title">
				Оставить<br>
				заявку
			</p>

			<FormerWrapper ref="former">
				<FormerInput
					v-for="(field, index) in fields"
					:key="index"
					v-bind="field"
				/>
			</FormerWrapper>
			<div class="CallbackPopup__bottom">
				<div class="CallbackPopup__actions">
					<UIStandardButton
						color="var(--color-sea)"
						background="var(--color-white)"
						hover-color="var(--color-sea)"
						hover-background="var(--color-white)"
						@click="callbackStore.hide()"
					>
						Закрыть
					</UIStandardButton>
					<UIStandardButton
						color="var(--color-white)"
						background="rgb(255 255 255 / 30%)"
						hover-color="var(--color-sea)"
						hover-background="var(--color-white)"
						@click="former.send()"
					>
						ОТПРАВИТЬ
					</UIStandardButton>
				</div>
				<p class="CallbackPopup__agree">
					Нажимая кнопку «отправить», вы даете свое согласие <br>на обработку
					<ButtonPersonalDataProcessing underline />
					.
				</p>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const callbackStore = useCallbackStore();
const former = ref<any>();

type TFields = {
	name: string;
	placeholder: string;
	mask?: string;
	inputType: string;
	initialValue?: string;
	required?: boolean;
};
const fields: TFields[] = [
	{
		name: 'name',
		placeholder: 'Ваше имя',
		inputType: 'text',
	},
	{
		name: 'phone',
		placeholder: '+7',
		initialValue: '+7',
		inputType: 'tel',
		mask: 'p7',
	},
	{
		name: 'email',
		placeholder: 'E-mail',
		inputType: 'email',
	},
];
</script>

<style lang="scss">
.CallbackPopup {
	--duration: 0.5s;
	--easing: var(--easeInOutQuart);

	@include div100;

	z-index: 69;
	translate: 0 -100%;

	color: var(--color-white);

	background: var(--color-sea);

	transition-timing-function: var(--easing);
	transition-duration: var(--duration);
	transition-property: translate;

	&__inner {
		@include div100;
		@include flexColumn;

		translate: 0 -50%;

		padding: 9rem 0 5.4rem;

		opacity: 0;
		filter: blur(24px);

		transition-timing-function: var(--easing);
		transition-duration: var(--duration);
		transition-property: opacity, filter, translate;

	}

	&__title {
		@include font(6rem, 400, 1em, -0.05em);

		color: var(--color-white);
		text-align: center;
	}

	.FormerWrapper {
		flex: 1 1;
		margin-top: 15.4rem;

		&__form {
			@include flexColumn(center, space);
			@include font(3rem, 400, 1em, -0.05em);

			width: 100%;
			height: 100%;
			color: var(--color-white);
		}

		.FormerInput {
			width: 70rem;
			padding-bottom: 2.2rem;

			text-align: center;

			opacity: 0.3;
			border-bottom: 1px solid rgb(255 255 255 / 30%);

			&:not(:placeholder-shown) {
				opacity: 1;
			}
		}
	}

	&__bottom {
		@include flexColumn(center, center);
	}

	&__actions {
		@include flex(center, center);

		gap: 1.5rem;
		width: 100%;
		margin-top: 17rem;
	}

	&__agree {
		@include font(1.6rem, 400, 1.1em, -0.03em);

		margin-top: 4.2rem;
		color: rgb(255 255 255 / 30%);
		text-align: center
	}

	&.active {
		translate: none;

		.CallbackPopup__inner {
			translate: none;
			opacity: 1;
			filter: blur(0);
			transition-delay: 0.1s;
		}
	}
}

.layout-mobile .CallbackPopup {
	height: 100vh;
	height: 100dvh;

	&__inner {
		padding: 3.7rem var(--ruler-m-r);
	}

	&__title {
		font-size: 3rem;
		letter-spacing: -0.05em;
	}

	.FormerWrapper {
		flex-grow: 0;
		margin-top: auto;
		margin-bottom: auto;

		&__form {
			@include font(2.2rem, 400, 1em, -0.03em);

			gap: 6rem;
			justify-content: start;
		}

		.FormerInput {
			width: 100%;
			padding-bottom: 2.2rem;

			text-align: center;

			opacity: 0.3;
			border-bottom: 1px solid rgb(255 255 255 / 30%);

			&:not(:placeholder-shown) {
				opacity: 1;
			}
		}
	}

	&__actions {
		gap: 1rem;
		margin-top: 0;

		.UIStandardButton {
			width: 14rem;
		}
	}

	&__agree {
		margin-top: 2.8rem;
		font-size: 1.2rem;

		br {
			display: none;
		}
	}

	.FormerWrapper__result {
		@include font(1.8rem, 400);
		@include center;

		max-width: 20rem;
		text-align: center;
	}
}
</style>
