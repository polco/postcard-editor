import React from 'react';

import Postcard from 'types/Postcard';
import { getRotatedBoundingBox } from 'utils/transform';

const PADDING = 16 * 2;

function useDisplayScale(
    postcard: Postcard,
    zoom: number
): { scale: number; canvaRef: React.RefObject<HTMLDivElement> } {
    const canvaRef = React.useRef<HTMLDivElement>(null);
    const [viewDimensions, setViewDimensions] = React.useState({
        width: 0,
        height: 0
    });

    React.useEffect(() => {
        const { clientWidth, clientHeight } = canvaRef.current!;
        setViewDimensions({
            width: clientWidth - PADDING,
            height: clientHeight - PADDING
        });
    }, []);

    const { minX, maxX, minY, maxY } = getRotatedBoundingBox(
        postcard.width,
        postcard.height,
        postcard.rotation
    );

    const scale =
        zoom *
        (viewDimensions.height > viewDimensions.width
            ? viewDimensions.width / Math.max(maxX - minX, viewDimensions.width)
            : viewDimensions.height /
              Math.max(maxY - minY, viewDimensions.height));

    return {
        scale,
        canvaRef
    };
}

export default useDisplayScale;
