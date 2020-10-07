import React from 'react';
import { getRotatedCoords } from 'utils/transform';

function useDragBehavior(
    centerX: number,
    centerY: number,
    imageRotation: number,
    imageScale: number,
    initX: number,
    initY: number,
    onDrag: (x: number, y: number) => void,
    onDragEnd: (x: number, y: number) => void
) {
    const initPos = React.useRef({ x: 0, y: 0 });
    const didMove = React.useRef(false);

    function onMouseDown(e: React.MouseEvent) {
        if (e.button === 2) {
            return;
        }
        didMove.current = false;
        const coords = getRotatedCoords(
            centerX,
            centerY,
            e.clientX,
            e.clientY,
            imageRotation
        );
        initPos.current.x = coords.x;
        initPos.current.y = coords.y;
        document.documentElement.addEventListener('mousemove', onMouseMove);
        document.documentElement.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e: MouseEvent) {
        const coords = getRotatedCoords(
            centerX,
            centerY,
            e.clientX,
            e.clientY,
            imageRotation
        );
        const x = (coords.x - initPos.current.x) / imageScale + initX;
        const y = (coords.y - initPos.current.y) / imageScale + initY;
        onDrag(x, y);
    }

    function onMouseUp(e: MouseEvent) {
        const coords = getRotatedCoords(
            centerX,
            centerY,
            e.clientX,
            e.clientY,
            imageRotation
        );
        const deltaX = coords.x - initPos.current.x;
        const deltaY = coords.y - initPos.current.y;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) > 5) {
            didMove.current = true;
            const x = deltaX / imageScale + initX;
            const y = deltaY / imageScale + initY;
            onDragEnd(x, y);
        }
        document.documentElement.removeEventListener('mousemove', onMouseMove);
        document.documentElement.removeEventListener('mouseup', onMouseUp);
    }

    return { didMove, onMouseDown };
}

export default useDragBehavior;
