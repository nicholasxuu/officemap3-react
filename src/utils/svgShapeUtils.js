import Immutable from 'immutable';

/**
 *
 * @param {Immutable.Map} shapeObj
 * @returns {{x: number, y: number}}
 */
export const getShapeCenter = (shapeObj) => {
	let centerPoint = {x:0, y:0};
	switch (shapeObj.get('componentName')) {
		case 'path':
			centerPoint = getPathShapeCenter(shapeObj);
			break;
		case 'rect':
			centerPoint = getRectShapeCenter(shapeObj);
			break;
	}
	return centerPoint;
};

/**
 *
 * @param {Immutable.Map} pathObj
 * @returns {{x: number, y: number}}
 */
export const getPathShapeCenter = (pathObj) => {
	// i.e. m159.82008,340.61655l206.76723,-0.99887l0,244.7245l-155.82458,0l-50.94265,-243.72563z
	let svgD = pathObj.get('d');
	svgD = svgD.substr(1, svgD.length-2);
	const pathList = svgD.split('l').map(item => item.split(',').map(number => parseFloat(number)));

	let edgeMaxX = 0;
	let edgeMinX = 0;
	let edgeMaxY = 0;
	let edgeMinY = 0;
	let currPoint = null;

	pathList.map(vector => {
		if (currPoint === null) {
			currPoint = vector;

			edgeMaxX = currPoint[0];
			edgeMinX = currPoint[0];
			edgeMaxY = currPoint[1];
			edgeMinY = currPoint[1];
		} else {
			currPoint[0] = currPoint[0] + vector[0];
			currPoint[1] = currPoint[1] + vector[1];

			edgeMaxX = Math.max(currPoint[0], edgeMaxX);
			edgeMinX = Math.min(currPoint[0], edgeMinX);
			edgeMaxY = Math.max(currPoint[1], edgeMaxY);
			edgeMinY = Math.min(currPoint[1], edgeMinY);
		}

		return vector;
	});

	const x = (edgeMinX + edgeMaxX) / 2;
	const y = (edgeMinY + edgeMaxY) / 2;
	return { x, y };
};

/**
 *
 * @param {Immutable.Map} rectObj
 * @returns {{x: number, y: number}}
 */
export const getRectShapeCenter = (rectObj) => {
	const x = parseFloat(rectObj.get('x')) + (parseFloat(rectObj.get('width')) / 2);
	const y = parseFloat(rectObj.get('y')) + (parseFloat(rectObj.get('height')) / 2);
	return { x, y };
};