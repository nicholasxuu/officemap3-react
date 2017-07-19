/**
 *
 * @param {Immutable.List} locations
 * @param {string} mapElementId
 * @returns {Immutable.Map}
 */
export const findLocationByMapElementId = (locations, mapElementId) => {
	return locations.find(locationObj => {
		return locationObj.get('mapElementId') === mapElementId;
	});
};