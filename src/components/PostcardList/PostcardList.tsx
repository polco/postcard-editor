import React from 'react';

import Postcard from 'types/Postcard';
import PostcardThumb, { HEIGHT } from 'components/PostcardThumb';
import { useDispatch } from 'redux/hooks';
import { selectPostcard as selectPostcardAction } from 'redux/actions';

import './PostcardList.scss';
import { getRotatedBoundingBox } from 'utils/transform';

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
                        postcard={postcard}
                        isSelected={i === selectedIndex}
                        x={x}
                        scale={scale}
                        key={postcard.imageUrl}
                    />
                );
            })}
        </div>
    );
};

export default React.memo(PostcardList);
