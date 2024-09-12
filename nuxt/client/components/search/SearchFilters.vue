<template>
	<div class="SearchFilters">
		<SearcherWrapper
			:data="livingStore.availableAparts"
			class="filters"
			@result="({ values }) => (searchStore.setResults(values))"
		>
			<div class="filters__inner">
				<div class="filters__row">
					<div class="item">
						<p class="item__title">
							Этаж
						</p>
						<SearcherSlider object-key="f" />
					</div>
					<div class="item">
						<p class="item__title">
							Площадь, м<sup>2</sup>
						</p>
						<SearcherSlider
							object-key="sq"
							:precision="1"
						/>
					</div>
					<div class="item">
						<p class="item__title">
							Стоимость, млн руб.
						</p>
						<SearcherSlider
							object-key="tc"
							:precision="1"
							:divide="1000000"
							:delta="3000000"
						/>
					</div>
				</div>
				<div class="filters__row">
					<div class="item">
						<p class="item__title">
							Комнат
						</p>
						<SearcherCheckbox object-key="rc" />
					</div>
					<SearcherReset>
						<UIStandardButton>
							Сбросить фильтр
						</UIStandardButton>
					</SearcherReset>
				</div>
			</div>
		</SearcherWrapper>
	</div>
</template>

<script lang="ts" setup>
const livingStore = useLotsLivingStore();
const searchStore = useSearchStore();
</script>

<style lang="scss">
.SearchFilters {
}
</style>
