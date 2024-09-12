export default (
	cost?: number,
	opt?: {
		type?: 'currency' | 'decimal';
		currency?: 'RUB' | 'EUR' | 'USD' | null;
		minFraction?: number;
		maxFraction?: number;
	},
) => {
	if (cost === undefined || cost === null) {
		return;
	}
	return new Intl.NumberFormat('ru-RU', {
		style: opt?.type,
		currency: opt?.currency ?? 'RUB',
		minimumFractionDigits: opt?.minFraction ?? 0,
		maximumFractionDigits: opt?.maxFraction ?? 1,
	}).format(cost);
};
