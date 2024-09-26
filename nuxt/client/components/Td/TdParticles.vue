<template>
	<!--<TresMesh>-->

	<!--</TresMesh>-->
	<!--<TresPoints ref="particleSystem">-->
	<!--	<TresBufferGeometry>-->
	<!--		<TresBufferAttribute-->
	<!--			:args="[positions, 3]"-->
	<!--			attach="attributes-position"-->
	<!--		/>-->
	<!--		<TresBufferAttribute-->
	<!--			:args="[colors, 3]"-->
	<!--			attach="attributes-color"-->
	<!--		/>-->
	<!--	</TresBufferGeometry>-->
	<!--	&lt;!&ndash;<TresPointsMaterial color="white" size="0.1" vertexColors :blending="AdditiveBlending" />&ndash;&gt;-->
	<!--	<TresShaderMaterial v-bind="shader" />-->
	<!--</TresPoints>-->

	<TresPoints>
		<TresBufferGeometry :position="[positionArray, 3]" :a-scale="[scaleArray, 1]" />
		<TresShaderMaterial v-bind="shader" />
	</TresPoints>
</template>

<script lang="ts" setup>

import {CatmullRomCurve3, Vector3, Color, AdditiveBlending} from 'three';
// import FirefliesVertex from '/shaders/vertex.glsl';
// import FirefliesFragment from '/shaders/fragment.glsl';

const FirefliesFragment = `
// Фрагментный шейдер для свечения частиц

varying vec3 vPosition; // Переменная для получения позиции из вершинного шейдера
varying float vGlow; // Переменная для получения свечения из вершинного шейдера

void main() {
    // Вычисляем цвет частицы с учетом свечения
    vec3 color = vec3(1.0, 1.0, 1.0) * vGlow;

    // Устанавливаем цвет частицы
    gl_FragColor = vec4(color, 1.0);
}
`
const FirefliesVertex = `uniform float uTime; // Время для анимации
uniform float uSpeed; // Скорость движения частиц
uniform float uSize; // Базовый размер частиц
uniform float uSizeVariation; // Вариация размера частиц
uniform float uGlow; // Интенсивность свечения

attribute float aStartTime; // Время начала движения для каждой частицы
attribute vec3 aInitialPosition; // Начальная позиция частицы

varying vec3 vPosition; // Переменная для передачи позиции во фрагментный шейдер
varying float vGlow; // Переменная для передачи свечения во фрагментный шейдер

void main() {
	// Вычисляем текущее время для каждой частицы
	float time = uTime - aStartTime;

	// Вычисляем позицию частицы вдоль спирали
	float angle = time * uSpeed;
	float radius = 1.0; // Радиус спирали
	float height = time * uSpeed * 0.5; // Высота спирали

	vec3 spiralPosition = vec3(
		radius * cos(angle),
		height,
		radius * sin(angle)
	);

	// Добавляем начальную позицию частицы
	vec3 finalPosition = aInitialPosition + spiralPosition;

	// Вычисляем размер частицы с учетом вариации
	float size = uSize + uSizeVariation * sin(time * 2.0);

	// Вычисляем свечение частицы
	vGlow = uGlow * (1.0 + sin(time * 3.0)) * 0.5;

	// Передаем позицию во фрагментный шейдер
	vPosition = finalPosition;

	// Устанавливаем финальную позицию и размер частицы
	gl_Position = projectionMatrix * modelViewMatrix * vec4(finalPosition, 1.0);
	gl_PointSize = size;
}`
const shader = {
	transparent: true,
	blending: AdditiveBlending,
	depthWrite: false,

	vertexShader: FirefliesVertex,
	fragmentShader: FirefliesFragment,
	uniforms: {
		uTime: {value: 0},
		uSpeed: {value: 1.0},
		uSize: {value: 10.0},
		uSizeVariation: {value: 5.0},
		uGlow: {value: 1.0},
	},
	attributes: {
		aStartTime: {value: []},
		aInitialPosition: {value: []},
	},
}

const firefliesCount = 60
const positionArray = new Float32Array(firefliesCount * 3)
const scaleArray = new Float32Array(firefliesCount)

