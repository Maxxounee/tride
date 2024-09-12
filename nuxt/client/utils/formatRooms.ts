export default (roomsCount?: number, numberOnly?: boolean) => {
	if (roomsCount === undefined || roomsCount === null) {
		return;
	}
	return roomsCount === 0 ? 'СТ' : (roomsCount + (numberOnly ? '' : 'К'));
};
