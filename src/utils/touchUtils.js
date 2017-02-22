export const getTouchDistanceSquare = (targetTouches) => {
	return (targetTouches[0].clientX - targetTouches[1].clientX) ** 2 + (targetTouches[0].clientY - targetTouches[1].clientY) ** 2;
};

export const getMultiTouchCenter = (e) => {
	const x = typeof e.clientX === 'undefined' ? (e.targetTouches[1] ? (e.targetTouches[0].clientX + e.targetTouches[1].clientX) / 2 : e.targetTouches[0].clientX) : e.clientX;
	const y = typeof e.clientY === 'undefined' ? (e.targetTouches[1] ? (e.targetTouches[0].clientY + e.targetTouches[1].clientY) / 2 : e.targetTouches[0].clientY) : e.clientY;
	return {x, y}
};