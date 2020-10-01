import { rotatePostcard, selectPostcard, zoomIn, zoomOut } from './actions';
import reducer, { initialState } from './reducer';

test('reducer: test zooming', () => {
    const state = initialState;
    expect(reducer(state, zoomIn())).toEqual({
        ...state,
        zoom: 1.1
    });

    expect(reducer(state, zoomOut())).toEqual({
        ...state,
        zoom: 0.9
    });
});

test('reducer: test rotating', () => {
    const state = initialState;
    expect(reducer(state, rotatePostcard())).toEqual({
        ...state,
        postcards: [
            { ...state.postcards[0], rotation: 90 },
            ...state.postcards.slice(1)
        ]
    });
});

test('reducer: test selecting a postcard', () => {
    const state = initialState;
    expect(reducer(state, selectPostcard(state.postcards[1]))).toEqual({
        ...state,
        selectedIndex: 1
    });
});

test('reducer: any undefined action returns the state', () => {
    const state = initialState;
    expect(reducer(state, { type: 'hehe' } as any)).toBe(state);
});
