export default class RayCaster {
	rayCaster;
	onClick = ()=>({});

	constructor({ scene, onClick }) {
		this.scene = scene;
		this.onClick = onClick;

		this.init();

		return this.rayCaster;
	}

	init() {
		this.rayCaster = new THREE.Raycaster();

		window.addEventListener('click', this.onClick);
	}
}
