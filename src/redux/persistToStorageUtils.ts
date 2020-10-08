import { takeEvery, select } from 'redux-saga/effects';

import { State } from './reducer';

export const STORAGE_KEY = 'postcard-editor';

export function* persistToStorageSaga(): Generator {
    yield takeEvery('*', function* () {
        const state: State = yield select();
        window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.present));
    });
}

export function loadFromStorage(): State | undefined {
    const item = window.localStorage.getItem(STORAGE_KEY);
    if (!item) {
        return undefined;
    }
    return {
        past: [],
        present: JSON.parse(item),
        future: []
    };
}
