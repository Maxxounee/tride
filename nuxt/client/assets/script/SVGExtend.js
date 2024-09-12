function svgExtend(extend, path) {
	extend(path, {
		getCentroid() {
			const centroid = { cx: 0, cy: 0 };
			let area = 0;
			const length = this.length();
			const lengthSegment = length / 100.00;
			for (let i = 0; i < length; i += lengthSegment) {
				const curr = this.pointAt(i);
				const next = this.pointAt(i + lengthSegment);
				centroid.cx += (curr.x + next.x) * (curr.x * next.y - next.x * curr.y);
				centroid.cy += (curr.y + next.y) * (curr.x * next.y - next.x * curr.y);
				area += (curr.x * next.y - next.x * curr.y);
			}
			area = area / 2.0;
			centroid.cx = centroid.cx / (6 * area);
			centroid.cy = centroid.cy / (6 * area);
			return centroid;
		},
		getSideCenters() {
			const sideCenters = { lx: 0, ly: 0, rx: 0, ry: 0 };
			const length = this.length();
			const lengthSegment = length / 100;
			const lxArr = [];
			const rxArr = [];
			const bbox = this.bbox();
			const minX = bbox.x;
			const maxX = bbox.x2;
			let	minY = 9999;
			let	maxY = 0;
			for (let i = 0; i < length; i += lengthSegment) {
				const curr = this.pointAt(i);
				if (Math.abs(curr.x - minX) < 5) {
					lxArr.push(curr);
				}
				if (Math.abs(curr.x - maxX) < 5) {
					rxArr.push(curr);
				}
			}
			for (let i = 0, ll = lxArr.length; i < ll; i++) {
				const curr = lxArr[i];
				if (curr.y < minY) {
					minY = curr.y;
				}
				if (curr.y > maxY) {
					maxY = curr.y;
				}
			}
			sideCenters.ly = minY + (maxY - minY) / 2;
			sideCenters.lx = bbox.x;
			minY = 9999;
			maxY = 0;
			for (let i = 0, rl = rxArr.length; i < rl; i++) {
				const curr = rxArr[i];
				if (curr.y < minY) {
					minY = curr.y;
				}
				if (curr.y > maxY) {
					maxY = curr.y;
				}
			}
			sideCenters.ry = minY + (maxY - minY) / 2;
			sideCenters.rx = bbox.x2;
			return sideCenters;
		},
	});
}

export default svgExtend;
