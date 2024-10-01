import * as THREE from 'three';

function createClickLogger() {

}

/** SceneCameraRenderer */
function createSCR(options = {}) {
	if (!process.client) {
		console.error('TJS createSCR no process.client');
		return;
	}

	const opt = {
		append: null, // сразу добавит рендерер в контейнер
		width: innerWidth,
		height: innerHeight,
		...options,
	};

	const scene = new THREE.Scene();
	const camera = new THREE.PerspectiveCamera(75, opt.width / opt.height);
	const renderer = new THREE.WebGLRenderer();

	renderer.setSize(innerWidth, innerHeight);

	if (opt.append) {
		opt.append.appendChild(renderer.domElement);
	}

	return { scene, camera, renderer };
}

function createImage(options = {}) {
	if (!options.url) {
		console.error('TJS createImage no URL');
		return;
	}

	const opt = {
		url: '',
		width: innerWidth,
		height: innerHeight,
		...options,
	};

	const texture = new THREE.TextureLoader().load(opt.url);
	const geometry = new THREE.PlaneGeometry(opt.width, opt.height);
	const material = new THREE.MeshBasicMaterial({ map: texture, side: THREE.DoubleSide });
	const mesh = new THREE.Mesh(geometry, material);

	return mesh;
}

export {
	createSCR,
	createImage,
};
