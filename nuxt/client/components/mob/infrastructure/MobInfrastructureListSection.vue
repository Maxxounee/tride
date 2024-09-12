<template>
	<div class="MobInfrastructureListSection">
		<MobSectionListWrapper :items="items" />
	</div>
</template>

<script
	lang="ts"
	setup
>
import MobSectionListWrapper from "~/components/mob/section/list/MobSectionListWrapper.vue";

import {items} from '@/configs/pages/infrastructure.ts'

onMounted(() => {

})
</script>

<style lang="scss">

.MobInfrastructureListSection {
	padding: 3.9rem var(--ruler-m-l);
	background: var(--color-sun);
}
</style>
