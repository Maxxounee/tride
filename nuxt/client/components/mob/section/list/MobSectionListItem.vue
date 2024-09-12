<template>
	<div
		class="MobSectionListItem"
		:class="{ expanded, borderBottom }"
		@click="toggle"
	>
		<header class="MobSectionListItem__top">
			<p
				class="MobSectionListItem__title"
				v-html="title"
			></p>
		</header>
		<div class="MobSectionListItem__bottom">
			<NuxtImg
				:src="image"
				class="MobSectionListItem__image"
				loading="eager"
			/>
			<ul
				class="MobSectionListItem__list"
				v-if="list"
			>
				<li
					class="MobSectionListItem__list-item"
					v-nbsp
					v-for="(item, index) in list"
					:key="index"
					v-html="item"
				></li>
			</ul>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
defineProps<{ title: string; image: string; list?: string[]; borderBottom?: boolean }>();
const expanded = ref(false);
const el = useCurrentElement();

async function toggle() {
	const state = useFlip.getState(el.value);
	expanded.value = !expanded.value;
	await nextTick();
	useFlip.from(state, {ease: 'power4.inOut'});
}

onMounted(() => {

})
</script>

<style lang="scss">

.MobSectionListItem {
	--border: 1px solid rgb(227 137 89);

	overflow: hidden;
	color: var(--color-white);
	border-top: var(--border);

	&.borderBottom {
		border-bottom: var(--border);
	}

	&__top {
		height: 7.5rem;
		padding-top: 0.8rem;
	}

	&__title {
		@include font(2.4rem, 400, 1em, -0.04em);
	}

	&__bottom {
		height: 0;
	}

	&__image {
		height: 23.4rem;
	}

	&__list {
		@include flexColumn;

		gap: 1rem;
		margin-top: 3rem;
		padding-bottom: 3.6rem;
		padding-left: 1.4rem;
	}

	&__list-item {
		@include font(1.6rem, 400);
	}

	&.expanded {
		.MobSectionListItem__bottom {
			height: unset;
		}
	}
}
</style>
