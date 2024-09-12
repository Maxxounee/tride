<template>
	<div class="ConstructionFilters">
		<div
			class="ConstructionFilters__main"
			:class="{ active: activeType === 'photo'}"
		>
			<div class="ConstructionFilters__filter ConstructionFilters__filter_year">
				<div
					v-for="(year, index) in yearsList"
					:key="index"
					class="ConstructionFilters__item"
					:class="{
						active: year === currentYear
					}"
					@click="setYear(year)"
					v-html="year"
				></div>
			</div>
			<TransitionGroup
				name="fade"
				class="ConstructionFilters__filter ConstructionFilters__filter_month"
			>
				<div
					v-for="month in monthsList"
					:key="month"
					class="button-wrapper"
				>
					<div
						class="ConstructionFilters__item"
						:class="{
									active: month === currentMonth
								}"
						@click="setMonth(month)"
						v-html="getMonthFromNumber(month)"
					></div>
				</div>
			</TransitionGroup>
		</div>
		<div class="type-choicer">
			<div
				v-for="{ key, name } in types"
				:key="key"
				class="type-choicer__item"
				:class="{
							active: activeType === key,
						}"
				@click="setType(name)"
			>
				<!--<div class="type-choicer__circle">-->
				<!--	<Icon :id="activeType === key ? 'checkbox-circle-circle' : 'checkbox-circle'" />-->
				<!--</div>-->
				<UIStandardButton>
					{{ name }}
				</UIStandardButton>
				<div
					class="type-choicer__text"
					v-html="name"
				></div>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
const activeType = ref('photo');

const types = [
	{key: 'photo', name: 'фотоотчет'},
	{key: 'video', name: 'видео'},
	{key: 'bird', name: 'Аэрофотосъемка'},
	{key: 'camera', name: 'онлайн-камера'},
]

function setType(value: string) {
	activeType.value = value;
}

onMounted(() => {

})
</script>

<style lang="scss">

.ConstructionFilters {
	@include flex;

	padding: 3rem;

	&__main {
		@include flex;

		gap: 14rem;
		opacity: 0;
		transition: opacity 0.3s;

		&.active {
			pointer-events: auto;
			opacity: 1;
		}
	}

	&__filter {
		@include flex;

		column-gap: 2.4rem;
	}

	&__item {
		@include font(1.4rem, 700, 1em);

		cursor: pointer;

		height: 1.6rem;

		color: var(--WHITE);
		text-transform: uppercase;

		opacity: 0.4;

		transition: opacity 0.2s;

		&.active {
			cursor: default;
			opacity: 1;
		}
	}

	.type-choicer {
		@include flex(end);

		column-gap: 3rem;
		margin-left: auto;

		&__circle {
			position: relative;
			width: 1.6rem;
			height: 1.6rem;
			color: var(--GOLD);

			.Icon {
				@include center;

				flex-shrink: 0;
				width: 16px !important;
				height: 16px !important;;
			}
		}

		&__text {
			@include font(1.4rem, 700);

			color: var(--WHITE);
		}

		&__item {
			@include flex(center);

			cursor: pointer;
			column-gap: 1rem;

			&.active {
				cursor: default;
			}
		}
	}
}
</style>
