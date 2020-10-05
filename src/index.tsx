import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import Main from 'components/Main';

import reducer from 'redux/reducer';
import {
    loadFromStorage,
    persistToStorageSaga
} from 'redux/persistToStorageUtils';

import 'index.scss';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(
    reducer,
    loadFromStorage(),
    applyMiddleware(sagaMiddleware)
);
sagaMiddleware.run(persistToStorageSaga);

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
