/**
 *
 * @param {Immutable.List} imageDataList
 * @param {string} mapElementId
 * @returns {Immutable.Map|null}
 */
export const findElementByMapElementId = (imageDataList, mapElementId) => {
	let finalFoundElement = null;
	imageDataList.forEach(imageData => {
		const foundElement = imageData.get('elements').find(element => {
			return element.get('id') === mapElementId;
		});
		if (foundElement) {
			finalFoundElement = foundElement;
			return false; // break
		}
	});
	return finalFoundElement;
};