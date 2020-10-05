import {
    addNewTextBlock,
    removeTextBlock,
    rotatePostcard,
    selectPostcard,
    updateTextBlockContent,
    updateTextBlockPosition,
    zoomIn,
    zoomOut
} from './postcardActions';
import reducer, { initialState, State } from './postcardReducer';

test('reducer: test zooming', () => {
    const state = initialState;
    expect(reducer(state, zoomIn())).toEqual<State>({
        ...state,
        zoom: 1.1
    });

    expect(reducer(state, zoomOut())).toEqual<State>({
        ...state,
        zoom: 0.9
    });
});

test('reducer: test rotating', () => {
    const state = initialState;
    expect(reducer(state, rotatePostcard())).toEqual<State>({
        ...state,
        postcards: [
            { ...state.postcards[0], rotation: 90 },
            ...state.postcards.slice(1)
        ]
    });
});

test('reducer: test selecting a postcard', () => {
    const state = initialState;
    expect(reducer(state, selectPostcard(state.postcards[1]))).toEqual<State>({
        ...state,
        selectedIndex: 1
    });
});

test('reducer: any undefined action returns the state', () => {
    const state = initialState;
    expect(reducer(state, { type: 'hehe' } as any)).toBe(state);
});

test('reducer: default state is correct', () => {
    expect(reducer(undefined, {} as any)).toBe(initialState);
});

test('reducer: test adding a text block', () => {
    const state: State = {
        ...initialState,
        postcards: [
            { ...initialState.postcards[0], rotation: 90 },
            ...initialState.postcards.slice(1)
        ]
    };
    expect(reducer(state, addNewTextBlock(50, 10))).toEqual<State>({
        ...state,
        postcards: [
            {
                ...state.postcards[0],
                textBlocks: [
                    { text: 'CLICK TO EDIT...', x: 50, y: 10, rotation: 90 }
                ]
            },
            ...state.postcards.slice(1)
        ]
    });
});

const stateWithText: State = {
    ...initialState,
    postcards: [
        {
            ...initialState.postcards[0],
            textBlocks: [{ text: 't', x: 0, y: 0, rotation: 0 }]
        },
        ...initialState.postcards.slice(1)
    ]
};

test('reducer: test updating a text block content', () => {
    expect(
        reducer(
            stateWithText,
            updateTextBlockContent(
                stateWithText.postcards[0].textBlocks[0],
                'tt'
            )
        )
    ).toEqual<State>({
        ...stateWithText,
        postcards: [
            {
                ...stateWithText.postcards[0],
                textBlocks: [
                    { ...stateWithText.postcards[0].textBlocks[0], text: 'tt' }
                ]
            },
            ...stateWithText.postcards.slice(1)
        ]
    });
});

test('reducer: test updating a text block position', () => {
    expect(
        reducer(
            stateWithText,
            updateTextBlockPosition(
                stateWithText.postcards[0].textBlocks[0],
                10,
                11
            )
        )
    ).toEqual<State>({
        ...stateWithText,
        postcards: [
            {
                ...stateWithText.postcards[0],
                textBlocks: [
                    {
                        ...stateWithText.postcards[0].textBlocks[0],
                        x: 10,
                        y: 11
                    }
                ]
            },
            ...stateWithText.postcards.slice(1)
        ]
    });
});

test('reducer: test removing a text block', () => {
    expect(
        reducer(
            stateWithText,
            removeTextBlock(stateWithText.postcards[0].textBlocks[0])
        )
    ).toEqual<State>({
        ...stateWithText,
        postcards: [
            { ...stateWithText.postcards[0], textBlocks: [] },
            ...stateWithText.postcards.slice(1)
        ]
    });
});
