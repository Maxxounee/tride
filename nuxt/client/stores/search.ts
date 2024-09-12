export const useSearchStore = defineStore('searchStore', () => {
	const searchResults = ref<[]>([]);
	const searchSorted = ref<[]>([]);

	const result = computed(() => searchResults.value);
	const sorted = computed(() => searchSorted.value);

	function setResults(value: []) {
		searchResults.value = value;
	}

	function setSortedResults(value: []) {
		searchSorted.value = value;
	}

	return {
		result,
		sorted,
		setResults,
		setSortedResults,
	}
});
