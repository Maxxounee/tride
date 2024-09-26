<template>
	<div class="app">
		<NuxtLayout :name="layout">
			<NuxtPage />
		</NuxtLayout>

	</div>
</template>

<script
	setup
	lang="ts"
>
import type {LayoutKey} from '#build/types/layouts';

const nuxtApp = useNuxtApp();
const router = useRouter();
const {isMobileOrTablet} = useDevice();

let layout: LayoutKey = 'error';


</script>
