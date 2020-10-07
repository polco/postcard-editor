import { Reducer } from 'redux';

import Action from './actions';
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
            height: 600,
            textBlocks: []
        },
        {
            imageUrl: 'https://picsum.photos/id/1003/600/800',
            rotation: 0,
            width: 600,
            height: 800,
            textBlocks: []
        },
        {
            imageUrl: 'https://picsum.photos/id/1004/800/600',
            rotation: 0,
            width: 800,
            height: 600,
            textBlocks: []
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
        case 'addPostcard': {
            const width = Math.floor(Math.random() * 300 + 700); // 700 - 1000
            const height = Math.floor(Math.random() * 300 + 700); // 700 - 1000
            const id = Math.floor(Math.random() * 1000);
            return {
                ...state,
                postcards: [
                    ...state.postcards,
                    {
                        imageUrl: `https://picsum.photos/id/${id}/${width}/${height}`,
                        rotation: 0,
                        width,
                        height,
                        textBlocks: []
                    }
                ]
            };
        }
        case 'selectPostcard':
            return {
                ...state,
                selectedIndex: state.postcards.indexOf(action.postcard)
            };
        case 'removePostcard': {
            const index = state.postcards.indexOf(action.postcard);
            return {
                ...state,
                postcards: state.postcards.filter(
                    (postcard) => postcard !== action.postcard
                ),
                selectedIndex:
                    state.selectedIndex >= index
                        ? Math.max(state.selectedIndex - 1, 0)
                        : state.selectedIndex
            };
        }
        case 'rotatePostcard': {
            const postcard: Postcard = {
                ...state.postcards[state.selectedIndex],
                rotation: action.rotation
            };
            const postcards = [...state.postcards];
            postcards[state.selectedIndex] = postcard;

            return {
                ...state,
                postcards
            };
        }
        case 'rotate90Postcard': {
            const postcard = { ...state.postcards[state.selectedIndex] };
            postcard.rotation = Math.floor(postcard.rotation / 90) * 90 + 90;
            const postcards = [...state.postcards];
            postcards[state.selectedIndex] = postcard;

            return {
                ...state,
                postcards
            };
        }
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
        case 'addTextBlock': {
            const postcard = { ...state.postcards[state.selectedIndex] };
            postcard.textBlocks = [
                ...postcard.textBlocks,
                {
                    text: 'CLICK TO EDIT...',
                    x: action.x,
                    y: action.y,
                    rotation: postcard.rotation % 360
                }
            ];
            const postcards = [...state.postcards];
            postcards[state.selectedIndex] = postcard;

            return {
                ...state,
                postcards
            };
        }
        case 'updateTextBlockContent': {
            const postcard = { ...state.postcards[state.selectedIndex] };

            const textBlockIndex = postcard.textBlocks.indexOf(
                action.textBlock
            );
            postcard.textBlocks = [...postcard.textBlocks];
            postcard.textBlocks[textBlockIndex] = {
                ...action.textBlock,
                text: action.text
            };

            const postcards = [...state.postcards];
            postcards[state.selectedIndex] = postcard;

            return {
                ...state,
                postcards
            };
        }
        case 'updateTextBlockPosition': {
            const postcard = { ...state.postcards[state.selectedIndex] };

            const textBlockIndex = postcard.textBlocks.indexOf(
                action.textBlock
            );
            postcard.textBlocks = [...postcard.textBlocks];
            postcard.textBlocks[textBlockIndex] = {
                ...action.textBlock,
                x: action.x,
                y: action.y
            };

            const postcards = [...state.postcards];
            postcards[state.selectedIndex] = postcard;

            return {
                ...state,
                postcards
            };
        }
        case 'removeTextBlock': {
            const postcard = { ...state.postcards[state.selectedIndex] };
            postcard.textBlocks = postcard.textBlocks.filter(
                (t) => t !== action.textBlock
            );

            const postcards = [...state.postcards];
            postcards[state.selectedIndex] = postcard;

            return {
                ...state,
                postcards
            };
        }
        default:
            return state;
    }
};

export default reducer;
