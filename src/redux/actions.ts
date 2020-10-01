import Postcard from 'types/Postcard';

interface SelectPostcardAction {
    type: 'selectPostcard';
    postcard: Postcard;
}

interface RotatePostcardAction {
    type: 'rotatePostcard';
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

export type Action = SelectPostcardAction | RotatePostcardAction;
