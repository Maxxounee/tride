<template>
	<section class="MobLocationPark">
		<MobBigTitle>
			<MobBigTitleRow :style="{ marginTop: '3rem' }">
				<MobBigTitleTextAccent :style="{ translate: '5rem' }">
					национальный
				</MobBigTitleTextAccent>
			</MobBigTitleRow>
			<MobBigTitleRowWrapper :style="{ marginTop: '1.3rem' }">
				<MobBigTitleImg
					src="/images/location/big-title-2/1.png"
					width="6rem"
					height="8rem"
					:style="{ marginRight: '1rem' }"
				/>
				<template #col2>
					<MobBigTitleRow>
						<MobBigTitleText :style="{ translate: '5rem' }">
							Парк
						</MobBigTitleText>
					</MobBigTitleRow>
					<MobBigTitleRow>
						<MobBigTitleText :style="{ translate: '7rem' }">
							Рядом
						</MobBigTitleText>
					</MobBigTitleRow>
				</template>
			</MobBigTitleRowWrapper>
			<MobBigTitleRow :style="{ marginTop: '1.3rem' }">
				<MobBigTitleText :style="{ translate: '-5rem' }">
					с курортом –
				</MobBigTitleText>
			</MobBigTitleRow>
			<MobBigTitleRow :style="{ marginTop: '1.3rem' }">
				<MobBigTitleTextAccent :style="{ translate: '-5rem' }">
					больше,
				</MobBigTitleTextAccent>
				<MobBigTitleText :style="{ translate: '5rem' }">
					ЧЕМ
				</MobBigTitleText>
			</MobBigTitleRow>
			<MobBigTitleRow
				:style="{ marginTop: '1.3rem' }"
				justify="flex-end"
			>
				<MobBigTitleText :style="{ translate: '-5rem' }">
					Место
				</MobBigTitleText>
				<MobBigTitleImg
					src="/images/location/big-title-2/2.png"
					width="7.3rem"
					height="3.7rem"
					:style="{ marginLeft: '1rem' }"
				/>
			</MobBigTitleRow>
			<MobBigTitleRow
				:style="{ marginTop: '1.3rem' }"
				justify="flex-end"
			>
				<MobBigTitleTextAccent :style="{ translate: '-8rem' }">
					отдыха
				</MobBigTitleTextAccent>
			</MobBigTitleRow>
		</MobBigTitle>

		<ClientOnly>
			<MobBlockMustache class="MobLocationPark__mustache">
				Заповедная <br>
				зона с уникальной <br>
				реликтовой флорой
			</MobBlockMustache>
		</ClientOnly>

		<p class="MobLocationPark__text MobLocationPark__text_n0">
			Помимо парка рядом с курортом есть и другие <br>
			удивительные по своей красоте места.
		</p>

		<ScrollGallery :space-between="35">
			<ScrollGalleryTextSlide
				v-for="(item, index) in galleryItems"
				:key="index"
				v-bind="item"
				width="40vw"
			/>
		</ScrollGallery>
	</section>
</template>

<script
	lang="ts"
	setup
>
const scroller = inject<HTMLElement>('pageScroller');
const galleryItems = [
	{ src: '/images/location/park/park-0.png', text: `Горные реки и водопады` },
	{ src: '/images/location/park/park-1.png', text: `Чайные плантации` },
	{ src: '/images/location/park/park-2.png', text: `Исторические памятники` },
];
onMounted(() => {
	showFromOpacity('.MobLocationPark__text-1');
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
.MobLocationPark {
	@include flexColumn(center);

	background-color: var(--color-background);

	.MobBigTitle {
		position: relative;
	}

	&__mustache {
		margin-top: 4.4rem;
	}

	&__text {
		&_n0 {
			@include fontItalic(1.6rem, 300, 1.4em);

			margin-top: 4.4rem;
			color: var(--color-text);
			text-align: center;
		}
	}

	&__images {
		@include flex;

		align-self: stretch;
		margin-top: 30rem;
	}

	.ScrollGallery {
		margin-top: 6.4rem;
		padding: 0 var(--ruler-m-l);
	}
}
</style>
