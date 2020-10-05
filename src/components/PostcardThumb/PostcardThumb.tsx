import React from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons/faTimesCircle';

import Postcard from 'types/Postcard';

export interface Props {
    postcard: Postcard;
    x: number;
    scale: number;
    selectPostcard: (postcard: Postcard) => void;
    removePostcard: (postcard: Postcard) => void;
    isSelected: boolean;
}

import './PostcardThumb.scss';

export const HEIGHT = 150;

const PostcardThumb: React.FC<Props> = ({
    postcard,
    x,
    scale,
    isSelected,
    selectPostcard,
    removePostcard
}) => {
    function onSelect(e: React.MouseEvent) {
        e.stopPropagation();
        selectPostcard(postcard);
    }

    function onRemove(e: React.MouseEvent) {
        e.stopPropagation();
        removePostcard(postcard);
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
        >
            <FontAwesomeIcon
                icon={faTimesCircle}
                size="2x"
                className="PostcardThumb-remove"
                onClick={onRemove}
                style={{ transform: `scale(${1 / scale})` }}
            />
        </div>
    );
};

export default React.memo(PostcardThumb);
