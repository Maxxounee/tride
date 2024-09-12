<template>
	<section class="LocationMapSection">
		<BigTitle
			exit-trigger-start="top top-=24%"
			exit-trigger-end="bottom top-=24%"
			inverse-exit
		>
			<BigTitleRow>
				<BigTitleText :style="{ translate: '-10rem' }">
					С ОДНОЙ&nbsp;
				</BigTitleText>
				<BigTitleTextAccent :style="{ translate: '10rem' }">
					стороны –
				</BigTitleTextAccent>
			</BigTitleRow>

			<BigTitleRowWrapper :style="{ marginTop: '4rem' }">
				<BigTitleRow left="39rem">
					<BigTitleText :style="{ translate: '-30rem' }">
						ласковое
					</BigTitleText>
				</BigTitleRow>
				<BigTitleRow left="9.6rem">
					<BigTitleText :style="{ translate: '-15rem' }">
						море,&nbsp;
					</BigTitleText>
					<BigTitleTextAccent :style="{ translate: '-10rem' }">
						с другой –
					</BigTitleTextAccent>
				</BigTitleRow>

				<template #col2>
					<BigTitleImg
						src="/images/location/map/0.png"
						width="30.7rem"
						height="22.4rem"
						:style="{ marginLeft: '8rem' }"
					/>
				</template>
			</BigTitleRowWrapper>

			<BigTitleRowWrapper :style="{ marginLeft: '25.5rem', marginTop: '5.4rem' }">
				<BigTitleImg
					src="/images/location/map/1.png"
					width="30.7rem"
					height="22.4rem"
					:style="{ marginRight: '5.7rem' }"
				/>
				<template #col2>
					<BigTitleRow>
						<BigTitleText :style="{ translate: '10rem' }">
							ПРИРОДНЫЕ
						</BigTitleText>
					</BigTitleRow>
					<BigTitleRow>
						<BigTitleText :style="{ translate: '15rem' }">
							КРАСОТЫ
						</BigTitleText>
					</BigTitleRow>
				</template>
			</BigTitleRowWrapper>
		</BigTitle>
		<UtilsAppearanceDisappearanceBlock>
			<p
				class="LocationMapSection__text-1 txt-h3"
				v-html="locationMap.title"
			/>
		</UtilsAppearanceDisappearanceBlock>
		<UtilsAppearanceDisappearanceBlock>
			<div
				class="LocationMapSection__list"
			>
				<div
					class="LocationMapSection__list-item"
					v-for="(item, index) in locationMap.items"
					:key="index"
				>
					<mark v-html="item.mark"></mark>
					<span v-html="item.text"></span>
				</div>
			</div>
		</UtilsAppearanceDisappearanceBlock>

		<div class="LocationMapSection__map">
			<LocationMap />
		</div>
	</section>
</template>

<script
	lang="ts"
	setup
>
import {locationMap} from "~/assets/script/configs/location.js";

const scroller = inject<HTMLElement>('pageScroller');

onMounted(() => {
	showFromOpacity('.LocationMapSection__text-1');
	showFromOpacity('.LocationMapSection__distance-list');
});

function showFromOpacity(selector: gsap.DOMTarget) {
	useGsap.from(selector, {
		opacity: 0,
		scrollTrigger: {
			scroller,
			trigger: selector,
			scrub: false,
			start: () => 'center bottom-=25%',
		},
	});
}
</script>

<style lang="scss">
.LocationMapSection {
	@include flexColumn(center);

	position: relative;
	padding-top: 50vh;


	&__text-1 {
		margin-top: 18rem;
		text-align: center;
	}

	&__list {
		@include flexColumn;

		gap: 0.8rem;
		margin-top: 6rem;
	}

	&__list-item {
		@include font(3rem, 400);

		color: var(--color-sea);
		text-align: center;

		mark {
			color: var(--color-sun);
		}
	}

	&__map {
		// position: relative;
		// align-self: stretch;
		// height: 67rem;
		// margin-top: 8rem;
	}
}
</style>
