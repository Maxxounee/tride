<template>
	<div class="BlockSocials">
		<NuxtLink
			v-for="link in mainStore.socials"
			:key="link.id"
			class="BlockSocials__item"
			:class="`BlockSocials__item_${link.id}`"
			:to="link.href"
			:external="true"
			target="_blank"
		>
			<NuxtIcon
				filled
				:name="`socials/${link.id}`"
			/>
		</NuxtLink>
	</div>
</template>

<script
	lang="ts"
	setup
>
const mainStore = useMainStore();
</script>

<style lang="scss">
.BlockSocials {
	@include flex;

	gap: 2.3rem;

	&__item {
		font-size: 4rem;
	}
}
</style>
