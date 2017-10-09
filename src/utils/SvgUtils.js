const SvgUtils = {
  /**
   *
   * @param {{x: int, y: int}} svgPos
   * @param {[number, number, number, number, number, number]|SVGMatrix} svgTransformMatrix
   * @returns {{x: int, y: int}}
   */
  svgPosToPagePos(svgPos = { x: 0, y: 0 }, svgTransformMatrix = [1, 0, 0, 1, 0, 0]) {
    const pageX = (svgPos.x * svgTransformMatrix[0]) + svgTransformMatrix[4];
    const pageY = (svgPos.y * svgTransformMatrix[3]) + svgTransformMatrix[5];
    return { x: pageX, y: pageY };
  },

  getTransformMatrix(svgOffsetX, svgOffsetY, svgZoomScale, imageWidth, imageHeight) {
    const matrix = [1, 0, 0, 1, 0, 0];

    // pan
    matrix[4] = svgOffsetX;
    matrix[5] = svgOffsetY;

    // zoom
    const matrixLength = matrix.length;
    for (let i = 0; i < matrixLength; i += 1) {
      matrix[i] *= svgZoomScale;
    }
    // zoom from center of viewbox (viewBox height/width === image height/width)
    matrix[4] += ((1 - svgZoomScale) * imageWidth) / 2;
    matrix[5] += ((1 - svgZoomScale) * imageHeight) / 2;

    return matrix;
  },

  matrixMultiply(immutableMatrix, arrayMatrix) {
    const a = immutableMatrix.get('a') * arrayMatrix[0];
    const b = 0;
    const c = 0;
    const d = immutableMatrix.get('d') * arrayMatrix[3];
    const e = (immutableMatrix.get('a') * arrayMatrix[4]) + immutableMatrix.get('e');
    const f = (immutableMatrix.get('d') * arrayMatrix[5]) + immutableMatrix.get('f');
    return [a, b, c, d, e, f];
  },
};

export default SvgUtils;
