<template>
	<MobSimpleSectionWrapper
		class="MobIndexSectionWelcome"
		padding="30rem 0"
	>
		<MobBigTitle
			scroll-trigger-start="top bottom"
			scroll-trigger-end="center center"
			exit-trigger-start="bottom 13%"
			exit-trigger-end="bottom top"
		>
			<MobBigTitleRowWrapper
				col-align="flex-end"
				align="flex-end"
			>
				<MobBigTitleRow>
					<MobBigTitleTextAccent :style="{ translate: '-10rem'}">
						новый
					</MobBigTitleTextAccent>
				</MobBigTitleRow>
				<MobBigTitleRow>
					<MobBigTitleText :style="{ translate: '-10rem'}">
						курорт
					</MobBigTitleText>
				</MobBigTitleRow>
				<template #col2>
					<MobBigTitleImg
						src="/images/index/big-title-1/1.png"
						:style="{ marginLeft: '1.5rem' }"
					/>
				</template>
			</MobBigTitleRowWrapper>
			<MobBigTitleRow>
				<MobBigTitleText :style="{ marginTop: '1.3rem', translate: '10rem' }">
					в новом
				</MobBigTitleText>
				<MobBigTitleTextAccent :style="{ marginLeft: '1rem', translate: '10rem'}">
					Сочи
				</MobBigTitleTextAccent>
			</MobBigTitleRow>
			<MobBigTitleRow left="10rem">
				<MobBigTitleText :style="{ marginTop: '1.3rem', translate: '10rem'}">
					для тех,
				</MobBigTitleText>
			</MobBigTitleRow>
			<MobBigTitleRow
				:style="{ marginTop: '1.3rem' }"
				left="5rem"
			>
				<MobBigTitleTextAccent :style="{ translate: '10rem' }">
					кто
				</MobBigTitleTextAccent>
				<MobBigTitleText :style="{ marginLeft: '1.3rem', translate: '10rem'}">
					хочет
				</MobBigTitleText>
			</MobBigTitleRow>
			<MobBigTitleRow
				align="start"
				:style="{ marginTop: '1.3rem'}"
			>
				<MobBigTitleImg
					src="/images/index/big-title-1/1.png"
					height="4.6rem"
					width="10rem"
				/>
				<MobBigTitleTextAccent :style="{ marginLeft: '1.1rem'}">
					большего
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

})
</script>

<style lang="scss">

.MobIndexSectionWelcome {
}
</style>
