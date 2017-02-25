export const getTouchDistanceSquare = (targetTouches) => {
	return (targetTouches[0].screenX - targetTouches[1].screenX) ** 2 + (targetTouches[0].screenY - targetTouches[1].screenY) ** 2;
};


// Note use screenX, not clientX, because iOS safari with retina screen only do well with screenX.

export const getMultiTouchScreenCenter = (e) => {
	let x = 0;
	let y = 0;

	let xCount = 0;
	let yCount = 0;

	for (let i = 0; i < e.targetTouches.length; i++) {
		if (typeof e.targetTouches[i].screenX !== 'undefined') {
			x += e.targetTouches[i].screenX;
			xCount++;
		}

		if (typeof e.targetTouches[i].screenY !== 'undefined') {
			y += e.targetTouches[i].screenY;
			yCount++;
		}
	}

	x = x / xCount;
	y = y / yCount;

	return {x, y}
};

export const getCursorScreenPoint = (e) => {
	const x = typeof e.screenX === 'undefined' ? 0 : e.screenX;
	const y = typeof e.screenY === 'undefined' ? 0 : e.screenY;
	return {x, y}
};