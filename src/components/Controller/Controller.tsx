import React from 'react';

import './Controller.scss';

const Controller: React.FC = () => {
    return (
        <div className="Controller">
            <div className="Controller-button">NEW TEXT BLOCK</div>
            <div className="Controller-button">ZOOM IN</div>
            <div className="Controller-button">ZOOM OUT</div>
            <div className="Controller-button">ROTATE</div>
        </div>
    );
};

export default React.memo(Controller);
