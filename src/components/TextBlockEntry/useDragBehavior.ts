import React from 'react';

function useDragBehavior(
    initX: number,
    initY: number,
    onDrag: (x: number, y: number) => void,
    onDragEnd: (x: number, y: number) => void
) {
    const initPos = React.useRef({ x: 0, y: 0 });
    const didMove = React.useRef(false);

    function onMouseDown(e: React.MouseEvent) {
        didMove.current = false;
        initPos.current.x = e.clientX;
        initPos.current.y = e.clientY;
        document.documentElement.addEventListener('mousemove', onMouseMove);
        document.documentElement.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e: MouseEvent) {
        const x = e.clientX - initPos.current.x + initX;
        const y = e.clientY - initPos.current.y + initY;
        onDrag(x, y);
    }

    function onMouseUp(e: MouseEvent) {
        const deltaX = e.clientX - initPos.current.x;
        const deltaY = e.clientY - initPos.current.y;
        if (Math.sqrt(deltaX * deltaX + deltaY * deltaY) > 5) {
            didMove.current = true;
            const x = deltaX + initX;
            const y = deltaY + initY;
            onDragEnd(x, y);
        }
        document.documentElement.removeEventListener('mousemove', onMouseMove);
        document.documentElement.removeEventListener('mouseup', onMouseUp);
    }

    return { didMove, onMouseDown };
}

export default useDragBehavior;
