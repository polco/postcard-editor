import {
    addNewTextBlock,
    addPostcard,
    removePostcard,
    removeTextBlock,
    rotate90Postcard,
    rotatePostcard,
    selectPostcard,
    updateTextBlockContent,
    updateTextBlockPosition,
    zoomIn,
    zoomOut
} from './postcardActions';
import reducer, { initialState, State } from './postcardReducer';
import Actions from './postcardActions';
import { UndoableAction } from './undoable';

jest.mock('uuid', () => ({ v4: () => 'id' }));

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

test('reducer: test rotating to 90 degrees increment', () => {
    const state = initialState;
    expect(reducer(state, rotate90Postcard())).toEqual<State>({
        ...state,
        postcards: [
            { ...state.postcards[0], rotation: Math.PI / 2 },
            ...state.postcards.slice(1)
        ]
    });
});

test('reducer: test rotating', () => {
    const state = initialState;
    expect(reducer(state, rotatePostcard(13))).toEqual<State>({
        ...state,
        postcards: [
            { ...state.postcards[0], rotation: 13 },
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
    expect(
        reducer(initialState, ({ type: 'hehe' } as unknown) as UndoableAction<
            Actions
        >)
    ).toBe(initialState);
});

test('reducer: default state is correct', () => {
    expect(reducer(undefined, ({} as unknown) as UndoableAction<Actions>)).toBe(
        initialState
    );
});

test('reducer: test adding a text block', () => {
    const state: State = {
        ...initialState,
        postcards: [
            { ...initialState.postcards[0], rotation: 3 },
            ...initialState.postcards.slice(1)
        ]
    };
    expect(reducer(state, addNewTextBlock(50, 10))).toEqual<State>({
        ...state,
        postcards: [
            {
                ...state.postcards[0],
                textBlocks: [
                    {
                        text: 'CLICK TO EDIT...',
                        x: 50,
                        y: 10,
                        rotation: 3,
                        id: 'id'
                    }
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
            textBlocks: [{ text: 't', x: 0, y: 0, rotation: 0, id: 'id' }]
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

test('reducer: test adding a postcard', () => {
    const newState = reducer(initialState, addPostcard());
    expect(newState.postcards.length).toBe(initialState.postcards.length + 1);
});

test('reducer: test removing a postcard', () => {
    let newState = reducer(
        initialState,
        removePostcard(initialState.postcards[2])
    );
    expect(newState).toEqual<State>({
        ...initialState,
        postcards: initialState.postcards.slice(0, -1)
    });

    newState = reducer(newState, selectPostcard(newState.postcards[1]));
    newState = reducer(newState, removePostcard(newState.postcards[1]));
    expect(newState).toEqual<State>({
        ...newState,
        postcards: [newState.postcards[0]],
        selectedIndex: 0
    });

    newState = reducer(newState, removePostcard(newState.postcards[0]));
    expect(newState).toEqual<State>({
        ...newState,
        postcards: [],
        selectedIndex: 0
    });
});
