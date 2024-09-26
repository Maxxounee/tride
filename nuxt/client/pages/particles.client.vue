<template>
	<div class="index">
		<Lenis class="index" @onScroll="scrollHandler">
			<div class="block"></div>
			<div class="block"></div>
			<div class="block"></div>

		</Lenis>
		<div v-if="loaded" class="canvas">
			<ClientOnly>
				<TresCanvas v-bind="gl">
					<OrbitControls />
					<TresPerspectiveCamera :position="100" />
					<Suspense>
						<primitive ref="primitive" :object="scene" />
					</Suspense>
					<TresAmbientLight />
					<TresDirectionalLight
						color="#F78B3D"
						:position="[3, 3, 3]"
						:intensity="2"
					/>
					<TresPointLight
						color="#FFF555"
						:intensity="20"
						:distance="100"
					/>
				</TresCanvas>
			</ClientOnly>
		</div>


		<h1
			class="title"
			:class="{
				active: scrollValue > 0.97
			}"
		>
			DOMIK PRIEHAL
		</h1>
	</div>

</template>

<script setup>
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import {
	BasicShadowMap,
	SRGBColorSpace,
	NoToneMapping,
	BufferGeometry,
	BufferAttribute,
	AdditiveBlending,
	PointsMaterial,
	Points,
	Vector3,
} from 'three';
// import { TresCanvas } from '@tresjs/core';
const gl = {
	clearColor: '#85a3ff',
	shadows: true,
	alpha: false,
	shadowMapType: BasicShadowMap,
	outputColorSpace: SRGBColorSpace,
	toneMapping: NoToneMapping,
	windowSize: true,
	style: {
		// pointerEvents: 'none',
	},
};
const loaded = ref(false);
const primitive = ref();
const scrollValue = ref(0);
let scene;

const PARTICLES_COUNT = 1000;
const PARTICLES_SPEED = 0.01;
const PARTICLES_RADIUS = 1;
const particlesPositions = new Float32Array(PARTICLES_COUNT * 3);
const particlesGeometry = new BufferGeometry();
let particles;

let meshGeometry;
let meshMatrixWorld;

let particleVertices;
let particleNormals;

async function loadGltfModel() {
	const value = await useLoader(GLTFLoader, '/models/stick/stick.gltf');
	scene = value.scene;

	const mesh = scene.children[0];
	meshGeometry = mesh.geometry;
	meshMatrixWorld = mesh.matrixWorld;
	// Вычисляем нормали, если они отсутствуют
	if (!meshGeometry.attributes.normal) {
		meshGeometry.computeVertexNormals();
	}

	loaded.value = true;
}

function createParticlesAroundGeometry() {
	particleVertices = meshGeometry.attributes.position.array;
	particleNormals = meshGeometry.attributes.normal.array;

	for (let i = 0; i < PARTICLES_COUNT; i++) {
		const vertexIndex = Math.floor(Math.random() * particleVertices.length / 3);
		const x = particleVertices[vertexIndex * 3];
		const y = particleVertices[vertexIndex * 3 + 1];
		const z = particleVertices[vertexIndex * 3 + 2];

		const nx = particleNormals[vertexIndex * 3];
		const ny = particleNormals[vertexIndex * 3 + 1];
		const nz = particleNormals[vertexIndex * 3 + 2];

		const offset = 0.1; // Смещение от поверхности
		const particlePosition = new Vector3(x + nx * offset, y + ny * offset, z + nz * offset);

		particlePosition.applyMatrix4(meshMatrixWorld);

		particlePosition[i * 3] = particlePosition.x;
		particlePosition[i * 3 + 1] = particlePosition.y;
		particlePosition[i * 3 + 2] = particlePosition.z;
	}

	particlesGeometry.setAttribute('position', new BufferAttribute(particlesPositions, 3));

	const particleMaterial = new PointsMaterial({
		color: 0xffffff,
		size: 0.1,
		transparent: true,
		opacity: 0.8,
		blending: AdditiveBlending,
	});

	particles = new Points(particlesGeometry, particleMaterial);
	scene.add(particles);
}

function animate() {
	requestAnimationFrame(animate);

	if (scene) {
		// scene.rotation.y += 0.01;
	}

	if (particles) {
		const positions = particles.geometry.attributes.position.array;
		const vertices = scene.children[0].geometry.attributes.position.array;
		const normals = scene.children[0].geometry.attributes.normal.array;
		const matrixWorld = scene.children[0].matrixWorld;

		for (let i = 0; i < positions.length / 3; i++) {
			const vertexIndex = Math.floor(Math.random() * vertices.length / 3);
			const x = vertices[vertexIndex * 3];
			const y = vertices[vertexIndex * 3 + 1];
			const z = vertices[vertexIndex * 3 + 2];

			const nx = normals[vertexIndex * 3];
			const ny = normals[vertexIndex * 3 + 1];
			const nz = normals[vertexIndex * 3 + 2];

			const offset = 4; // Смещение от поверхности
			const particlePosition = new Vector3(x + nx * offset, y + ny * offset, z + nz * offset);
			particlePosition.applyMatrix4(matrixWorld);

			positions[i * 3] = particlePosition.x;
			positions[i * 3 + 1] = particlePosition.y;
			positions[i * 3 + 2] = particlePosition.z;
		}

		particles.geometry.attributes.position.needsUpdate = true;
	}
}

function scrollHandler({ animatedScroll, dimensions }) {
	scrollValue.value = animatedScroll / (dimensions.scrollHeight - innerHeight);
	primitive.value.rotation.x = scrollValue.value;
	primitive.value.rotation.y = scrollValue.value;
	primitive.value.position.z = scrollValue.value * 5;
	primitive.value.position.y = scrollValue.value * 3;
	primitive.value.scale.y = scrollValue.value * 2;
}

onMounted(async()=>{
	// loadObjModel();
	// loadFbxModel();
	await loadGltfModel();

	// createParticles();
	createParticlesAroundGeometry();
	animate();
});

</script>

<style lang="scss">
.index {
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
