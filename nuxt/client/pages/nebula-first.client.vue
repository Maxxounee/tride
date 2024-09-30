<template>
	<div ref="canvasContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup>
import * as THREE from 'three';
import System from 'three-nebula';

// console.log('Nebula', Nebula, System);
// import getThreeApp from "./three-app";

const el = ref();
const scene = ref();
const camera = ref();
const renderer = ref();
const nebula = ref();

function initCamera() {
	const _camera = new THREE.PerspectiveCamera(
		70,
		window.innerWidth / window.innerHeight,
		1,
		1000,
	);
	_camera.position.z = 100;

	return _camera;
}

function initScene() {
	const _scene = new THREE.Scene();

	return _scene;
}

function initRenderer() {
	const _renderer = new THREE.WebGLRenderer();

	_renderer.setPixelRatio(window.devicePixelRatio);
	_renderer.setSize(window.innerWidth, window.innerHeight);
	_renderer.setClearColor('black');

	return _renderer;
}

async function initNebula() {
	const json = await import('/nebula/first.json');

	Nebula.fromJSONAsync(json, THREE).then((loaded)=>{
		console.log('then');
		const app = getThreeApp();
		const nebulaRenderer = new SpriteRenderer(app.scene, THREE);
		const nebula = loaded.addRenderer(nebulaRenderer);

		animate();
	});
}

function animate() {
	requestAnimationFrame(()=>animate());

	nebula.value.update();
	renderer.value.render(scene.value, camera.value);
}

onMounted(()=>{
	// scene.value = initScene();
	// camera.value = initCamera();
	// renderer.value = initRenderer();
	// initNebula();

	// el.value.appendChild(renderer.value.domElement)
});
</script>

<style lang="scss">
.image-blocks {
	@include div100;

	.canvas {
		@include div100;

		pointer-events: none;
	}

	.block {
		height: 100vh;
	}

	.title {
		@include center(x);

		bottom: 10rem;
		translate: calc(100% + 50vw);

		font-size: 20rem;

		transition-timing-function: var(--easeInOutQuart);
		transition-duration: 0.69s;
		transition-property: translate;

		&.active {
			translate: none;
		}
	}

}
</style>
