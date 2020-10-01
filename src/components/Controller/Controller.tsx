import React from 'react';

import { useDispatch } from 'redux/hooks';
import { rotatePostcard, zoomIn, zoomOut } from 'redux/actions';

import './Controller.scss';

const Controller: React.FC = () => {
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

    return (
        <div className="Controller">
            <div className="Controller-button">NEW TEXT BLOCK</div>
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
