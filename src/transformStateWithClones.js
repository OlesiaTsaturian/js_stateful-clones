'use strict';

/**
 * @param {Object} state
 * @param {Object[]} actions
 *
 * @return {Object[]}
 */
function transformStateWithClones(state, actions) {
  let copy = { ...state };
  const res = [];

  actions.forEach((action) => {
    if (action.type === 'addProperties') {
      copy = { ...copy, ...action.extraData };
      res.push(copy);
    } else if (action.type === 'removeProperties') {
      const filterKeys = Object.keys(copy).filter(
        (key) => !action.keysToRemove.includes(key),
      );

      const newCopy = {};

      for (const key of filterKeys) {
        newCopy[key] = copy[key];
      }
      copy = newCopy;
      res.push(copy);
    } else if (action.type === 'clear') {
      copy = {};
      res.push(copy);
    }
  });

  return res;
}

module.exports = transformStateWithClones;
