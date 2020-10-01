import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import Main from 'components/Main';

import postcardReducer from 'redux/reducer';

import 'index.scss';

import { createStore } from 'redux';

const store = createStore(postcardReducer);

ReactDOM.render(
    <Provider store={store}>
        <Main />
    </Provider>,
    document.getElementById('root')
);
