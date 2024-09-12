module.exports = {
	save_errors_files: 		true,
	output_folder_clear: 	true,
	input_folder: 			'\\\\superstorage\\dev\\Plans\\alean\\generate\\living\\floors',
	task: [
		{
			output_folder: 	'nuxt/public/hydra/living/vector/floors',
			selection_save: 1,
		},
		{
			output_folder: 	'nuxt/public/hydra/living/vector/lots',
			selection_crop: 0,
		},
	],
};