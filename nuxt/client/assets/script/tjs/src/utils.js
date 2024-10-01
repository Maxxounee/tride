function getHypotenuse(a, b) {
	return (a ** 2 + b ** 2) ** 0.5;
}

function getCathetus(c) {
	return ((c ** 2) / 2) ** 0.5;
}

export {
	getHypotenuse,
	getCathetus,
};
