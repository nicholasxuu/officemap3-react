/* eslint-env browser */

const LocalStorageUtils = {
  get(key) {
    if (localStorage) {
      return localStorage.getItem(key);
    }
    return null;
  },

  set(key, value) {
    if (localStorage) {
      return localStorage.setItem(key, value);
    }
    return null;
  },

  delete(key) {
    if (localStorage) {
      return localStorage.removeItem(key);
    }
    return null;
  },

  /**
   * Return a list of localstorage keys, matching the prefix.
   * @param keyPrefix
   * @returns {Array}
   */
  list(keyPrefix) {
    const retList = [];
    if (!localStorage) {
      return retList;
    }

    for (let i = 0; i < localStorage.length; i += 1) {
      if (localStorage.key(i).startsWith(keyPrefix)) {
        retList.push(localStorage.key(i));
      }
    }
    return retList;
  },

  deleteMany(keyPrefix) {
    if (!localStorage) {
      return false;
    }

    const keyList = this.list(keyPrefix);
    keyList.forEach(key => this.delete(key));
    return true;
  },
};

export default LocalStorageUtils;
