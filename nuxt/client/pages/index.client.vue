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
					<!--<TresPerspectiveCamera />-->
					<Suspense>
						<primitive ref="primitive" :object="scene" />
					</Suspense>
					<TresAmbientLight />
					<TresDirectionalLight
						color="#F78B3D"
						:position="[3, 3, 3]"
						:intensity="2"
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
import { BasicShadowMap, SRGBColorSpace, NoToneMapping } from 'three';
// import { TresCanvas } from '@tresjs/core';
const gl = {
	clearColor: '#F78B3D',
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

async function loadGltfModel() {
	const value = await useLoader(GLTFLoader, '/models/house_web.gltf');
	scene = value.scene;
	console.log('value', value);

	loaded.value = true;
}

async function loadFbxModel() {
	const value = await useLoader(FBXLoader, '/models/house_web.fbx');
	scene = value;

	loaded.value = true;
}

async function loadObjModel() {
	const value = await useLoader(OBJLoader, '/models/house_web.obj');
	console.log('value', value);
	scene = value;
	loaded.value = true;
}

onMounted(async() => {
	// loadObjModel();
	// loadFbxModel();
	loadGltfModel();
});

function scrollHandler({ animatedScroll, dimensions }) {
	scrollValue.value = animatedScroll / (dimensions.scrollHeight - innerHeight);
	primitive.value.rotation.x = scrollValue.value;
	primitive.value.rotation.y = scrollValue.value;
	primitive.value.position.z = scrollValue.value * 5;
	primitive.value.position.y = scrollValue.value * 3;
	primitive.value.scale.y = scrollValue.value * 2;
}

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
