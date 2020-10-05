import Postcard from 'types/Postcard';
import TextBlock from 'types/TextBlock';

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

interface AddTextBlockAction {
    type: 'addTextBlock';
    x: number;
    y: number;
}

interface UpdateTextBlockContentAction {
    type: 'updateTextBlockContent';
    textBlock: TextBlock;
    text: string;
}

interface UpdateTextBlockPositionAction {
    type: 'updateTextBlockPosition';
    textBlock: TextBlock;
    x: number;
    y: number;
}

interface RemoveTextBlockAction {
    type: 'removeTextBlock';
    textBlock: TextBlock;
}

interface AddPostcardAction {
    type: 'addPostcard';
}

interface RemovePostcardAction {
    type: 'removePostcard';
    postcard: Postcard;
}

type Action =
    | SelectPostcardAction
    | RotatePostcardAction
    | ZoomInAction
    | ZoomOutAction
    | AddTextBlockAction
    | UpdateTextBlockContentAction
    | UpdateTextBlockPositionAction
    | RemoveTextBlockAction
    | AddPostcardAction
    | RemovePostcardAction;

export default Action;

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

export function addNewTextBlock(x: number, y: number): AddTextBlockAction {
    return {
        type: 'addTextBlock',
        x,
        y
    };
}

export function updateTextBlockContent(
    textBlock: TextBlock,
    text: string
): UpdateTextBlockContentAction {
    return {
        type: 'updateTextBlockContent',
        textBlock,
        text
    };
}

export function updateTextBlockPosition(
    textBlock: TextBlock,
    x: number,
    y: number
): UpdateTextBlockPositionAction {
    return {
        type: 'updateTextBlockPosition',
        textBlock,
        x,
        y
    };
}

export function removeTextBlock(textBlock: TextBlock): RemoveTextBlockAction {
    return {
        type: 'removeTextBlock',
        textBlock
    };
}

export function addPostcard(): AddPostcardAction {
    return { type: 'addPostcard' };
}

export function removePostcard(postcard: Postcard): RemovePostcardAction {
    return { type: 'removePostcard', postcard };
}