for (let i = 0; i < firefliesCount; i++) {
	positionArray[i * 3 + 0] = (Math.random() - 0.5) * 4
	positionArray[i * 3 + 1] = (Math.random()) * 4
	positionArray[i * 3 + 2] = (Math.random() - 0.5) * 4
	scaleArray[i] = Math.random()
}

const {onLoop} = useRenderLoop()
console.log(FirefliesFragment)
onLoop(({elapsed}) => {
	shader.uniforms.uTime.value = elapsed
})
// const shader = {
// 	transparent: true,
// 	blending: AdditiveBlending,
// 	depthWrite: false,
//
// 	vertexShader: FirefliesVertex,
// 	fragmentShader: FirefliesFragment,
// 	uniforms: {
// 		uSize: {value: 100},
// 		uPixelRatio: {value: Math.min(window.devicePixelRatio, 2)},
// 		uTime: {value: 0},
// 	},
// }
//
//
// const particleSystem = shallowRef(null);
// const particleCount = 10000;
// const positions = new Float32Array(particleCount * 3);
// const colors = new Float32Array(particleCount * 3);
//
// const curve = new CatmullRomCurve3([
// 	new Vector3(-10, 0, 0),
// 	new Vector3(-5, 5, 0),
// 	new Vector3(0, 0, 0),
// 	new Vector3(5, -5, 3),
// 	new Vector3(10, 0, 0),
// ]);
//
// for (let i = 0; i < particleCount; i++) {
// 	const t = i / particleCount;
// 	const point = curve.getPoint(t);
// 	const offset = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(0.5);
//
// 	positions[i * 3] = point.x + offset.x;
// 	positions[i * 3 + 1] = point.y + offset.y;
// 	positions[i * 3 + 2] = point.z + offset.z;
//
// 	// Задаем начальные цвета частиц
// 	const color = new Color();
// 	color.setHSL(0.6, 1, 0.5); // Используем HSL для плавного перехода от красного к желтому
// 	// console.log(getHslColour(color))
//
// 	colors[i * 3] = color.r;
// 	colors[i * 3 + 1] = color.g;
// 	colors[i * 3 + 2] = color.b;
// }
//
// let time = 0;
// const speed = 0.01; // Уменьшаем скорость движения частиц
// const randomForce = 0.0001; // Уменьшаем силу случайного смещения
//
//
// onMounted(() => {
// 	const {scene} = useTres();
//
// 	const animate = () => {
// 		time += speed;
//
// 		if (particleSystem.value && particleSystem.value.geometry && positions) {
// 			for (let i = 0; i < particleCount; i++) {
// 				const t = (i / particleCount + time) % 1; // Нормализованное время
// 				const point = curve.getPoint(t);
//
// 				const currentPosition = new Vector3(
// 					positions[i * 3],
// 					positions[i * 3 + 1],
// 					positions[i * 3 + 2]
// 				);
//
//
// 				// Добавляем случайное смещение
// 				const randomOffset = new Vector3(
// 					(Math.random() * 100 - 50) * randomForce,
// 					(Math.random() * 100 - 50) * randomForce,
// 					(Math.random() * 100 - 50) * randomForce
// 				);
//
// 				// Обновляем позицию частицы
// 				currentPosition.add(randomOffset);
//
// 				// Проверяем, достигла ли частица конца кривой
// 				if (t >= 1) {
// 					// Если достигла, перемещаем её в начало кривой
// 					const startPoint = curve.getPoint(0);
// 					currentPosition.set(startPoint.x, startPoint.y, startPoint.z);
// 				}
//
// 				positions[i * 3] = currentPosition.x;
// 				positions[i * 3 + 1] = currentPosition.y;
// 				positions[i * 3 + 2] = currentPosition.z;
//
// 				// Обновляем цвет частицы
// 				const color = new Color();
//
// 				color.setHSL(0.3, 1, 0.5); // Используем HSL для плавного перехода от красного к желтому
// 				// colors[i * 3] = color.r;
// 				// colors[i * 3 + 1] = color.g;
// 				// colors[i * 3 + 2] = color.b;
// 			}
//
//
// 			particleSystem.value.geometry.attributes.position.needsUpdate = true;
// 			particleSystem.value.geometry.attributes.color.needsUpdate = true;
// 		}
//
// 		requestAnimationFrame(animate);
// 	};
//
// 	animate();
// });
</script>

<style lang="scss">

.TdParticles {
}
</style>
