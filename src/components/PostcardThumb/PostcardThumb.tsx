import React from 'react';
import cn from 'classnames';

import Postcard from 'types/Postcard';

export interface Props {
    postcard: Postcard;
    selectPostcard: (postcard: Postcard) => void;
    isSelected: boolean;
}

import './PostcardThumb.scss';

const PostcardThumb: React.FC<Props> = ({
    postcard,
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
        >
            <img src={postcard.imageUrl} />
        </div>
    );
};

export default React.memo(PostcardThumb);
