export function mockReduxHooks(dispatch: jest.Mock) {
    return () => ({
        useSelector: jest.fn(),
        useDispatch: jest.fn(() => dispatch)
    });
}
