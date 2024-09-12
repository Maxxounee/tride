<template>
	<div class="SearchResults">
		<SearchResultHeader
			v-show="searchStore.sorted.length"
			icon="ui/triangle"
			:data="searchStore.result"
			:items="[
					{ key: 'tr_n', title: '№ Номера'},
					{ key: 'rc', title: 'Комнат'},
					{ key: 'tr_b', title: 'Корпус'},
					{ key: 'f', title: 'Этаж'},
					{ key: 'sq', title: 'Площадь, м<sup>2</sup>'},
					{ key: 'tc', title: 'Стоимость, руб.'},
					// { title: 'Избранное'}
				]"
			mounted-sort-key="tc"
			@result="(value) => searchStore.setSortedResults(value)"
		/>
		<div class="main__results">
			{{ searchStore.sortedResults }}
			<SearchResultRow
				v-for="(result, index) in searchStore.sorted"
				:key="index"
				:data="result"
				:items="[
						{ key: 'tr_n' },
						{ key: 'rc' },
						{ key: 'tr_b' },
						{ key: 'f' },
						{ key: 'sq' },
						{ key: 'tc', proxy: (string) => formatCost(string) },
						// { icon: 'ui/heart-stroke'}
					]"
				@click.native="resultRowClickHandler(result)"
				@click.middle="resultRowClickHandler(result, true)"
			/>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>

const queryHandler = useQueryHandler();
const livingStore = useLotsLivingStore();
const searchStore = useSearchStore();


function resultRowClickHandler(item, targetBlank) {
	const query = {
		building: item.b,
		section: item.s,
		floor: item.f,
		flat: item.n,
	}
	if (targetBlank) {
		window.open(`/search?${new URLSearchParams(query)}`);
	} else {
		queryHandler.change(query);
	}
}

onMounted(() => {

})
</script>

<style lang="scss">

.SearchResults {
}
</style>
