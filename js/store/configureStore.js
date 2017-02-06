/**
 * Created by Arman on 2016-10-30.
 *
 * @flow
 */

'use strict';

import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
var promise = require('./promise');
var array = require('./array');
var analytics = require('./analytics');
var reducers = require('../reducers');
var createLogger = require('redux-logger');

import {persistStore, autoRehydrate} from 'redux-persist';
var {AsyncStorage} = require('react-native');

var isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent;

var logger = createLogger({
    predicate: (getState, action) => isDebuggingInChrome,
    collapsed: true,
    duration: true,
});


var createAppStore = applyMiddleware(thunk, promise, array, analytics, logger)(createStore);


function configureStore(onComplete: ?() => void) {
    // TODO(frantic): reconsider usage of redux-persist, maybe add cache breaker
    const store = autoRehydrate()(createAppStore)(reducers);
    persistStore(store, {storage: AsyncStorage}, onComplete);
    if (isDebuggingInChrome) {
        window.store = store;
    }
    return store;
}

module.exports = configureStore;
