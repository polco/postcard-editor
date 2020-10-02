import React from 'react';
import cn from 'classnames';

import Postcard from 'types/Postcard';

export interface Props {
    postcard: Postcard;
    x: number;
    scale: number;
    selectPostcard: (postcard: Postcard) => void;
    isSelected: boolean;
}

import './PostcardThumb.scss';

export const HEIGHT = 150;

const PostcardThumb: React.FC<Props> = ({
    postcard,
    x,
    scale,
    isSelected,
    selectPostcard
}) => {
    function onSelect() {
        selectPostcard(postcard);
    }

    return (
        <div
            onClick={onSelect}
            className={cn('PostcardThumb', {
                'PostcardThumb-selected': isSelected
            })}
            style={{
                transform: `translate3d(${x}px,-50%,0) scale(${scale}) rotate(${postcard.rotation}deg)`,
                height: `${postcard.height}px`,
                width: `${postcard.width}px`,
                backgroundImage: `url(${postcard.imageUrl})`
            }}
        />
    );
};

export default React.memo(PostcardThumb);
