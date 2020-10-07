import React from 'react';

import { useDispatch } from 'redux/hooks';
import {
    addNewTextBlock,
    rotate90Postcard,
    zoomIn,
    zoomOut
} from 'redux/postcardActions';
import { undo, redo } from 'redux/undoable';
import Postcard from 'types/Postcard';

import { TEXT_LINE_HEIGHT } from 'components/TextBlockEntry/TextBlockEntry';

import './Controller.scss';

export interface Props {
    postcard: Postcard;
}

const Controller: React.FC<Props> = ({ postcard }) => {
    const dispatch = useDispatch();

    function onRotate() {
        dispatch(rotate90Postcard());
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

    function onUndo() {
        dispatch(undo());
    }

    function onRedo() {
        dispatch(redo());
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
            <div className="Controller-button" onClick={onUndo}>
                UNDO
            </div>
            <div className="Controller-button" onClick={onRedo}>
                REDO
            </div>
        </div>
    );
};

export default React.memo(Controller);
