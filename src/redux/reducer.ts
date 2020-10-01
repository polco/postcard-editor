import { Reducer } from 'redux';

import { Action } from 'redux/actions';
import Postcard from 'types/Postcard';

export interface State {
    postcards: Postcard[];
    selectedIndex: number;
    zoom: number;
}

export const initialState: State = {
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
        },
        {
            imageUrl: 'https://picsum.photos/id/1004/800/600',
            rotation: 0,
            width: 800,
            height: 600
        }
    ],
    selectedIndex: 0,
    zoom: 1
};

const reducer: Reducer<Readonly<State>, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'selectPostcard':
            return {
                ...state,
                selectedIndex: state.postcards.indexOf(action.postcard)
            };
        case 'rotatePostcard':
            const postcard = { ...state.postcards[state.selectedIndex] };
            postcard.rotation = postcard.rotation + 90;
            const postcards = [...state.postcards];
            postcards[state.selectedIndex] = postcard;

            return {
                ...state,
                postcards
            };
        case 'zoomIn':
            return {
                ...state,
                zoom: state.zoom + 0.1
            };
        case 'zoomOut':
            return {
                ...state,
                zoom: state.zoom - 0.1
            };
        default:
            return state;
    }
};

export default reducer;
