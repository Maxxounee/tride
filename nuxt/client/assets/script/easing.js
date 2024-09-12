/** Принимают значение от 0 до 1 */
function easeInOutSine(value) {
	return -(Math.cos(Math.PI * value) - 1) / 2;
}

function easeInOutQuad(value) {
	return value < 0.5 ? 2 * Math.pow(value, 2) : 1 - Math.pow(-2 * value + 2, 2) / 2;
}

function easeInOutCubic(value) {
	return value < 0.5 ? 4 * Math.pow(value, 3) : 1 - Math.pow(-2 * value + 2, 3) / 2;
}

function easeInOutQuart(value) {
	return value < 0.5 ? 8 * Math.pow(value, 4) : 1 - Math.pow(-2 * value + 2, 4) / 2;
}

function easeInOutQuint(value) {
	return value < 0.5 ? 16 * Math.pow(value, 5) : 1 - Math.pow(-2 * value + 2, 5) / 2;
}

const stringBezier = {
	inSine: 'cubic-bezier(0.12, 0, 0.39, 0)',
	outSine: 'cubic-bezier(0.61, 1, 0.88, 1)',
	inOutSine: 'cubic-bezier(0.37, 0, 0.63, 1)',

	inQuad: 'cubic-bezier(0.11, 0, 0.5, 0)',
	outQuad: 'cubic-bezier(0.5, 1, 0.89, 1)',
	inOutQuad: 'cubic-bezier(0.45, 0, 0.55, 1)',

	inCubic: 'cubic-bezier(0.32, 0, 0.67, 0)',
	outCubic: 'cubic-bezier(0.33, 1, 0.68, 1)',
	inOutCubic: 'cubic-bezier(0.65, 0, 0.35, 1)',

	inQuart: 'cubic-bezier(0.5, 0, 0.75, 0)',
	outQuart: 'cubic-bezier(0.25, 1, 0.5, 1)',
	inOutQuart: 'cubic-bezier(0.76, 0, 0.24, 1)',

	inQuint: 'cubic-bezier(0.64, 0, 0.78, 0)',
	outQuint: 'cubic-bezier(0.22, 1, 0.36, 1)',
	inOutQuint: 'cubic-bezier(0.83, 0, 0.17, 1)',

	inCirc: 'cubic-bezier(0.55, 0, 1, 0.45)',
	outCirc: 'cubic-bezier(0, 0.55, 0.45, 1)',
	inOutCirc: 'cubic-bezier(0.85, 0, 0.15, 1)',

	inExpo: 'cubic-bezier(0.7, 0, 0.84, 0)',
	outExpo: 'cubic-bezier(0.16, 1, 0.3, 1)',
	inOutExpo: 'cubic-bezier(0.87, 0, 0.13, 1)',

	inBack: 'cubic-bezier(0.36, 0, 0.66, -0.56)',
	outBack: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
	inOutBack: 'cubic-bezier(0.68, -0.6, 0.32, 1.6)',
};

export default {
	easeInOutSine,
	easeInOutQuad,
	easeInOutCubic,
	easeInOutQuart,
	easeInOutQuint,
	stringBezier,
};
