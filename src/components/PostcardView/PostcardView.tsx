import React from 'react';
import Postcard from 'types/Postcard';

import './PostcardView.scss';

export interface Props {
    postcard: Postcard;
}

const PostcardView: React.FC<Props> = ({ postcard }) => {
    return (
        <div className="PostcardView">
            <img src={postcard.imageUrl} />
        </div>
    );
};

export default React.memo(PostcardView);