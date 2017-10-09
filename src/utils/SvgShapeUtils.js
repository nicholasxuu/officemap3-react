
const SvgShapeUtils = {
  /**
   *
   * @param {Immutable.Map} pathObj
   * @returns {{x: number, y: number}}
   */
  getPathShapeCenter(pathObj) {
    // i.e. m159.82008,340.61655l206.76723,-0.99887l0,244.7245l-155.82458,0l-50.94265,-243.72563z
    let svgD = pathObj.get('d');
    svgD = svgD.substr(1, svgD.length - 2);
    const pathList = svgD.split('l').map(item => item.split(',').map(number => parseFloat(number)));

    let edges = {
      edgeMaxX: 0,
      edgeMinX: 0,
      edgeMaxY: 0,
      edgeMinY: 0,
    };
    let currPoint = null;

    pathList.map((vector) => {
      if (currPoint === null) {
        currPoint = vector;

        edges = {
          edgeMaxX: currPoint[0],
          edgeMinX: currPoint[0],
          edgeMaxY: currPoint[1],
          edgeMinY: currPoint[1],
        };
      } else {
        currPoint[0] += vector[0];
        currPoint[1] += vector[1];

        edges.edgeMaxX = Math.max(currPoint[0], edges.edgeMaxX);
        edges.edgeMinX = Math.min(currPoint[0], edges.edgeMinX);
        edges.edgeMaxY = Math.max(currPoint[1], edges.edgeMaxY);
        edges.edgeMinY = Math.min(currPoint[1], edges.edgeMinY);
      }

      return vector;
    });

    const x = (edges.edgeMinX + edges.edgeMaxX) / 2;
    const y = (edges.edgeMinY + edges.edgeMaxY) / 2;
    return { x, y };
  },

  /**
   *
   * @param {Immutable.Map} rectObj
   * @returns {{x: number, y: number}}
   */
  getRectShapeCenter(rectObj) {
    const x = parseFloat(rectObj.get('x')) + (parseFloat(rectObj.get('width')) / 2);
    const y = parseFloat(rectObj.get('y')) + (parseFloat(rectObj.get('height')) / 2);
    return { x, y };
  },

  /**
   *
   * @param {Immutable.Map} shapeObj
   * @returns {{x: number, y: number}}
   */
  getShapeCenter(shapeObj) {
    let centerPoint = { x: 0, y: 0 };
    switch (shapeObj.get('data-component-name')) {
      case 'path':
        centerPoint = this.getPathShapeCenter(shapeObj);
        break;
      case 'rect':
        centerPoint = this.getRectShapeCenter(shapeObj);
        break;
      default:
    }
    return centerPoint;
  },

};

export default SvgShapeUtils;
