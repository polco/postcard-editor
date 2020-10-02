import React from 'react';
import cn from 'classnames';

import TextBlock from 'types/TextBlock';
import { useDispatch } from 'redux/hooks';
import {
    removeTextBlock,
    updateTextBlockContent,
    updateTextBlockPosition
} from 'redux/actions';

import './TextBlockEntry.scss';

export interface Props {
    textBlock: TextBlock;
}

export const TEXT_LINE_HEIGHT = 20;

const TextBlockEntry: React.FC<Props> = ({ textBlock }) => {
    const [isEditMode, setEditMode] = React.useState(false);
    const divRef = React.useRef<HTMLDivElement>(null);
    const dispatch = useDispatch();

    const didMove = React.useRef(false);
    function onTextClick() {
        console.log('click');
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

    const initPos = React.useRef({ x: 0, y: 0 });
    function onPointerDown(e: React.PointerEvent) {
        didMove.current = false;
        initPos.current.x = e.clientX;
        initPos.current.y = e.clientY;
        document.documentElement.addEventListener('mousemove', onPointerMove);
        document.documentElement.addEventListener('mouseup', onPointerUp);
    }

    function onPointerMove(e: MouseEvent) {
        e.preventDefault();
        const x = e.clientX - initPos.current.x + textBlock.x;
        const y = e.clientY - initPos.current.y + textBlock.y;
        divRef.current!.style.transform = `translate3d(${x}px,${y}px,0) rotate(-${textBlock.rotation}deg)`;
    }

    function onPointerUp(e: MouseEvent) {
        const deltaX = e.clientX - initPos.current.x;
        const deltaY = e.clientY - initPos.current.y;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) > 5) {
            didMove.current = true;
            const x = deltaX + textBlock.x;
            const y = deltaY + textBlock.y;
            e.preventDefault();
            dispatch(updateTextBlockPosition(textBlock, x, y));
        }
        document.documentElement.removeEventListener(
            'mousemove',
            onPointerMove
        );
        document.documentElement.removeEventListener('mouseup', onPointerUp);
    }

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
            onPointerDown={onPointerDown}
            contentEditable={isEditMode}
            dangerouslySetInnerHTML={{ __html: textBlock.text }}
        />
    );
};

export default React.memo(TextBlockEntry);
