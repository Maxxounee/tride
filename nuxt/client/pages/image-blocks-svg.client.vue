<template>
	<div class="image-blocks-svg">
		<svg class="grid" viewBox="0 0 500 500">
			<!-- Здесь будут добавлены квадраты -->
		</svg>
	</div>
</template>

<script lang="ts" setup>
onMounted(() => {
	const svg = document.querySelector('.grid');
	const totalSquares = 100;
	const transparentSquares = [10, 78, 30, 40, 50]; // Индексы квадратов, которые будут полупрозрачными

	const transparent = {
		0: 0.5,
		34: 0.7,
		78: 0.7,
		40: 0.7,
		50: 0.7,
	}
	
	const W3 = 'http://www.w3.org/2000/svg';

	for (let i = 0; i < totalSquares; i++) {
		const rect = document.createElementNS(W3, 'rect');
		const text = document.createElementNS(W3, 'text');

		const x = (i % 10) * 50;
		const y = Math.floor(i / 10) * 50;
		const width = 50;
		const height = 50;

		[text, rect].forEach((el) => {
			el.setAttribute('x', x);
			el.setAttribute('y', y);
			el.setAttribute('width', width);
			el.setAttribute('height', height);
		})


		const opacity = String(transparent[i] ?? 1);
		console.log(opacity)

		text.innerHTML = `i: ${i}`;

		rect.setAttribute('fill-opacity', opacity); // Устанавливаем полупрозрачность
		rect.setAttribute('fill', 'url(#image)');
		rect.setAttribute('data-index', String(i));
		rect.setAttribute('data-opacity', opacity);

		svg.appendChild(rect);
		svg.appendChild(text);
	}

	// Добавляем изображение в качестве фона
	const defs = document.createElementNS(W3, 'defs');
	const pattern = document.createElementNS(W3, 'pattern');
	pattern.setAttribute('id', 'image');
	pattern.setAttribute('patternUnits', 'userSpaceOnUse');
	pattern.setAttribute('width', 500);
	pattern.setAttribute('height', 500);

	const image = document.createElementNS(W3, 'image');
	image.setAttribute('href', '/images/brullov.jpg'); // Замените на путь к вашему изображению
	image.setAttribute('width', 500);
	image.setAttribute('height', 500);

	pattern.appendChild(image);
	defs.appendChild(pattern);
	svg.appendChild(defs);
})
</script>

<style lang="scss">

.image-blocks-svg {
	width: 100%;
	height: 100%;
	background: #202638;

	text {
		font-size: 10px;
	}

	rect {
		content: var(--rect-number);
		position: relative;

		// fill-opacity: 0.5;

		&::after {
			content: var(--rect-number);

			// content: '123';

			position: absolute;
			top: 50%;

			display: block;

			font-size: 30px;
		}
	}
}
</style>
