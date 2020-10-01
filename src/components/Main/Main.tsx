import React from 'react';

import PostcardList from 'components/PostcardList';

import { useSelector } from 'redux/hooks';
import { State } from 'redux/reducer';

import './Main.scss';

function selectState(state: State) {
    return state;
}

const Main: React.FC = () => {
    const { list, selectedIndex } = useSelector(selectState);

    return (
        <div className="Main">
            <PostcardList postcards={list} selectedIndex={selectedIndex} />
        </div>
    );
};

export default Main;
