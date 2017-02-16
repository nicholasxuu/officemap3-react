import { getShapeCenter } from './svgShapeUtils';

export const updateSelectedTip = (selectedLocationDOM, locations, selectLocationAction) => {
	if (selectedLocationDOM !== null) {
		const currentTarget = selectedLocationDOM;
		const elementId = currentTarget.id;
		const locationObj = locations.find((location) => {
			return location.get('mapElementId') === elementId;
		});
		const coordinates = currentTarget.getCTM();
		const shapeCenterPoint = getShapeCenter(currentTarget);
		const scaleMultiplier = coordinates.a; // svg box's scale comparing to current viewport size
		selectLocationAction(
			locationObj,
			coordinates.e + shapeCenterPoint.x * scaleMultiplier,
			coordinates.f + shapeCenterPoint.y * scaleMultiplier
		);
	}
};