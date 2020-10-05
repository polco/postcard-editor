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

type Action =
    | SelectPostcardAction
    | RotatePostcardAction
    | ZoomInAction
    | ZoomOutAction
    | AddTextBlockAction
    | UpdateTextBlockContentAction
    | UpdateTextBlockPositionAction
    | RemoveTextBlockAction;

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
