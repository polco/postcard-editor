interface SelectPostcardAction {
    type: 'selectPostcard';
    index: number;
}

export function selectPostcard(index: number): SelectPostcardAction {
    return {
        type: 'selectPostcard',
        index
    };
}

export type Action = SelectPostcardAction;
