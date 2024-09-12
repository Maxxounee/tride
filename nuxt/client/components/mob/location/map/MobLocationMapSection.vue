<template>
	<div class="MobLocationMapSection">
		<h3
			class="MobLocationMapSection__title"
			v-html="locationMap.titleWoBr"
		></h3>
		<div class="MobLocationMapSection__container">
			<div
				class="MobLocationMapSection__item"
				v-for="(item, index) in locationMap.items"
				:key="index"
			>
				<mark v-html="item.mark"></mark>
				<span
					v-html="item.text"
					v-nbsp
				></span>
			</div>
		</div>
		<MobUtilsHorizontalScrollContainer
			class="MobLocationMapSection__map"
			welcome-scroll
		>
			<ResizableBlock
				class="MobLocationMapSection__resizable"
				set-only-aspect
				position="relative"
				:ratio="1920 / 1133"
			>
				<MobLocationMap />
			</ResizableBlock>
		</MobUtilsHorizontalScrollContainer>
	</div>
</template>

<script
	lang="ts"
	setup
>

import ResizableBlock from "~/components/utils/ResizableBlock.vue";
// const items =
import {locationMap} from "~/assets/script/configs/location.js";

onMounted(() => {

})
</script>

<style lang="scss">

.MobLocationMapSection {
	text-align: center;

	&__title {
		@include font(2.4rem, 400);

		color: var(--color-sea);
	}

	&__container {
		@include flexColumn(center);

		gap: 2.2rem;
		margin-top: 4.4rem;
	}

	&__item {
		@include flexColumn(center);

		gap: 0.2rem;

		mark {
			@include font(2.4rem, 400);

			color: var(--color-sun);
		}

		span {
			@include font(1.6rem, 400, 1.1em, -0.05em);

			width: 25rem;
			color: var(--color-sea);
		}
	}

	&__map {
		margin-top: 3.6rem;
	}

	&__resizable {
		height: 50rem;
	}

}
</style>
