<template>
	<div class="BigTitleImg">
		<img :src="ipxImg" />
	</div>
</template>

<script
	lang="ts"
	setup
>
const img = useImage();

const props = withDefaults(defineProps<{
	width?: string;
	height?: string;
	src: string;
}>(), {
	width: '21.6rem',
	height: '9.7rem',
});

const ipxImg = img(props.src, {format: 'webp', quality: 80});

</script>

<style lang="scss">
.BigTitleImg {
	position: relative;
	overflow: hidden;
	width: v-bind(width);
	height: v-bind(height);

	&__img {
		@include div100;
	}
}
</style>
