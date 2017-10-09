import Immutable from 'immutable';

const DOMUtils = {
  /**
   *
   * @param {EventTarget} target
   * @param {Immutable.Map|Object} attributes
   */
  setAttributes(target, attributes) {
    if (typeof attributes === 'undefined') {
      return;
    }

    let cleanAttributes = attributes;
    // in case of immutable map, convert it to object first.
    if (Immutable.Iterable.isIterable(attributes)) {
      cleanAttributes = cleanAttributes.toJS();
    }

    // set attribute one by one
    for (const key of Object.keys(cleanAttributes)) {
      target.setAttribute(key, cleanAttributes[key]);
    }
  },
};

export default DOMUtils;
