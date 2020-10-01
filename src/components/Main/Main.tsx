import React from 'react';

import PostcardList from 'components/PostcardList';

import { useSelector } from 'redux/hooks';
import { State } from 'redux/reducer';

import PostcardView from 'components/PostcardView';

import './Main.scss';

function selectState(state: State) {
    return state;
}

const Main: React.FC = () => {
    const { postcards, selectedIndex } = useSelector(selectState);

    return (
        <div className="Main">
            <PostcardView postcard={postcards[selectedIndex]} />
            <PostcardList postcards={postcards} selectedIndex={selectedIndex} />
        </div>
    );
};

export default Main;
