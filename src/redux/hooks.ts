import {
    TypedUseSelectorHook,
    useDispatch as reduxUseDispatch,
    useSelector as reduxUseSelector
} from 'react-redux';
import { Dispatch } from 'redux';

import Action from './actions';
import { State } from './reducer';

export const useDispatch: () => Dispatch<Action> = reduxUseDispatch;

export const useSelector: TypedUseSelectorHook<State> = reduxUseSelector;
