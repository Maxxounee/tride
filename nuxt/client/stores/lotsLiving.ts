// import type {ApartmentsData} from "~/types/plans";

export const useLotsLivingStore = defineStore('lotsLivingStore', () => {
	/** Весь объект с данными проекта из ответа backend api */
	const livingData = ref<LivingObject>();


	/** Обращение к backend api */
	async function loadHydra() {
		await new Promise(async (resolve) => {
			if (livingData.value) {
				resolve(livingData.value);
				return;
			}
			try {
				livingData.value = await $fetch<LivingObject>('/api/hydra/data');

				resolve(livingData.value);
			} catch (error) {
				console.error(`%c◥ [Failed to connect Hydra]: \n\n %c%s`, 'color: #e31c4b; font-size: 18px;', 'color: white', error);
			}
		})
	}

	/** Объект с текущими номерами building/section/floor/apart (3, 5, 1, 22). Устанавливаются с помощью функции setParamsFromId() */
	const params = ref<PlansParams>({
		building: undefined,
		section: undefined,
		floor: undefined,
		apart: undefined,
	});

	/** Id (alt) building/section/floor/apart */
	const buildingId = computed(() => params.value.building);
	const sectionId = computed(() => params.value.section && [buildingId.value, params.value.section].join('-'));
	const floorId = computed(() => params.value.floor && [sectionId.value, params.value.floor].join('-'));
	const apartId = computed(() => params.value.apart && [floorId.value, params.value.apart].join('-'));

	/** Объект ТЕКУЩЕГО здания/секции/этажа/квартиры */
	const buildingData = computed(() => buildingId.value && livingData.value?.buildings?.[buildingId.value]);
	const sectionData = computed(() => sectionId.value && livingData.value?.sections?.[sectionId.value]);
	const floorData = computed(() => floorId.value && livingData.value?.floors?.[floorId.value]);
	const apartData = computed(() => apartId.value && livingData.value?.apartments?.[apartId.value]);

	/** 🐁🐁🐁 HOVERED */
	/** Раздел данных для "временных" данных по объекту. Обычно нужен при наведении на квартиру или здание */
	const buildingAltHovered = ref<string | undefined>(undefined);
	const buildingDataHovered = ref<Building | {}>({});

	const floorAltHovered = ref<string | undefined>(undefined);
	const floorDataHovered = ref<Building | {}>({});

	const flatAltHovered = ref<string | undefined>(undefined);
	const flatDataHovered = ref<Building | {}>({});

	function setHoveredBuilding(id?: string) {
		buildingAltHovered.value = id;
	}

	function setHoveredFloor(id?: string) {
		floorAltHovered.value = id;
	}

	function setHoveredFlat(id?: string) {
		flatAltHovered.value = id;
	}

	watch(() => buildingAltHovered.value, (value: string | undefined) => {
		if (value) {
			buildingDataHovered.value = livingData.value?.buildings[value] ?? {};
		}
	})
	watch(() => floorAltHovered.value, (value: string | undefined) => {
		if (value) {
			floorDataHovered.value = livingData.value?.floors[value] ?? {};
		}
	})

	watch(() => flatAltHovered.value, (value: string | undefined) => {
		flatDataHovered.value = livingData.value?.apartments[value] ?? {};
	})

	/** 🐁🐁🐁 END HOVERED */

	/** Устанавливает данные по квартире/зданию/секции/этажу. Принимает id вида "b-s-f-n" */
	function setParamsFromId(id?: string) {
		if (id === undefined) {
			params.value.building = undefined;
			params.value.section = undefined;
			params.value.floor = undefined;
			params.value.apart = undefined;
			return;
		}

		const [building, section, floor, apart] = id.split('-');

		params.value.building = +building || undefined;
		params.value.section = +section || undefined;
		params.value.floor = +floor || undefined;
		params.value.apart = +apart || undefined;
	}

	function getApartmentsBySt(st: number | number[]) {
		const newObj: ApartmentsData = {};
		const apartmentsIds = Object.keys(livingData.value?.apartments || {});

		for (let index = 0; index < apartmentsIds.length; index++) {
			const apartId = apartmentsIds[index];
			const apartData = livingData.value?.apartments[apartId];

			if (!apartData) continue;

			if (Array.isArray(st) && st.includes(apartData.st || st === apartData.st)) {
				newObj[apartId] = apartData;
			}
		}

		return newObj;
	}

	const availableSections = computed(() => {
		if (!livingData.value?.sections) return [];

		return Object.entries(livingData.value?.sections).reduce((acc: string[], [_sectionId, _sectionData]) => {
			if (!_sectionData.st > 0) acc.push(_sectionId);

			return acc;
		}, []);
	});

	const availableFloors = computed(() => {
		if (!livingData.value?.sections) return {};

		return Object.entries(livingData.value?.sections).reduce((acc: AvailableFloors, [_sectionId, _sectionData]) => {
			if (!acc[_sectionId]) acc[_sectionId] = [];

			if (livingData.value?.sections) {
				Object.entries(livingData.value?.floors).forEach(([_floorId, _floorData]) => {
					const [building, section] = _floorId.split('-');
					const sectionIdInFloor = [building, section].join('-');
					/* TODO: поменять на ST, когда они будут в выгрузке */

					if (sectionIdInFloor === _sectionId && _floorData.at > 0) acc[_sectionId].push(_floorId);
				});
			}

			return acc;
		}, {});
	});

	const availableAparts = computed(() => {
		if (!livingData.value?.apartments) return {};

		function reducer(acc: ApartmentsData, [id, data]: [string, ApartmentsData]) {
			if (data.st > 0) acc[id] = data;

			return acc;
		}

		return Object.entries(livingData.value?.apartments).reduce(reducer, {});
	});

	return {
		loadHydra,

		livingData,
		buildingData,
		sectionData,
		floorData,
		apartData,

		params,
		buildingId,
		sectionId,
		floorId,
		apartId,

		/* 🐁🐁🐁 HOVERED */
		buildingDataHovered,
		buildingAltHovered,

		floorDataHovered,
		floorAltHovered,

		flatDataHovered,
		flatAltHovered,

		setHoveredBuilding,
		setHoveredFloor,
		setHoveredFlat,
		/* 🐁🐁🐁 END HOVERED */

		availableSections,
		availableFloors,
		availableAparts,

		getApartmentsBySt,
		setParamsFromId,
	};
});
