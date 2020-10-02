export function getRotatedCoords(
    centerX: number,
    centerY: number,
    x: number,
    y: number,
    angle: number
): { x: number; y: number } {
    const newX =
        centerX +
        (x - centerX) * Math.cos(angle) +
        (y - centerY) * Math.sin(angle);
    const newY =
        centerY -
        (x - centerX) * Math.sin(angle) +
        (y - centerY) * Math.cos(angle);
    return { x: newX, y: newY };
}

export function getRotatedBoundingBox(
    width: number,
    height: number,
    rotation: number,
    centerX = width / 2,
    centerY = height / 2
) {
    const angle = (rotation * Math.PI) / 180;
    const coord1 = getRotatedCoords(centerX, centerY, 0, 0, angle);
    const coord2 = getRotatedCoords(centerX, centerY, width, 0, angle);
    const coord3 = getRotatedCoords(centerX, centerY, width, height, angle);
    const coord4 = getRotatedCoords(centerX, centerY, 0, height, angle);
    const minX = Math.min(coord1.x, coord2.x, coord3.x, coord4.x);
    const maxX = Math.max(coord1.x, coord2.x, coord3.x, coord4.x);
    const minY = Math.min(coord1.y, coord2.y, coord3.y, coord4.y);
    const maxY = Math.max(coord1.y, coord2.y, coord3.y, coord4.y);

    return { minX, maxX, minY, maxY };
}
