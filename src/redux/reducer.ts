import { Reducer } from 'redux';

import { Action } from 'redux/actions';
import Postcard from 'types/Postcard';

export interface State {
    postcards: Postcard[];
    selectedIndex: number;
    zoom: number;
}

const initalState: State = {
    postcards: [
        {
            imageUrl: 'https://picsum.photos/id/1002/800/600',
            rotation: 0,
            width: 800,
            height: 600
        },
        {
            imageUrl: 'https://picsum.photos/id/1003/600/800',
            rotation: 0,
            width: 600,
            height: 800
        }
    ],
    selectedIndex: 0,
    zoom: 1
};

const reducer: Reducer<State, Action> = (state = initalState, action) => {
    switch (action.type) {
        case 'selectPostcard':
            return {
                ...state,
                selectedIndex: action.index
            };
        default:
            return state;
    }
};

export default reducer;
