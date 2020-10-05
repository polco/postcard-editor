import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons/faPlusCircle';

import Postcard from 'types/Postcard';
import PostcardThumb, { HEIGHT } from 'components/PostcardThumb';
import { useDispatch } from 'redux/hooks';
import {
    addPostcard,
    selectPostcard as selectPostcardAction,
    removePostcard as removePostcardAction
} from 'redux/postcardActions';
import { getRotatedBoundingBox } from 'utils/transform';

import './PostcardList.scss';

export interface Props {
    postcards: Postcard[];
    selectedIndex: number;
}

const PADDING = 16;

const PostcardList: React.FC<Props> = ({ postcards, selectedIndex }) => {
    const dispatch = useDispatch();

    function selectPostcard(postcard: Postcard) {
        dispatch(selectPostcardAction(postcard));
    }
    const selectPostcardCb = React.useCallback(selectPostcard, []);

    function removePostcard(postcard: Postcard) {
        dispatch(removePostcardAction(postcard));
    }
    const removePostcardCb = React.useCallback(removePostcard, []);

    function onAddPostcard() {
        dispatch(addPostcard());
    }

    let x = PADDING;
    const displays = postcards.map((postcard) => {
        const { minX, maxX, minY, maxY } = getRotatedBoundingBox(
            postcard.width,
            postcard.height,
            postcard.rotation
        );

        const scale = HEIGHT / (maxY - minY);
        const boxWidth = maxX - minX;
        const scaledWidth = boxWidth * scale;
        const boundedWidth = Math.min(HEIGHT, scaledWidth);
        const pos = x - (postcard.width - boundedWidth) / 2;
        x += boundedWidth + PADDING;
        return { x: pos, scale: (scale * boundedWidth) / scaledWidth };
    });

    return (
        <div
            className="PostcardList"
            style={{ height: `${HEIGHT + PADDING * 2}px` }}
        >
            {postcards.map((postcard, i) => {
                const { x, scale } = displays[i];
                return (
                    <PostcardThumb
                        selectPostcard={selectPostcardCb}
                        removePostcard={removePostcardCb}
                        postcard={postcard}
                        isSelected={i === selectedIndex}
                        x={x}
                        scale={scale}
                        key={postcard.imageUrl}
                    />
                );
            })}
            <FontAwesomeIcon
                style={{
                    transform: `translate3d(${x + PADDING}px,0,0)`
                }}
                className="PostcardList-add"
                icon={faPlusCircle}
                onClick={onAddPostcard}
                size="5x"
            />
        </div>
    );
};

export default React.memo(PostcardList);
