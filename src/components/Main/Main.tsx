import React from 'react';

import { useSelector } from 'redux/hooks';
import { State } from 'redux/reducer';

import PostcardList from 'components/PostcardList';
import PostcardView from 'components/PostcardView';
import Controller from 'components/Controller';

import './Main.scss';

function selectState(state: State) {
    return state.present;
}

const Main: React.FC = () => {
    const { postcards, selectedIndex, zoom } = useSelector(selectState);
    const selectedPostcard = postcards[selectedIndex];

    const divRef = React.useRef<HTMLDivElement>(null);
    function getCenterCoordsInWorkspace() {
        const box = divRef.current!.getBoundingClientRect();
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    }
    const getCenterCoordsInWorkspaceCb = React.useCallback(
        getCenterCoordsInWorkspace,
        []
    );

    return (
        <div className="Main">
            <div className="Main-workspace" ref={divRef}>
                {selectedPostcard ? (
                    <PostcardView postcard={selectedPostcard} zoom={zoom} />
                ) : (
                    <div className="Main-postcardPlaceholder" />
                )}
                <PostcardList
                    postcards={postcards}
                    selectedIndex={selectedIndex}
                />
            </div>
            <Controller
                getCenterCoordsInWorkspace={getCenterCoordsInWorkspaceCb}
            />
        </div>
    );
};

export default Main;
