export default class Camera {
	camera;

	constructor() {
		this.create();

		return this.camera;
	}

	create() {
		this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);

		this.camera.position.z = 800;

		return this.camera;
	}
}
