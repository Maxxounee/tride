<template>
	<Suspense>
		<TresMesh ref="mesh">
			<!--<TresPlaneGeometry ref="planeGeometry" :args="[50, 50]" />-->
			<!--<TresTextureLoader ref="texture" url="/images/brullov.jpg" />-->

			<!--<TresMeshStandardMaterial v-if="texture" ref="material" v-bind="texture" />-->
		</TresMesh>
	</Suspense>
</template>

<script setup>
// let texture;
// import { BasicShadowMap, NoToneMapping, SRGBColorSpace } from 'three';
import * as THREE from 'three';
/* eslint-disable */
// const texture = await useTexture({
// 	map: '/images/brullov.jpg',
// });
let texture = ref();

const imageWidth = 1000;
const imageHeight = 1000;
const squareSize = 50; // Размер каждого квадрата
const numSquaresX = imageWidth / squareSize;
const numSquaresY = imageHeight / squareSize;

const squares = ref([]);
const planeGeometry = ref();
const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true });
const geometry = new THREE.PlaneGeometry(squareSize, squareSize);

const mesh = ref();

const { scene, renderer } = useTresContext();

async function loadImage() {
	// texture = await useTexture({
	// 	map: '/images/brullov.jpg',
	// });
	texture.value = await useTexture({
		map: '/images/brullov.jpg',
	});

	load();
}

function load() {
	for (let i = 0; i < numSquaresX; i++) {
		for (let j = 0; j < numSquaresY; j++) {
			const square = new THREE.Mesh(planeGeometry.value, material.clone());

			square.position.set(i * squareSize - imageWidth / 2, j * squareSize - imageHeight / 2, 0);

			// Устанавливаем UV-координаты для каждого квадрата
			const u = i / numSquaresX;
			const v = j / numSquaresY;
			const uOffset = 1 / numSquaresX;
			const vOffset = 1 / numSquaresY;

			square.geometry.attributes.uv.array = new Float32Array([
				u, v,
				u + uOffset, v,
				u + uOffset, v + vOffset,
				u, v + vOffset,
			]);

			squares.value.push(square);
			scene.value.add(square);
		}
	}
	squares.value.forEach((square)=>{
		// scene.value.add(square);
		// renderer.value.render();
		// console.log(scene.value.add);
	});
}

onMounted(()=>{
	// const loadingManager = new LoadingManager();

	console.log('123');

	// const centerX = imageWidth / 2;
	// const centerY = imageHeight / 2;
	//
	// squares.value.forEach((square, index)=>{
	// 	const x = (index % numSquaresX) * squareSize + squareSize / 2;
	// 	const y = Math.floor(index / numSquaresX) * squareSize + squareSize / 2;
	//
	// 	const distanceToCenter = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
	// 	const maxDistance = Math.sqrt(centerX ** 2 + centerY ** 2);
	//
	// 	// const opacity = 1 - distanceToCenter / maxDistance;
	// 	// square.material.opacity = opacity;
	// });
	//
	// squares.value.forEach((square)=>{
	// 	if (Math.random() < 0.5) {
	// 		square.material.opacity *= Math.random();
	// 	}
	// });
	loadImage();

});
</script>

<style lang="scss">

.TdImageBlocks {
}
</style>
