<template>
	<MobSimpleSectionWrapper
		class="MobLocationSectionWelcome"
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
					<MobBigTitleText :style="{ translate: '-10rem' }">
						С ОДНОЙ
					</MobBigTitleText>
				</MobBigTitleRow>
				<MobBigTitleRow>
					<MobBigTitleTextAccent :style="{ translate: '-10rem' }">
						стороны –
					</MobBigTitleTextAccent>
				</MobBigTitleRow>
				<template #col2>
					<MobBigTitleImg
						width="8.5rem"
						height="10rem"
						src="/images/location/big-title-1/1.png"
						:style="{ marginLeft: '1.5rem' }"
					/>
				</template>
			</MobBigTitleRowWrapper>
			<MobBigTitleRow>
				<MobBigTitleText :style="{ marginTop: '1.3rem', translate: '10rem' }">
					ласковое
				</MobBigTitleText>
			</MobBigTitleRow>
			<MobBigTitleRowWrapper
				left="10rem"
				align="flex-end"
				:style="{ marginTop: '1.3rem' }"
			>
				<MobBigTitleImg
					src="/images/location/big-title-1/2.png"
					:style="{ marginLeft: '1.5rem' }"
					height="7.2rem"
					width="10rem"
				/>
				<template #col2>
					<MobBigTitleRow>
						<MobBigTitleText :style="{ translate: '5rem' }">
							МОРЕ
						</MobBigTitleText>
					</MobBigTitleRow>
					<MobBigTitleRow>
						<MobBigTitleTextAccent :style="{ translate: '5rem' }">
							с другой –
						</MobBigTitleTextAccent>
					</MobBigTitleRow>
				</template>
			</MobBigTitleRowWrapper>
			<MobBigTitleRow
				justify="flex-end"
				:style="{ marginTop: '1.3rem' }"
			>
				<MobBigTitleText :style="{ translate: '10rem' }">
					природные
				</MobBigTitleText>
			</MobBigTitleRow>
			<MobBigTitleRow
				justify="flex-end"
				:style="{ marginTop: '1.3rem' }"
			>
				<MobBigTitleText :style="{ translate: '10rem' }">
					красоты
				</MobBigTitleText>
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
.MobLocationSectionWelcome {
}
</style>
