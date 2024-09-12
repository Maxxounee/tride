<template>
	<section class="IndexAstrumProjects">
		<BigTitle :exit-blur="false">
			<BigTitleRow>
				<BigTitleTextAccent :style="{ translate: '20rem' }">
					проекты
				</BigTitleTextAccent>
			</BigTitleRow>
			<BigTitleRow
				left="12.9rem"
				:style="{ marginTop: '4rem'}"
			>
				<BigTitleText :style="{ translate: '-20rem' }">
					Astrum Group
				</BigTitleText>
			</BigTitleRow>
		</BigTitle>

		<div class="IndexAstrumProjects__projects">
			<IndexAstrumProjectsRow :items="projects[0]" />
			<IndexAstrumProjectsRow
				:items="projects[0]"
				reverse
			/>
		</div>
		<FooterScrollToStartButton />
	</section>
</template>

<script
	lang="ts"
	setup
>
import {projects} from "~/assets/script/configs/index.js";
</script>

<style lang="scss">
.IndexAstrumProjects {
	@include flexColumn(center);

	padding: 24.5rem 0 0;
	background-color: var(--color-background);

	&__projects {
		overflow: hidden;
		width: 100%;
		margin-top: 13rem;
	}
}
</style>
