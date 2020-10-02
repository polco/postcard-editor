import React from 'react';

import { useDispatch } from 'redux/hooks';
import {
    addNewTextBlock,
    rotatePostcard,
    zoomIn,
    zoomOut
} from 'redux/actions';
import Postcard from 'types/Postcard';

import { TEXT_LINE_HEIGHT } from 'components/TextBlockEntry/TextBlockEntry';

import './Controller.scss';

export interface Props {
    postcard: Postcard;
}

const Controller: React.FC<Props> = ({ postcard }) => {
    const dispatch = useDispatch();

    function onRotate() {
        dispatch(rotatePostcard());
    }

    function onZoomIn() {
        dispatch(zoomIn());
    }

    function onZoomOut() {
        dispatch(zoomOut());
    }

    function onNewText() {
        const x = (postcard.width - 200) / 2;
        const y = (postcard.height - TEXT_LINE_HEIGHT) / 2;
        dispatch(addNewTextBlock(x, y));
    }

    return (
        <div className="Controller">
            <div className="Controller-button" onClick={onNewText}>
                NEW TEXT BLOCK
            </div>
            <div className="Controller-button" onClick={onZoomIn}>
                ZOOM IN
            </div>
            <div className="Controller-button" onClick={onZoomOut}>
                ZOOM OUT
            </div>
            <div className="Controller-button" onClick={onRotate}>
                ROTATE
            </div>
        </div>
    );
};

export default React.memo(Controller);
