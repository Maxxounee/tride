// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
	{
		rules: {
			'@typescript-eslint/no-explicit-any': ['off'],
			'vue/multi-word-component-names': ['off'],
			'vue/no-v-html': ['off'],
			'vue/max-attributes-per-line': [
				'error',
				{
					singleline: {
						max: 1,
					},
					multiline: {
						max: 1,
					},
				},
			],
		},
	},
	{
		ignores: ['modules/**/runtime/*.*'],
	},
);
