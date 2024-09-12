<template>
	<section class="PrivateBeach">
		<BlockMustache>
			Больше всего <br>на частном пляже
		</BlockMustache>

		<UtilsAppearanceDisappearanceBlock>
			<p
				ref="text1"
				class="PrivateBeach__text"
				:class="{ active: text1Visible }"
				v-nbsp
			>
				На территории отеля находится частный пляж, протяженностью целых 800 м — и даже больше! Там гостей ждут
				развлечения и места отдыха на самый взыскательный вкус.
			</p>
		</UtilsAppearanceDisappearanceBlock>

		<ScrollGallery :space-between="45">
			<ScrollGalleryTextSlide
				v-for="(item, index) in galleryItems"
				:key="index"
				v-bind="item"
			/>
		</ScrollGallery>
	</section>
</template>

<script
	lang="ts"
	setup
>
import ScrollGallery from "~/components/scrollGallery/ScrollGallery.vue";
import ScrollGalleryTextSlide from "~/components/scrollGallery/ScrollGalleryTextSlide.vue";

const el = useCurrentElement<HTMLElement>();
const gallery = ref();
const scroller = inject<HTMLElement>('pageScroller');


const galleryItems = ref([
	{
		src: '/images/index/beach/00.png',
		text: 'Зоны отдыха <br />с лежаками',
		width: '17vw',
	},
	{
		src: '/images/index/beach/01.jpg',
		text: 'Снэк-бары',
		width: '21vw',
	},
	{
		src: '/images/index/beach/02.png',
		text: 'Площадка <br />для пляжного <br />волейбола',
		width: '17vw',
	},
	{
		src: '/images/index/beach/03.png',
		text: 'Детская игровая <br />площадка',
		width: '23vw',
	},
	{
		src: '/images/index/beach/04.png',
		text: 'Площадка <br />для воркаута',
		width: '21vw',
	},
]);

const text1 = ref();
const text1Visible = ref(false);
const {stop} = useIntersectionObserver(
	text1,
	([{isIntersecting}]) => {
		if (isIntersecting) {
			stop();
			text1Visible.value = true;
		}
	},
	{
		rootMargin: '0px 0px -45% 0px',
	},
);

function animateGalleryItemsShow() {
	const galleryItems = useGsap.utils.toArray(el.value.querySelectorAll('.gallery-item'));
	useGsap.from(galleryItems, {
		stagger: 0.2,
		ease: 'power2.out',
		duration: 0.8,
		x: (index) => `${index * 10 + 100}vw`,
		scrollTrigger: {
			scroller,
			scrub: false,
			toggleActions: 'play null null reverse',
			trigger: unrefElement(gallery),
		}
	})
}

onMounted(() => {
	animateGalleryItemsShow();
})
</script>

<style lang="scss">

.PrivateBeach {
	@include flexColumn(center);

	padding-top: 18rem;
	background: linear-gradient(0deg, rgb(227 204 183 / 20%) 0%, rgb(227 204 183 / 20%) 100%), #FFF;


	&__text {
		@include fontItalic(3rem, 300, 1.4em);

		max-width: 95rem;
		margin-top: 15rem;

		color: var(--color-text);
		text-align: center;

		opacity: 0;

		transition: opacity 0.3s;

		&.active {
			opacity: 1;
		}
	}
	
	.SwiperGallery {
		position: relative;
		margin-top: 26rem;
		padding-right: var(--ruler-d-r);
		padding-left: var(--ruler-d-l);
	}
}
</style>
