import { Action, Reducer } from 'redux';

export interface UndoAction {
    type: 'undo';
}

export interface RedoAction {
    type: 'redo';
}

export function undo(): UndoAction {
    return {
        type: 'undo'
    };
}

export function redo(): RedoAction {
    return {
        type: 'redo'
    };
}

export interface UndoableState<S> {
    past: S[];
    present: S;
    future: S[];
}

export type UndoableAction<A extends Action> = A | UndoAction | RedoAction;

function undoable<S, A extends Action<string>>(
    reducer: Reducer<S, A>
): Reducer<UndoableState<S>, UndoableAction<A>> {
    const initialState: UndoableState<S> = {
        past: [],
        present: reducer(undefined, {} as A),
        future: []
    };

    // Return a reducer that handles undo and redo
    return function (state = initialState, action: UndoableAction<A>) {
        const { past, present, future } = state;

        switch (action.type) {
            case 'undo':
                const previous = past[past.length - 1];
                if (!previous) {
                    return state;
                }
                const newPast = past.slice(0, past.length - 1);
                return {
                    past: newPast,
                    present: previous,
                    future: [present, ...future]
                };
            case 'redo':
                const next = future[0];
                if (!next) {
                    return state;
                }
                const newFuture = future.slice(1);
                return {
                    past: [...past, present],
                    present: next,
                    future: newFuture
                };
            default:
                const newPresent = reducer(present, action as A);
                if (present === newPresent) {
                    return state;
                }
                return {
                    past: [...past, present],
                    present: newPresent,
                    future: []
                };
        }
    };
}

export default undoable;
