<template>
	<div
		class="IndexAstrumProjectsRow"
		:class="{ IndexAstrumProjectsRow_reverse: reverse }"
	>
		<div class="IndexAstrumProjectsRow__content">
			<div
				v-for="item in 2"
				:key="item"
				class="IndexAstrumProjectsRow__anim"
			>
				<div
					v-for="project in items"
					:key="project.id"
					class="IndexAstrumProjectsRow__item"
				>
					<div class="IndexAstrumProjectsRow__logo">
						<NuxtImg
							:src="`/images/index/astrum/projects/${project.id}.png`"
						/>
					</div>

					<div class="IndexAstrumProjectsRow__card">
						<p
							class="txt-h7"
							v-html="project.text"
						/>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts" setup>
interface ProjectItem {
	id: string;
	text: string;
}
defineProps<{
	items: ProjectItem[];
	reverse?: boolean;
}>();
</script>

<style lang="scss">
.IndexAstrumProjectsRow {
	@include flex;

	overflow: hidden;
	width: 100%;

	&__content {
		@include flex;

		&:hover {
			.IndexAstrumProjectsRow__anim {
				animation-play-state: paused;
			}
		}
	}

	&__anim {
		@include flex;

		animation: translate 20s infinite linear;
	}

	&__item {
		display: grid;
		grid-template-areas: 'center';
		width: 38.4rem;
		height: 31.5rem;
	}

	&__logo {
		@include flex(center, center);

		grid-area: center;
		width: 100%;
		height: 100%;
		object-fit: contain;

		img {
			max-width: 14rem;
			max-height: 14rem;
			object-fit: contain;
		}
	}

	&__card {
		@include flex(center, center);

		pointer-events: none;

		grid-area: center;

		width: 100%;
		height: 100%;
		padding: 0 4rem;

		opacity: 0;
		background-color: var(--color-sea);

		transition: opacity 0.3s;

		p {
			color: var(--color-white);
			text-align: center;
		}
	}

	&__item:hover {
		.IndexAstrumProjectsRow__card {
			opacity: 1;
		}
	}

	&_reverse {
		.IndexAstrumProjectsRow__anim {
			animation-direction: reverse;
		}
	}

	@keyframes translate {
		from { translate: 0% }
		to { translate: -100% }
	}
}
</style>
