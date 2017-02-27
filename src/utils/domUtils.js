import Immutable from 'immutable';

/**
 *
 * @param {DOM} target
 * @param {Immutable.Map|Object} attributes
 */
export const setAttributes = (target, attributes) => {
	if (typeof attributes === 'undefined') {
		return;
	}

	// in case of immutable map, convert it to object first.
	if (Immutable.Iterable.isIterable(attributes)) {
		attributes = attributes.toJS();
	}

	// set attribute one by one
	for(let key of Object.keys(attributes)) {
		target.setAttribute(key, attributes[key]);
	}

};