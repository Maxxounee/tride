<template>
	<MobSimpleSectionWrapper
		class="MobInfrastructureSectionWelcome"
		padding="30rem 0"
	>
		<MobBigTitle
			scroll-trigger-start="top bottom"
			scroll-trigger-end="center center"
			exit-trigger-start="bottom 13%"
			exit-trigger-end="bottom top"
		>
			<MobBigTitleRow
				align="flex-end"
				:style="{ marginTop: '1.3rem' }"
			>
				<MobBigTitleText :style="{ translate: '-7rem' }">
					Более,&nbsp;
				</MobBigTitleText>
				<MobBigTitleTextAccent :style="{ translate: '-5rem' }">
					чем
				</MobBigTitleTextAccent>
				<MobBigTitleImg
					width="5.8rem"
					height="6.7rem"
					src="/images/infrastructure/big-title-1/1.png"
					:style="{ marginLeft: '1rem' }"
				/>
			</MobBigTitleRow>
			<MobBigTitleRow
				align="flex-end"
				:style="{ marginTop: '1.3rem' }"
			>
				<MobBigTitleText :style="{ translate: '3rem' }">
					комфортное
				</MobBigTitleText>
			</MobBigTitleRow>
			<MobBigTitleRow :style="{ marginTop: '1.3rem' }">
				<MobBigTitleImg
					width="5.3rem"
					height="3.1rem"
					src="/images/infrastructure/big-title-1/2.png"
					:style="{ marginRight: '1rem' }"
				/>
				<MobBigTitleTextAccent :style="{ translate: '5rem' }">
					пребывание
				</MobBigTitleTextAccent>
			</MobBigTitleRow>
		</MobBigTitle>
	</MobSimpleSectionWrapper>
</template>

<script
	lang="ts"
	setup
>
onMounted(() => {

});
</script>

<style lang="scss">
.MobInfrastructureSectionWelcome {
}
</style>
