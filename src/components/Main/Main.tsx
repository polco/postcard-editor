import React from 'react';

import { useSelector } from 'redux/hooks';
import { State } from 'redux/reducer';

import PostcardList from 'components/PostcardList';
import PostcardView from 'components/PostcardView';
import Controller from 'components/Controller';

import './Main.scss';

function selectState(state: State) {
    return state;
}

const Main: React.FC = () => {
    const { postcards, selectedIndex, zoom } = useSelector(selectState);

    return (
        <div className="Main">
            <div className="Main-workspace">
                <PostcardView postcard={postcards[selectedIndex]} zoom={zoom} />
                <PostcardList
                    postcards={postcards}
                    selectedIndex={selectedIndex}
                />
            </div>
            <Controller />
        </div>
    );
};

export default Main;
