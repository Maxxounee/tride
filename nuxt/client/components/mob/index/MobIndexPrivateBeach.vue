<template>
	<section class="MobIndexPrivateBeach">
		<MobBlockMustache>
			Больше всего <br>на частном пляже
		</MobBlockMustache>

		<UtilsAppearanceDisappearanceBlock>
			<p
				ref="text1"
				class="MobIndexPrivateBeach__text"
				:class="{ active: text1Visible }"
				v-nbsp
			>
				На территории отеля находится частный пляж, протяженностью целых 800 м — и даже больше! Там гостей ждут
				развлечения и места отдыха на самый взыскательный вкус.
			</p>
		</UtilsAppearanceDisappearanceBlock>
		<ScrollGallery :space-between="35">
			<ScrollGalleryTextSlide
				v-for="(item, index) in galleryItems"
				:key="index"
				v-bind="item"
				width="70vw"
			/>
		</ScrollGallery>
	</section>
</template>

<script
	lang="ts"
	setup
>
import MobBlockMustache from "~/components/mob/block/MobBlockMustache.vue";

const el = useCurrentElement<HTMLElement>();
import {privateBeach} from "~/assets/script/configs/index.js";
import ScrollGallery from "~/components/scrollGallery/ScrollGallery.vue";
import ScrollGalleryTextSlide from "~/components/scrollGallery/ScrollGalleryTextSlide.vue";

const scroller = inject<HTMLElement>('pageScroller');

const gallery = ref();

const {galleryItems} = privateBeach;

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

.MobIndexPrivateBeach {
	@include flexColumn(center);

	padding-top: 8rem;
	background: linear-gradient(0deg, rgb(227 204 183 / 20%) 0%, rgb(227 204 183 / 20%) 100%), #FFF;


	&__text {
		@include fontItalic(1.6rem, 300, 1.4em);

		max-width: 80vw;
		margin-top: 4.4rem;

		color: var(--color-text);
		text-align: center;

		opacity: 0;

		transition: opacity 0.3s;

		&.active {
			opacity: 1;
		}
	}

	.ScrollGallery {
		margin-top: 6.4rem;
		padding-right: var(--ruler-m-r);
		padding-left: var(--ruler-m-l);
	}
}
</style>
