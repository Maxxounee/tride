export default class Renderer {
	renderer;

	constructor() {
		this.create();

		return this.renderer;
	}

	create() {
		this.renderer = new THREE.WebGLRenderer({
			canvas: document.createElement('canvas'),
			antialias: true,
			alpha: true,
		});

		this.renderer.setSize(window.innerWidth, window.innerHeight);

		return this.renderer;
	}
}
