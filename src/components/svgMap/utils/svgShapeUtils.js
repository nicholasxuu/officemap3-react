export const getShapeCenter = (shapeRef) => {
	let centerPoint = {x:0, y:0};
	switch (shapeRef.getAttribute('type')) {
		case 'path':
			centerPoint = getPathShapeCenter(shapeRef);
			break;
		case 'rect':
			centerPoint = getRectShapeCenter(shapeRef);
			break;
	}
	return centerPoint;
};

export const getPathShapeCenter = (pathRef) => {
	// i.e. m159.82008,340.61655l206.76723,-0.99887l0,244.7245l-155.82458,0l-50.94265,-243.72563z
	let svgD = pathRef.getAttribute('d');
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

export const getRectShapeCenter = (rectRef) => {
	const x = parseFloat(rectRef.getAttribute('x')) + (parseFloat(rectRef.getAttribute('width')) / 2);
	const y = parseFloat(rectRef.getAttribute('y')) + (parseFloat(rectRef.getAttribute('height')) / 2);
	return { x, y };
};