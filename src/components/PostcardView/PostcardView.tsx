import React from 'react';
import Postcard from 'types/Postcard';

import { getRotatedBoundingBox } from 'utils/transform';

import './PostcardView.scss';

export interface Props {
    postcard: Postcard;
}

const PADDING = 16 * 2;

const PostcardView: React.FC<Props> = ({ postcard }) => {
    const divRef = React.useRef<HTMLDivElement>(null);
    const imageRef = React.useRef<HTMLDivElement>(null);
    const lastPostcard = React.useRef(postcard.imageUrl);

    let noTransition = false;
    if (lastPostcard.current !== postcard.imageUrl) {
        lastPostcard.current = postcard.imageUrl;
        noTransition = true;
    }

    React.useEffect(() => {
        if (noTransition) {
            noTransition = false;
            imageRef.current!.style.transition = 'none';
        } else {
            imageRef.current!.style.transition = '';
        }
    }, [noTransition]);

    React.useEffect(() => {
        const {
            clientWidth: canvaWidth,
            clientHeight: canvaHeight
        } = divRef.current!;
        const adjustedCanvaWidth = canvaWidth - PADDING;
        const adjustedCanvaHeight = canvaHeight - PADDING;

        const { minX, maxX, minY, maxY } = getRotatedBoundingBox(
            postcard.width,
            postcard.height,
            postcard.rotation
        );

        let scale = 1;
        if (adjustedCanvaHeight > adjustedCanvaWidth) {
            const imageWidth = Math.max(maxX - minX, adjustedCanvaWidth);
            scale = adjustedCanvaWidth / imageWidth;
        } else {
            const imageHeight = Math.max(maxY - minY, adjustedCanvaHeight);
            scale = adjustedCanvaHeight / imageHeight;
        }
        imageRef.current!.style.transform = `translate3d(-50%, -50%, 0) scale(${scale}) rotate(${postcard.rotation}deg)`;
    }, [postcard.width, postcard.height, postcard.rotation]);

    return (
        <div className="PostcardView" ref={divRef}>
            <div
                className="PostcardView-image"
                style={{
                    backgroundImage: `url(${postcard.imageUrl})`,
                    width: `${postcard.width}px`,
                    height: `${postcard.height}px`
                }}
                ref={imageRef}
            />
        </div>
    );
};

export default React.memo(PostcardView);
