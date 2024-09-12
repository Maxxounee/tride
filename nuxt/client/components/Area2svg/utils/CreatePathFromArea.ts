export default class CreatePathFromArea {
	type: string;
	constructor(type: 'rect' | 'circle' | 'poly' | 'default') {
		this.type = type;
	};

	createPath(coords: string) {
		const points = coords.split(',').map(item => Number(item));
		switch (this.type) {
			case 'rect':
				return this.rectPath(points);
			case 'circle':
				return this.circlePath(points[0], points[1], points[2]);
			case 'default':
			case 'poly':
			default:
				return this.polyPath(points);
		}
	};

	private circlePath(cx: number, cy: number, r: number) {
		return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
	};

	private rectPath(points: number[]) {
		return 'M' + points[0] + ' ' + points[1] + 'L' + points[2] + ' ' + points[1] + 'L' + points[2] + ' ' + points[3] + 'L' + points[0] + ' ' + points[3] + ' z';
	};

	private polyPath(points: number[]) {
		let newPath = 'M' + points[0] + ' ' + points[1];
		for (let i = 0; i < points.length; i += 2) {
			newPath += 'L' + points[i] + ' ' + points[i + 1];
		}
		newPath += ' z';
		return newPath;
	};
};
