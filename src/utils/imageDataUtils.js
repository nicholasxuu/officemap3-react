/**
 *
 * @param {Immutable.List} imageDataCollection
 * @param {string} mapElementId
 * @returns {Immutable.Map|null}
 */
export const findElementByMapElementId = (imageDataCollection, mapElementId) => {
	let finalImageId = null;
	let finalFoundElement = null;
	imageDataCollection.forEach((imageData, imageId) => {
		const foundElement = imageData.get('elements').find(element => {
			return element.get('id') === mapElementId;
		});
		if (foundElement) {
			finalImageId = imageId;
			finalFoundElement = foundElement;
			return false; // break
		}
	});
	return {
		imageId: finalImageId,
		element: finalFoundElement
	};
};