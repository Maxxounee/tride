export default class Scene {
	scene;

	constructor() {
		this.create();

		return this.scene;
	}

	create() {
		this.scene = new THREE.Scene();

		return this.scene;
	}
}
