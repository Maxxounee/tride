declare global {
	type LotsType = 'living' | 'com' | 'park' | 'storage';

	type LivingObject = {
		apartments: ApartmentsData;
		floors: FloorsData;
		sections: SectionsData;
		buildings: {
			[index: string]: any;
		};
	};

	type ApartmentsData = { [index: string]: Apartment };
	type FloorsData = { [index: string]: Floor };
	type SectionsData = { [index: string]: Section };

	interface ICommon {
		st: {
			0: number;
			1: number;
			[index: string | number]: number;
			t: number;
			sold: boolean;
		};
		arc: {
			[index: string]: number;
		};
		mmsqd: {
			[index: string]: {
				min: number;
				max: number;
			};
			t: {
				min: number;
				max: number;
			};
		};
		mmtc: {
			min: number;
			max: number;
		};
	}

	interface Apartment {
		b: number;
		s: number;
		f: number;
		n: number;
		tr_n: number | string;
		rc: number;
		sq: number;
		st: number;
		tr_st: number;
		cpm: number;
		tc: number;
		tcd?: number;
		similar?: string[];
		$floor: string;
		$lot: string;
		$p: number;
	}

	interface Floor extends ICommon {
		b: number;
		s: number;
		f: number;
		$floor: string;
	}

	interface Section extends ICommon {
		b: number;
		s: number;
		maxf: number;
	}

	interface Building extends ICommon {
		b: number;
		maxf: number;
		tr_b: string;
	}

	type PlansParams = {
		building?: number;
		section?: number;
		floor?: number;
		apart?: number;
	};

	type AvailableFloors = {
		[index: string]: string[];
	};
}
export {
	// type Apar
};
