import Postcard from 'types/Postcard';

interface SelectPostcardAction {
    type: 'selectPostcard';
    postcard: Postcard;
}

interface RotatePostcardAction {
    type: 'rotatePostcard';
}

interface ZoomInAction {
    type: 'zoomIn';
}

interface ZoomOutAction {
    type: 'zoomOut';
}

export function selectPostcard(postcard: Postcard): SelectPostcardAction {
    return {
        type: 'selectPostcard',
        postcard
    };
}

export function rotatePostcard(): RotatePostcardAction {
    return {
        type: 'rotatePostcard'
    };
}

export function zoomIn(): ZoomInAction {
    return {
        type: 'zoomIn'
    };
}

export function zoomOut(): ZoomOutAction {
    return {
        type: 'zoomOut'
    };
}

export type Action =
    | SelectPostcardAction
    | RotatePostcardAction
    | ZoomInAction
    | ZoomOutAction;
