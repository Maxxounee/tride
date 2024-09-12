declare global {
	type TLotsLivingStore = {
		loadHydra(): void;

		livingData: LivingObject;
		buildingData: Building;
		sectionData: Section;
		floorData: Floor;
		apartData: Apartment;

		buildingId: string;
		sectionId: string;
		floorId: string;
		apartId: string;

		buildingAltHovered: string;
		buildingDataHovered: Building;
		floorAltHovered: string;
		floorDataHovered: Floor;
		setHoveredBuilding(id?: string): void;
		setHoveredFloor(id?: string): void;

		availableSections: [];
		availableFloors: [];
		availableAparts: {};

		getApartmentsBySt(st: number | number[]): ApartmentsData;
		setParamsFromId(id?: string): void;
	}
}
