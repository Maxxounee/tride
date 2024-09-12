<template>
	<div class="SearchResultRow">
		<template
			v-for="(item, index) in items"
			:key="index"
		>
			<div
				class="SearchResultRow__cell"
				:class="getClassModifiers(item)"
				v-on.stop="{
					mousemove: item.mousemove ?? null,
					click: item.click ?? null
				}"
			>
				<template v-if="item.key">
					{{ item.proxy ? item.proxy(data[item.key]) : data[item.key] }}
				</template>
				<img
					v-else-if="item.src"
					:src="item.src"
				/>
				<ClientOnly v-else-if="item.icon">
					<NuxtIcon
						filled
						:name="item.icon"
					/>
				</ClientOnly>
				<template v-else-if="item.text">
					{{ item.text }}
				</template>
			</div>
		</template>
	</div>
</template>

<script
	lang="ts"
	setup
>
interface TItemTypes {
	key?: string;
	src?: string;
	icon?: string;
	text?: string;
}

interface TItem extends TItemTypes {
	mousemove?();

	click?();

	proxy?(string);
}

type TProps = {
	data: {};
	items: TItem[];
}

const props = defineProps<TProps>();

function getClassModifiers(item: TItemTypes) {
	let modifiers = [];

	if (item.key) modifiers.push('key', `${item.key}`);
	else if (item.src) modifiers.push('src');
	else if (item.icon) modifiers.push('icon');
	else if (item.text) modifiers.push('template');

	return modifiers.reduce((acc, cur) => {
		acc += `SearchResultRow__cell_${cur} `;
		return acc;
	}, '').trim();
}

onMounted(() => {

})
</script>

<style lang="scss">

.SearchResultRow {
	width: 100%;

	&__cell {
		display: flex;
		align-items: center;
		justify-content: center;
	}
}
</style>
