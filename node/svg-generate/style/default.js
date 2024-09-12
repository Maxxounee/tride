const default = '#1D1D1B';

module.exports = {
	floors: {
		customFunction: (attrs) => {
			const css = {};
			if (attrs.fill && ['NONE', '#FFFFFF'].includes(attrs.fill.toUpperCase())) {
				css.fill = 'NONE';
			} else
			if (attrs.fill && ['#1D1D1B'].includes(attrs.fill.toUpperCase())) {
				css.fill = default;
			}
			if (attrs.stroke) {
				css.stroke = default;
			}
			return css;
		},
	},
	all: {
		customFunction: (attrs) => {
			const css = {};
			if (attrs.fill && ['none', '#ffffff'].includes(attrs.fill.toLowerCase())) {
				css.fill = 'none';
			} else
			if (attrs.fill) {
				css.fill = default;
			}
			if (attrs.stroke) {
				css.stroke = default;
			}
			return css;
		},
	},
};
