import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

export default class Controls {
	controls;

	constructor(camera, container) {
		this.camera = camera;
		this.container = container;

		this.create();

		return this.controls;
	}

	create() {
		this.controls = new OrbitControls(this.camera, this.container);

		return this.controls;
	}

	update() {
		this.controls.update();
	}
}
