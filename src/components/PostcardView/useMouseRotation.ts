import React from 'react';

function getAngle(x1: number, y1: number, x2: number, y2: number): number {
    return (Math.atan2(y2 - y1, x2 - x1) * 180) / Math.PI;
}

function useMouseRotation(
    center: React.MutableRefObject<{ x: number; y: number }>,
    rotation: number,
    onRotateStart: () => void,
    onRotate: (angle: number) => void,
    onRotateEnd: (angle: number) => void
) {
    let initAngle = 0;
    function onMouseDown(e: React.MouseEvent) {
        if (e.button === 2) {
            return;
        }
        e.preventDefault();
        onRotateStart();
        initAngle =
            getAngle(center.current.x, center.current.y, e.clientX, e.clientY) -
            rotation;
        document.documentElement.addEventListener('mousemove', onMouseMove);
        document.documentElement.addEventListener('mouseup', onMouseUp);
    }

    function onMouseMove(e: MouseEvent) {
        const angle =
            getAngle(center.current.x, center.current.y, e.clientX, e.clientY) -
            initAngle;
        onRotate(angle);
    }

    function onMouseUp(e: MouseEvent) {
        const angle =
            getAngle(center.current.x, center.current.y, e.clientX, e.clientY) -
            initAngle;
        onRotateEnd(angle);
        document.documentElement.removeEventListener('mousemove', onMouseMove);
        document.documentElement.removeEventListener('mouseup', onMouseUp);
    }

    return { onMouseDown };
}

export default useMouseRotation;
