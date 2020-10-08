import { Reducer } from 'redux';

import undoable, { redo, undo } from './undoable';

type State = { counter: number };

type Action = { type: 'plus1' } | { type: 'minus1' };

const initialState: State = { counter: 0 };

const reducer: Reducer<Readonly<State>, Action> = (
    state = initialState,
    action
) => {
    switch (action.type) {
        case 'plus1':
            return {
                counter: state.counter + 1
            };
        case 'minus1':
            return {
                counter: state.counter - 1
            };
        default:
            return state;
    }
};
const undoableReducer = undoable(reducer);
const undoState = undoableReducer(undefined, ({} as unknown) as Action);

test('undoable works as expected', () => {
    let state = undoState;
    expect(state).toEqual({
        past: [],
        present: { counter: 0 },
        future: []
    });

    let prevState = state;
    state = undoableReducer(state, undo());
    expect(state).toBe(prevState);

    state = undoableReducer(state, { type: 'plus1' });
    expect(state).toEqual({
        past: [{ counter: 0 }],
        present: { counter: 1 },
        future: []
    });

    state = undoableReducer(state, undo());
    expect(state).toEqual({
        past: [],
        present: { counter: 0 },
        future: [{ counter: 1 }]
    });

    state = undoableReducer(state, redo());
    expect(state).toEqual({
        past: [{ counter: 0 }],
        present: { counter: 1 },
        future: []
    });

    prevState = state;
    state = undoableReducer(state, redo());
    expect(state).toBe(prevState);
});
