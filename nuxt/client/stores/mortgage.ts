export const useMortgageStore = defineStore('mortgageStore', () => {
	const downPaymentTemplates = {
		one: (value: number | string) => ({
			downPayment: value,
			downPaymentTemplate: `${value}% на первый год`,
		}),
		two: (value: number | string) => ({
			downPayment: value,
			downPaymentTemplate: `От ${value}%`,
		}),
	}
	const interestRateTemplate = (value: string | number) => ({
		interestRate: value,
		interestRateTemplate: `${value}%`,
	})

	const programs = [
		/** Совкомбанк */
		{
			bankName: 'Совкомбанк',
			...downPaymentTemplates.one(20.1),
			...interestRateTemplate(15.9),
		},
		{
			bankName: 'Совкомбанк',
			...downPaymentTemplates.one(25),
			...interestRateTemplate(14.9),
		},
		{
			bankName: 'Совкомбанк',
			...downPaymentTemplates.one(30),
			...interestRateTemplate(12.9),
		},
		{
			bankName: 'Совкомбанк',
			...downPaymentTemplates.one(40),
			...interestRateTemplate(8.9),
		},
		{
			bankName: 'Совкомбанк',
			...downPaymentTemplates.one(45),
			...interestRateTemplate(7.9),
		},
		{
			bankName: 'Совкомбанк',
			...downPaymentTemplates.one(50),
			...interestRateTemplate(4.9),
		},

		/** Сбербанк */
		{
			bankName: 'Сбербанк',
			...downPaymentTemplates.two(20.1),
			...interestRateTemplate(20.6),
		},

		/** Альфа банк */
		{
			bankName: 'Альфа банк',
			...downPaymentTemplates.two(20.1),
			...interestRateTemplate(21.99),
		},
	]
	return {
		programs,
	};
});
