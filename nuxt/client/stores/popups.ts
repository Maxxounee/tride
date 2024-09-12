export const usePopupStore = defineStore('popupStore', () => {
	const purchaseTermsActive = ref<boolean>(false);
	const advantagesActive = ref<boolean>(false);
	const flatGalleryActive = ref<boolean>(false);
	const flatViewActive = ref<boolean>(false);
	const showPurchaseTerms = () => purchaseTermsActive.value = true;
	const hidePurchaseTerms = () => purchaseTermsActive.value = false;

	const showAdvantages = () => advantagesActive.value = true;
	const hideAdvantages = () => advantagesActive.value = false;

	const showFlatGallery = () => flatGalleryActive.value = true;
	const hideFlatGallery = () => flatGalleryActive.value = false;

	const showFlatView = () => flatViewActive.value = true;
	const hideFlatView = () => flatViewActive.value = false;
	const hideAllPopups = () => {
		hidePurchaseTerms();
		hideAdvantages();
		hideFlatGallery();
	};
	
	return {
		hideAllPopups,

		purchaseTermsActive,
		showPurchaseTerms,
		hidePurchaseTerms,

		advantagesActive,
		showAdvantages,
		hideAdvantages,

		flatGalleryActive,
		showFlatGallery,
		hideFlatGallery,

		flatViewActive,
		showFlatView,
		hideFlatView,
	};
});
