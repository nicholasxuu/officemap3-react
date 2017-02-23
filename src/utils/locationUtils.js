/**
 *
 * @param {Immutable.List} locations
 * @param {string} mapElementId
 * @returns {Immutable.Map}
 */
export const findLocationByMapElementId = (locations, mapElementId) => {
	return locations.find(location => {
		return location.get('mapElementId') === mapElementId;
	});
};