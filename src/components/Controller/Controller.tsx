import React from 'react';

import { useDispatch } from 'redux/hooks';
import { rotatePostcard } from 'redux/actions';

import './Controller.scss';

const Controller: React.FC = () => {
    const dispatch = useDispatch();

    function rotate() {
        dispatch(rotatePostcard());
    }

    return (
        <div className="Controller">
            <div className="Controller-button">NEW TEXT BLOCK</div>
            <div className="Controller-button">ZOOM IN</div>
            <div className="Controller-button">ZOOM OUT</div>
            <div className="Controller-button" onClick={rotate}>
                ROTATE
            </div>
        </div>
    );
};

export default React.memo(Controller);
