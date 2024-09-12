<template>
	<div class="MobBigTitleImg">
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
	width: '12.9rem',
	height: '9.4rem',
});

const ipxImg = img(props.src, {format: 'webp', quality: 80});

</script>

<style lang="scss">
.MobBigTitleImg {
	position: relative;
	overflow: hidden;
	width: v-bind(width);
	height: v-bind(height);

	&__img {
		@include div100;
	}
}
</style>
