/**
 * Created by Arman on 2016-10-30.
 */

'use strict';

module.exports = store => next => action =>
    Array.isArray(action)
        ? action.map(next)
        : next(action);
