const TouchUtils = {
  /**
   * @param touches
   * @returns {number}
   */
  getTouchDistanceSquare(touches) {
    return (touches[0].screenX - touches[1].screenX) ** 2 + (touches[0].screenY - touches[1].screenY) ** 2;
  },


  /**
   * Note: use screenX, not clientX, because iOS safari with retina screen only do well with screenX.
   * @param {Event} e
   * @returns {{x: number, y: number}}
   */
	getMultiTouchScreenCenter(e) {
	  let x = 0;
	  let y = 0;

	  let xCount = 0;
	  let yCount = 0;

	  if (!e.touches) {
	    return {x, y};
	  }

	  const touchFingerCount = e.touches.length;
	  for (let i = 0; i < touchFingerCount; i++) {
	    if (typeof e.touches[i].screenX !== 'undefined') {
	      x += e.touches[i].screenX;
	      xCount++;
	    }

	    if (typeof e.touches[i].screenY !== 'undefined') {
	      y += e.touches[i].screenY;
	      yCount++;
	    }
	  }

	  x /= xCount;
	  y /= yCount;

	  return {x, y}
	},

  /**
   *
   * @param {Event} e
   * @returns {{x: number, y: number}}
   */
	getCursorScreenPoint(e) {
	  const x = typeof e.screenX === 'undefined' ? 0 : e.screenX;
	  const y = typeof e.screenY === 'undefined' ? 0 : e.screenY;
	  return {x, y}
	},
};

export default TouchUtils;