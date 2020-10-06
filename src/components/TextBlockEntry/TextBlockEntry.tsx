import React from 'react';
import cn from 'classnames';

import TextBlock from 'types/TextBlock';
import { useDispatch } from 'redux/hooks';
import {
    removeTextBlock,
    updateTextBlockContent,
    updateTextBlockPosition
} from 'redux/postcardActions';

import './TextBlockEntry.scss';
import useDragBehavior from './useDragBehavior';

export interface Props {
    textBlock: TextBlock;
}

export const TEXT_LINE_HEIGHT = 20;

const TextBlockEntry: React.FC<Props> = ({ textBlock }) => {
    const [isEditMode, setEditMode] = React.useState(false);
    const divRef = React.useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    function onDrag(x: number, y: number) {
        divRef.current!.style.transform = `translate3d(${x}px,${y}px,0) rotate(-${textBlock.rotation}deg)`;
    }

    function onDragEnd(x: number, y: number) {
        dispatch(updateTextBlockPosition(textBlock, x, y));
    }

    const { didMove, onMouseDown } = useDragBehavior(
        textBlock.x,
        textBlock.y,
        onDrag,
        onDragEnd
    );

    function onTextClick() {
        if (!didMove.current && !isEditMode) {
            setEditMode(true);
        }
    }

    function updateBlockContent() {
        const content = divRef.current!.textContent;
        if (content) {
            dispatch(updateTextBlockContent(textBlock, content));
        } else {
            dispatch(removeTextBlock(textBlock));
        }
    }

    function onBlur() {
        if (isEditMode) {
            updateBlockContent();
            setEditMode(false);
        }
    }

    function onKeyDown(e: React.KeyboardEvent) {
        if (e.key === 'Enter') {
            e.preventDefault();
            divRef.current!.blur();
        }
    }

    React.useEffect(() => {
        if (isEditMode) {
            const selection = window.getSelection()!;
            selection.removeAllRanges();
            selection.selectAllChildren(divRef.current!);
        }
    }, [isEditMode]);

    return (
        <div
            ref={divRef}
            className={cn('TextBlockEntry', {
                'TextBlockEntry--edit': isEditMode
            })}
            style={{
                transform: `translate3d(${textBlock.x}px,${textBlock.y}px,0) rotate(-${textBlock.rotation}deg)`,
                height: `${TEXT_LINE_HEIGHT + (isEditMode ? 10 : 0)}px`,
                lineHeight: `${TEXT_LINE_HEIGHT}px`,
                fontSize: `${TEXT_LINE_HEIGHT}px`
            }}
            onKeyDown={onKeyDown}
            onClick={onTextClick}
            onBlur={onBlur}
            onMouseDown={onMouseDown}
            contentEditable={isEditMode}
            dangerouslySetInnerHTML={{ __html: textBlock.text }}
        />
    );
};

export default React.memo(TextBlockEntry);
