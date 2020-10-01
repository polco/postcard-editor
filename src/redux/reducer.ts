import { Reducer } from 'redux';

import { Action } from 'redux/actions';
import Postcard from 'types/Postcard';

export interface State {
    list: Postcard[];
    selectedIndex: number;
}

const initalState: State = {
    list: [
        {
            imageUrl: 'https://picsum.photos/id/1002/800/600',
            rotation: 0,
            scale: 1
        },
        {
            imageUrl: 'https://picsum.photos/id/1003/800/600',
            rotation: 0,
            scale: 1
        }
    ],
    selectedIndex: 0
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
