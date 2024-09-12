<template>
	<div class="SearchResultHeader">
		<div
			v-for="(item, index) in items"
			:key="index"
			class="SearchResultHeader__cell"
			:class="[
				item.key,
				{
					disabled: !item.key,
					desc: item.key === currentSortKey && reversed,
					asc: item.key === currentSortKey && !reversed,
				}
			]"
			@click="sortBy(item.key)"
		>

			<div
				class="SearchResultHeader__title"

			>
				<NuxtIcon
					class="SearchResultHeader__icon"
					v-if="icon"
					:name="icon"
					filled
				/>
				<span v-html="item.title"></span>
			</div>
		</div>
	</div>
</template>

<script
	lang="ts"
	setup
>
type TItem = {
	key?: string;
	title: string;
}
type TProps = {
	icon?: string;
	firstClickReverse?: boolean;
	disabled?: boolean;
	items: TItem[];
	data: [];
	mountedSortKey?: string;
}
const props = withDefaults(defineProps<TProps>(), {
	firstClickRevers: false,
	disabled: false,
})

type TEmits = { (e: "result", []): void; }
const emit = defineEmits<TEmits>();

const currentSortKey = ref<string>();
const reversed = ref<boolean>(false);
const mountedDataHandled = ref<boolean>(false);

watch(
	() => props.data,
	(value) => {
		if (props.mountedSortKey && !mountedDataHandled.value && value?.length) {
			sortBy(props.mountedSortKey, false);
			mountedDataHandled.value = true;
		} else {
			sortBy(currentSortKey.value, false)
		}
	},
	{deep: true, immediate: props.mountedSortKey}
)

onMounted(() => {

})

function sortBy(key, changeReverseState = true) {
	if (!key) return null;

	if (changeReverseState) {
		reversed.value = currentSortKey.value === key ? !reversed.value : props.firstClickReverse;
	}
	currentSortKey.value = key;

	const newResult = [...props.data];
	const itemsValueType = typeof newResult[0]?.[key];

	if (itemsValueType === 'string') {
		newResult.sort((a, b) => b[key] < a[key] ? 1 : -1);
	} else if (itemsValueType === 'number') {
		newResult.sort((a, b) => b[key] - a[key]);
	}

	emit('result', reversed.value ? newResult : newResult.reverse());
}

</script>

<style lang="scss">

.SearchResultHeader {
	user-select: none;

	&__cell {
		cursor: pointer;

		position: relative;

		display: flex;
		align-items: center;
		justify-content: center;

		.SearchResultHeader__icon {
			opacity: 0;
		}

		&.asc,
		&.desc {
			&:not(.disabled) {
				.SearchResultHeader__icon {
					opacity: 1;
				}
			}
		}

		&.asc {
			.SearchResultHeader__icon {
				rotate: 180deg;
			}
		}

		&.disabled {
			pointer-events: none;
			cursor: default;
		}
	}

	&__title {
		position: relative;
	}

	&__icon {
		position: absolute;
		display: block;
		transition-duration: 0.2s;
		transition-property: opacity, rotate;
	}
}
</style>
