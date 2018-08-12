import { createStore, applyMiddleware, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'
import {reducers} from '../reducers'
import {WatchAll} from '../sagas'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
    reducers,
    compose(
        applyMiddleware(sagaMiddleware),
        window.devToolsExtension()
    )
);

sagaMiddleware.run(WatchAll)
