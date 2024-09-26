<template>
	<Suspense>
		<ClientOnly>

			<TresCanvas class="particles-2" v-bind="gl">
				<TdParticles />
				<OrbitControls />
				<!--<Precipitation />-->
				<TresPerspectiveCamera :position="[0, 0, 10]" />
				<TresDirectionalLight :position="[1, 1, 1]" />
			</TresCanvas>
		</ClientOnly>
	</Suspense>
</template>

<script setup>

import { CatmullRomCurve3, Vector3 } from 'three';

const particleSystem = shallowRef(null);
const particleCount = 1000;
const positions = new Float32Array(particleCount * 3);
const scaleArray = new Float32Array(particleCount);

const curve = new CatmullRomCurve3([
	new Vector3(-10, 0, 0),
	new Vector3(-5, 5, 0),
	new Vector3(0, 0, 0),
	new Vector3(5, -5, 3),
	new Vector3(10, 0, 0),
]);

for (let i = 0; i < particleCount; i++) {
	const t = i / particleCount;
	const point = curve.getPoint(t);
	const offset = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(0.5);
	positions[i * 3] = point.x + offset.x;
	positions[i * 3 + 1] = point.y + offset.y;
	positions[i * 3 + 2] = point.z + offset.z;
}
// for (let i = 0; i < particleCount; i++) {
// 	positionsArray[i * 3 + 0] = (Math.random() - 0.5) * 12;
// 	positionsArray[i * 3 + 1] = (Math.random() - 0.5) * 12;
// 	positionsArray[i * 3 + 2] = (Math.random() - 0.5) * 12;
// 	scaleArray[i] = Math.random();
// }
let time = 0;
const speed = 0.0001; // Уменьшаем скорость движения частиц
const attractionForce = 0.01; // Добавляем небольшое ускорение
const randomForce = 0.005; // Сила случайного смещения
const repulsionForce = 0.01; // Сила отталкивания между частицами
onMounted(()=>{
	const { scene } = useTres();

	const animate = ()=>{
		time += speed;

		if (particleSystem.value && particleSystem.value.geometry && positions) {
			for (let i = 0; i < particleCount; i++) {
				const t = (i / particleCount + time) % 1; // Нормализованное время
				const point = curve.getPoint(t);
				const currentPosition = new Vector3(
					positions[i * 3],
					positions[i * 3 + 1],
					positions[i * 3 + 2],
				);

				// Вычисляем вектор притяжения
				const attractionVector = point.clone().sub(currentPosition).multiplyScalar(attractionForce);

				const randomOffset = new Vector3(
					// (Math.random() * 2 - 1) * randomForce,
					// (Math.random() * 2 - 1) * randomForce,
					// (Math.random() * 2 - 1) * randomForce
				);
				// Обновляем позицию частицы

				// console.log('t', t)

				const repulsionVector = new Vector3();
				for (let j = 0; j < particleCount; j++) {
					if (i !== j) {
						const otherPosition = new Vector3(
							positions[j * 3],
							positions[j * 3 + 1],
							positions[j * 3 + 2],
						);
						const distance = currentPosition.distanceTo(otherPosition);
						if (distance > 0 && distance < 0.5) {
							const repulsion = otherPosition.clone().sub(currentPosition).normalize().multiplyScalar(-repulsionForce / distance);
							repulsionVector.add(repulsion);
						}
					}
				}

				if (t >= 0.99) {
					// Если достигла, перемещаем её в начало кривой
					console.log('ift');
					const startPoint = curve.getPoint(0);
					currentPosition.set(startPoint.x, startPoint.y, startPoint.z);
				} else {
					currentPosition.add(attractionVector).add(randomOffset).add(repulsionVector);
					// currentPosition.add(attractionVector).add(randomOffset);
				}

				positions[i * 3] = currentPosition.x;
				positions[i * 3 + 1] = currentPosition.y;
				positions[i * 3 + 2] = currentPosition.z;
			}

			particleSystem.value.geometry.attributes.position.needsUpdate = true;
		}

		requestAnimationFrame(animate);
	};
	// const animate = () => {
	// 	time += speed;
	//
	// 	if (particleSystem.value && particleSystem.value.geometry && positions) {
	// 		for (let i = 0; i < particleCount; i++) {
	// 			const t = (i / particleCount + time) % 1; // Нормализованное время
	// 			const point = curve.getPoint(t);
	//
	// 			const offset = new Vector3(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1).multiplyScalar(0.5);
	//
	// 			positions[i * 3] = point.x + offset.x;
	// 			positions[i * 3 + 1] = point.y + offset.y;
	// 			positions[i * 3 + 2] = point.z + offset.z;
	// 		}
	//
	// 		particleSystem.value.geometry.attributes.position.needsUpdate = true;
	// 	}
	//
	// 	requestAnimationFrame(animate);
	// };
	animate();

	// console.log('useTresContext()', useTresContext())
});

</script>

<style lang="scss">
.particles-2 {
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
