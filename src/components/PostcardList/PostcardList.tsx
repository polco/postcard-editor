import React from 'react';

import Postcard from 'types/Postcard';
import PostcardThumb from 'components/PostcardThumb';
import { useDispatch } from 'redux/hooks';
import { selectPostcard as selectPostcardAction } from 'redux/actions';

import './PostcardList.scss';

export interface Props {
    postcards: Postcard[];
    selectedIndex: number;
}

const PostcardList: React.FC<Props> = ({ postcards, selectedIndex }) => {
    const dispatch = useDispatch();

    function selectPostcard(postcard: Postcard) {
        dispatch(selectPostcardAction(postcard));
    }
    const selectPostcardCb = React.useCallback(selectPostcard, []);

    return (
        <div className="PostcardList">
            {postcards.map((postcard, i) => (
                <PostcardThumb
                    selectPostcard={selectPostcardCb}
                    postcard={postcard}
                    isSelected={i === selectedIndex}
                    key={i}
                />
            ))}
        </div>
    );
};

export default React.memo(PostcardList);
