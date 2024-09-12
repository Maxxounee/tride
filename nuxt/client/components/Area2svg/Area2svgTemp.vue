<template>
	<div class="Area2svgTemp">
		<slot name="before" />

		<div class="Area2svgTemp_area Area2svgTemp_area_bottom" />
		<div class="Area2svgTemp_content">
			<slot />
		</div>
		<div class="Area2svgTemp_area Area2svgTemp_area_top" />

		<slot name="after" />
	</div>
</template>

<script>
import { SVG, Path, extend } from '@svgdotjs/svg.js';
import svgExtend from '@/assets/script/SVGExtend';

svgExtend(extend, Path);

export default {
	props: {
		pathAttr: {
			type: Object,
			default: () => ({}),
		},
		width: {
			type: Number,
			default: 1920,
		},
		height: {
			type: Number,
			default: 1080,
		},
		x: {
			type: Number,
			default: 0,
		},
		y: {
			type: Number,
			default: 0,
		},
		click: {
			type: Function,
			default(el) {
				console.log(el.alt);
			},
		},
		mouseover: {
			type: Function,
			default(el) {
				el.attr({ opacity: 0.5 });
			},
		},
		mouseout: {
			type: Function,
			default(el) {
				el.attr({ opacity: 0 });
			},
		},
		each: {
			type: Function,
			default() { },
		},
		selector: {
			type: String,
			default: 'SELECTION',
		},
		floorId: {
			type: String,
			default: null,
		},
		getFloorId: {
			type: Function,
			default(d) {
				return `${d.b}-${d.s}-${d.f}`;
			},
		},
		flatsData: {
			type: Object,
			default: () => ({}),
		},
		altStart: {
			type: String,
			default: '',
		},
	},
	emits: [
		'contentLoaded',
		'areaClick',
		'areaMouseOver',
		'areaMouseOut',
	],
	data() {
		return {
			drawBottom: null,
			drawTop: null,
			groupBottom: null,
			groupTop: null,
			topElements: {},
			pathAttrDefault: {
				'opacity': 0,
				'fill': '#00f',
				'fill-opacity': 1,
				'stroke': '#f00',
				'stroke-opacity': 0,
				'stroke-width': 3,
				'stroke-linejoin': 'round',
				'cursor': 'pointer',
			},
			size: {},
			Area2svgTemp_content: null,
			Area2Svg_img: null,
			filteredFlats: {},
		};
	},
	computed: {
		style() {
			return { ...this.pathAttrDefault, ...this.pathAttr };
		},
		opt() {
			return {
				groupBottom: this.groupBottom,
				groupTop: this.groupTop,
				sizeWidth: this.size.width,
				sizeHeight: this.size.height,
				sizeX: this.size.x,
				sizeY: this.size.y,
			};
		},
	},
	watch: {
		size(value) {
			this.drawBottom.viewbox(value.x, value.y, value.width, value.height);
			this.drawTop.viewbox(value.x, value.y, value.width, value.height);
		},
	},
	mounted() {
		this.Area2svgTemp_content = this.$el.querySelector('.Area2svgTemp_content');
		this.drawBottom = SVG().addTo(this.$el.querySelector('.Area2svgTemp_area_bottom')).size('100%', '100%');
		this.drawTop = SVG().addTo(this.$el.querySelector('.Area2svgTemp_area_top')).size('100%', '100%');
		this.groupBottom = this.drawBottom.group();
		this.groupTop = this.drawTop.group();

		if (this.Area2svgTemp_content.querySelector('map')) {
			this.parseMap(this.Area2svgTemp_content.querySelectorAll('map area'));
			this.Area2svgTemp_content.querySelector('map').remove();
		} else if (this.Area2svgTemp_content.querySelector('svg')) {
			this.parseSvg(this.Area2svgTemp_content.innerHTML);
			this.Area2svgTemp_content.querySelector('svg').remove();
		}
	},
	beforeUnmount() {
		this.removeEvents();
	},
	methods: {
		loadMap({ areaString }) {
			this.resetSvgGroups();
			const areaNodeList = new DOMParser().parseFromString(areaString, 'text/html').body.querySelectorAll('area');
			this.parseMap(areaNodeList);
			return Promise.resolve();
		},
		async loadContent({ content }) {
			this.resetSvgGroups();
			try {
				await Promise.all([
					this.loadImage(content),
					this.loadSvg(content),
				]);
				this.$emit('contentLoaded', {
					img: {
						width: this.Area2Svg_img.naturalWidth,
						height: this.Area2Svg_img.naturalHeight,
						ratio: this.Area2Svg_img.naturalWidth / this.Area2Svg_img.naturalHeight,
					},
					areaElements: this.topElements,
					areaOpt: this.opt,
				});

				return Promise.resolve();
			} catch (error) {
				console.error(`[Area2Svg] ${error}`);
			}
		},
		loadImage(content) {
			return new Promise((resolve) => {
				const oldImg = this.Area2svgTemp_content.querySelector('.Area2svgTemp_oldImg');
				if (oldImg) {
					oldImg.remove();
				}

				this.Area2Svg_img = new Image();
				this.Area2Svg_img.classList.add('Area2svgTemp_img');
				this.Area2Svg_img.src = content;

				this.Area2svgTemp_content.prepend(this.Area2Svg_img);
				this.Area2Svg_img.addEventListener('load', function() {
					resolve();
				});
			});
		},
		async loadSvg(content) {
			try {
				const response = await $fetch(content.replace('.png', '.svg').replace('.svg', '_selection.svg'), { responseType: 'text' });
				this.parseSvg(response);
			} catch (error) {
				return error;
			}
		},
		parseMap(content) {
			const { width, height, x, y } = this;
			this.size = {
				width,
				height,
				x,
				y,
			};

			for (let i = 0; i < content.length; i++) {
				const area = content[i];
				if (area.alt === undefined || area.alt === null) {
					console.log(`null alt at line ${i}`);
					continue;
				}

				const type = area.shape;
				if (!['path', 'poly', 'rect', 'circle'].includes(type)) {
					console.log(`no valid shape at line ${i}`);
					continue;
				}

				const points = area.coords.split(',').map(item => Number(item));
				let newpoints;
				switch (type) {
				case 'path':
					newpoints = area.coords;
					break;
				case 'poly':
					newpoints = this.polyPath(points);
					break;
				case 'rect':
					newpoints = this.rectPath(points);
					break;
				case 'circle':
					newpoints = this.circlePath(points[0], points[1], points[2]);
					break;
				default:
					break;
				}
				const elBottom = this.groupBottom.path(newpoints);
				const elTop = this.groupTop.path(newpoints);
				this.initPath(elBottom, elTop, `${this.altStart}${area.alt}`);
			}
		},
		parseSvg(content) {
			this.filteredFlats = {};
			Object.keys(this.flatsData).forEach((key) => {
				const d = this.flatsData[key];
				if (this.getFloorId(d) === this.floorId) {
					this.filteredFlats[d.$p] = key;
				}
			});
			const tempGroup = this.drawBottom.group();
			tempGroup.svg(content);
			content = tempGroup.find('svg')[0];
			const { width, height, x, y } = content.viewbox();
			this.size = {
				width,
				height,
				x,
				y,
			};
			let selections;
			const selectionsEl = content.find(`#${this.selector}`)[0];
			if (selectionsEl.type === 'g') {
				selections = selectionsEl.children();
			} else {
				selections = [selectionsEl];
			}
			const filteredFlatsLength = Object.keys(this.filteredFlats).length;
			selections.forEach((item, key) => {
				let alt = key;
				if (filteredFlatsLength) {
					alt = this.filteredFlats[filteredFlatsLength - key];
				} else {
					const id = item.attr('id');
					if (id !== undefined) {
						alt = id;
					}
				}
				this.groupBottom.svg(item.svg());
				this.groupTop.svg(item.svg());
				this.initPath(this.groupBottom.children()[key], this.groupTop.children()[key], `${this.altStart}${alt}`);
			});
			tempGroup.remove();
		},
		resetSvgGroups() {
			this.removeEvents();
			this.groupBottom.clear();
			this.groupTop.clear();
			this.topElements = {};
		},
		removeEvents() {
			this.groupTop.children().forEach((item) => {
				item.off();
			});
		},
		getByAlt(alt) {
			return this.topElements[alt];
		},
		forEach(callback) {
			this.groupTop.children().forEach((item) => {
				callback(item, this.opt);
			});
		},
		length() {
			return this.groupTop.children().length;
		},
		circlePath(cx, cy, r) {
			return 'M ' + cx + ' ' + cy + ' m -' + r + ', 0 a ' + r + ',' + r + ' 0 1,0 ' + (r * 2) + ',0 a ' + r + ',' + r + ' 0 1,0 -' + (r * 2) + ',0';
		},
		rectPath(points) {
			return 'M' + points[0] + ' ' + points[1] + 'L' + points[2] + ' ' + points[1] + 'L' + points[2] + ' ' + points[3] + 'L' + points[0] + ' ' + points[3] + ' z';
		},
		polyPath(points) {
			let newpoints = 'M' + points[0] + ' ' + points[1];
			for (let i = 0; i < points.length; i += 2) {
				newpoints += 'L' + points[i] + ' ' + points[i + 1];
			}
			newpoints += ' z';
			return newpoints;
		},
		initPath(elBottom, elTop, alt) {
			Object.entries(this.style).forEach((item) => {
				elBottom.node.setAttribute(item[0], item[1]);
			});
			elTop.node.setAttribute('opacity', 0);
			elTop.node.setAttribute('fill', '#fff');
			elTop.node.setAttribute('cursor', this.style.cursor);

			elTop.bottom = elBottom;
			elTop.alt = alt;
			if (!this.topElements[alt]) {
				this.topElements[alt] = [];
			}
			this.topElements[alt].push(elTop);
			elTop
				.on('click', (e) => {
					this.click(elTop, this.opt, e);
					this.$emit('areaClick', elTop, this.opt, e);
				})
				.on('mouseover', (e) => {
					this.mouseover(elTop, this.opt, e);
					this.$emit('areaMouseOver', elTop, this.opt, e);
				})
				.on('mouseout', (e) => {
					this.mouseout(elTop, this.opt, e);
					this.$emit('areaMouseOut', elTop, this.opt, e);
				});
			this.each(elTop, this.opt);
		},
	},
};
</script>

<style lang="scss">
.Area2svgTemp {
	position: absolute;
	top: 0;
	left: 0;

	width: 100%;
	height: 100%;

	&_area,
	&_content,
	&_img {
		position: absolute;
		top: 0;
		left: 0;

		width: 100%;
		height: 100%;
	}

	&_img {
		object-fit: contain;
	}
}
</style>
