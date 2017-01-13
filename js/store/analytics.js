/**
 * Created by Arman on 2016-10-30.
 *
 * @flow
 */


'use strict';

// const track = require('./track');

module.exports = store => next => action => {
    // track(action);
    return next(action);
};
