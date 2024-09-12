import type {Path} from '@svgdotjs/svg.js';

interface AreaPath extends Path {
	bottom?: Path;
	alt: string;
}

type PathAttributes = {
	'opacity'?: number;
	'fill'?: string;
	'fill-opacity'?: number;
	'stroke'?: string;
	'stroke-opacity'?: number;
	'stroke-width'?: number;
	'stroke-linejoin'?: string;
	'cursor'?: string;
};

type AreaDataItem = {
	alt: string;
	type?: 'rect' | 'circle' | 'poly' | 'default';
	coords: string;
};

export {AreaPath, PathAttributes, AreaDataItem};
