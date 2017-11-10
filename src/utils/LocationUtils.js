const LocationUtils = {
  /**
   * @param {Immutable.List} locations
   * @param {string} mapElementId
   * @returns {Immutable.Map}
   */
  findLocationByMapElementId(locations, mapElementId) {
    return locations.find(locationObj =>
      locationObj.get('mapElementId') === mapElementId);
  },
};

export default LocationUtils;
