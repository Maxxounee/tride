<template>
	<div ref="canvasContainer" style="width: 100%; height: 100vh;"></div>
</template>

<script setup lang="ts">
import * as THREE from 'three';
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

const imageWidth = 1000;
const imageHeight = 1000;
const squareSize = 80; // Размер каждого квадрата
const numSquaresX = imageWidth / squareSize;
const numSquaresY = imageHeight / squareSize;

const texture = new THREE.TextureLoader().load('/images/brullov.jpg');

const geometry = new THREE.PlaneGeometry(squareSize, squareSize);
const material = new THREE.MeshBasicMaterial({map: texture, transparent: true});

const squares = ref([]);
const canvasContainer = ref(null);

onMounted(() => {
	const scene = new THREE.Scene();
	const test = '#272727';
	scene.background = new THREE.Color(0x272727);
	const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100000);
	camera.position.z = 500;

	const renderer = new THREE.WebGLRenderer({
		canvas: document.createElement('canvas'),
		antialias: true,
	});

	renderer.setSize(window.innerWidth, window.innerHeight);
	canvasContainer.value.appendChild(renderer.domElement);

	const controls = new OrbitControls(camera, renderer.domElement);

	const spotLight = new THREE.SpotLight(0xffffff);
	spotLight.position.set(0, 0, 5);
	// spotLight.map = new THREE.TextureLoader().load(url);

	spotLight.castShadow = true;

	spotLight.shadow.mapSize.width = 1024;
	spotLight.shadow.mapSize.height = 1024;

	spotLight.shadow.camera.near = 500;
	spotLight.shadow.camera.far = 4000;
	spotLight.shadow.camera.fov = 30;

	scene.add(spotLight);

	for (let i = 0; i < numSquaresX; i++) {
		for (let j = 0; j < numSquaresY; j++) {
			const geometry = new THREE.BufferGeometry();
			const positions = new Float32Array([
				-squareSize / 2, -squareSize / 2, 0,
				squareSize / 2, -squareSize / 2, 0,
				squareSize / 2, squareSize / 2, 0,
				-squareSize / 2, squareSize / 2, 0,
			]);
			const indices = new Uint16Array([0, 1, 2, 0, 2, 3]);
			const uvs = new Float32Array([
				i / numSquaresX, j / numSquaresY,
				(i + 1) / numSquaresX, j / numSquaresY,
				(i + 1) / numSquaresX, (j + 1) / numSquaresY,
				i / numSquaresX, (j + 1) / numSquaresY,
			]);

			geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
			geometry.setIndex(new THREE.BufferAttribute(indices, 1));
			geometry.setAttribute('uv', new THREE.BufferAttribute(uvs, 2));

			const material = new THREE.MeshBasicMaterial({map: texture, transparent: true});
			const square = new THREE.Mesh(geometry, material);
			square.position.set(i * squareSize - imageWidth / 2, j * squareSize - imageHeight / 2, 0);


			squares.value.push(square);
			scene.add(square);
		}
	}

	// const centerX = imageWidth / 2;
	// const centerY = imageHeight / 2;
	// const edgeThreshold = 0.3; // Порог для определения краев
	//
	// squares.value.forEach((square, index) => {
	// 	const x = (index % numSquaresX) * squareSize + squareSize / 2;
	// 	const y = Math.floor(index / numSquaresX) * squareSize + squareSize / 2;
	//
	// 	const distanceToEdgeX = Math.min(x, imageWidth - x);
	// 	const distanceToEdgeY = Math.min(y, imageHeight - y);
	//
	// 	const isNearEdge = distanceToEdgeX / (imageWidth / 2) < edgeThreshold || distanceToEdgeY / (imageHeight / 2) < edgeThreshold;
	//
	// 	if (isNearEdge) {
	// 		const distanceToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
	// 		const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
	//
	// 		const edgeFactor = 1 - Math.min(distanceToEdgeX, distanceToEdgeY) / (imageWidth / 2); // Фактор края
	// 		const centerFactor = distanceToCenter / maxDistance; // Фактор центра
	//
	// 		const opacityProbability = edgeFactor * (1 - centerFactor); // Вероятность прозрачности
	// 		const randomOpacity = Math.random() < opacityProbability ? Math.random() : 1; // Случайная прозрачность с учетом вероятности
	//
	// 		square.material.opacity = randomOpacity;
	// 	} else {
	// 		square.material.opacity = 1; // Абсолютно непрозрачный
	// 	}
	// });

	const masks = [
		{x: 0.1, y: 0.2, radius: 0.3},
		// {x: 0.1, y: 0.05, radius: 0.05},
		// {x: 0.12, y: 0.04, radius: 0.05}
	];

	squares.value.forEach((square, index) => {
		const x = (index % numSquaresX) * squareSize + squareSize / 2;
		const y = Math.floor(index / numSquaresX) * squareSize + squareSize / 2;

		const normalizedX = 1 - (x / imageWidth);
		const normalizedY = y / imageHeight;

		console.log(normalizedX, normalizedY)
		let isTransparent = false;

		for (const mask of masks) {
			const distanceToMaskPoint = Math.sqrt((normalizedX - mask.y) ** 2 + (normalizedY - mask.x) ** 2);

			if (distanceToMaskPoint <= mask.radius) {
				isTransparent = true;
				break;
			}
		}

		if (isTransparent) {
			square.material.opacity = Math.random() * 0.5; // Установите желаемую прозрачность
		} else {
			square.material.opacity = 1; // Абсолютно непрозрачный
		}
	});

	function animate() {
		requestAnimationFrame(animate);
		renderer.render(scene, camera);
		controls.update();
	}

	animate();
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
