declare global {
	type TAreaPathStore = {
		masterPlan: { alt: string, coords: string }[];
		masterPlanPoints: { position: [number, number]; alt: string; }[]
		masterPlanImage: string;

		floorPaths: { [key: string]: { image: string; paths: { alt: string; coords: string }[] } }
	}
}
