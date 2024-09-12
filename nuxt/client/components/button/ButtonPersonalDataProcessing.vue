<template>
	<a
		href="#"
		target="_blank"
		class="ButtonPersonalDataProcessing"
		:class="{ underline }"
	>
		<slot>
			персональных данных
		</slot>
	</a>
</template>

<script
	lang="ts"
	setup
>
type Props = {
	underline?: boolean;
}
defineProps<Props>()
onMounted(() => {

})
</script>

<style lang="scss">

.ButtonPersonalDataProcessing {
	&.underline {
		text-decoration: underline;
		text-underline-offset: 0.1em;

		&:hover {
			text-decoration: none;
		}
	}
}
</style>
