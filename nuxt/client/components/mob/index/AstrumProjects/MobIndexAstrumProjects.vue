<template>
	<div class="MobIndexAstrumProjects">
		<MobBigTitle>
			<MobBigTitleRow
				left="5rem"

			>
				<MobBigTitleTextAccent :style="{ translate: '-10rem'}">
					проекты
				</MobBigTitleTextAccent>
			</MobBigTitleRow>
			<MobBigTitleRow
				:style="{ marginTop: '1.3rem'}"
				left="-4rem"
			>
				<MobBigTitleText :style="{ translate: '10rem' }">
					astrum
				</MobBigTitleText>
			</MobBigTitleRow>
			<MobBigTitleRow
				left="5rem"
				:style="{ marginTop: '1.3rem'}"
			>
				<MobBigTitleText :style="{ translate: '-10rem'}">
					group
				</MobBigTitleText>
			</MobBigTitleRow>

		</MobBigTitle>
		<div
			class="MobIndexAstrumProjects__cards"
			ref="cardsWrapper"
		>
			<MobIndexAstrumProjectsCard
				v-for="(card, index) in (expanded ? allProjectsInOne : allProjectsInOne.slice(0, 3))"
				:key="index"
				v-bind="card"
			/>
			<button
				class="MobIndexAstrumProjects__cards-expand"
				@click="expanded = true"
			>
				Показать
				<mark>все проекты</mark>
			</button>
		</div>
		<FooterScrollToStartButton />
	</div>
</template>

<script
	lang="ts"
	setup
>
import {allProjectsInOne} from "~/assets/script/configs/index.js";

const expanded = ref(false);
const cardsWrapper = ref();

async function expandCardsAnimation() {
	const state = useFlip.getState(cardsWrapper.value);
	await nextTick();
	useFlip.from(state);
}

watch(() => expanded.value, expandCardsAnimation)

onMounted(() => {

})
</script>

<style lang="scss">

.MobIndexAstrumProjects {
	@include flexColumn(center);

	padding: 0 var(--ruler-m-l);
	padding-top: 8rem;

	&__cards {
		@include flexColumn;

		gap: 2.4rem;
		margin-top: 5rem;
	}

	&__cards-expand {
		@include font(1.8rem, 400);

		color: var(--color-sea);

		mark {
			color: var(--color-sun);
		}
	}
}
</style>
