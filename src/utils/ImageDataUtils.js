
const ImageDataUtils = {
  /**
   *
   * @param {Immutable.List} imageDataCollection
   * @param {string} mapElementId
   * @returns {object}
   */
  findElementByMapElementId(imageDataCollection, mapElementId) {
    let finalImageId = null;
    let finalFoundElement = null;
    imageDataCollection.forEach((imageData, imageId) => {
      const foundElement = imageData.get('elements').find(element =>
        element.get('id') === mapElementId);

      if (foundElement) {
        finalImageId = imageId;
        finalFoundElement = foundElement;
        return false; // break
      }
      return true;
    });
    return {
      imageId: finalImageId,
      element: finalFoundElement,
    };
  },
};

export default ImageDataUtils;
