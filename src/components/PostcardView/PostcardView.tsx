import React from 'react';

import TextBlockEntry from 'components/TextBlockEntry';

import Postcard from 'types/Postcard';
import { getRotatedBoundingBox } from 'utils/transform';

import './PostcardView.scss';

export interface Props {
    postcard: Postcard;
    zoom: number;
}

const PADDING = 16 * 2;

const PostcardView: React.FC<Props> = ({ postcard, zoom }) => {
    const divRef = React.useRef<HTMLDivElement>(null);

    // no transition when changing the selected postcard
    const lastPostcard = React.useRef(postcard.imageUrl);
    let noTransition = false;
    if (lastPostcard.current !== postcard.imageUrl) {
        lastPostcard.current = postcard.imageUrl;
        noTransition = true;
    }

    const [viewDimensions, setViewDimensions] = React.useState({
        width: 0,
        height: 0
    });
    React.useEffect(() => {
        const { clientWidth, clientHeight } = divRef.current!;
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
        viewDimensions.height > viewDimensions.width
            ? viewDimensions.width / Math.max(maxX - minX, viewDimensions.width)
            : viewDimensions.height /
              Math.max(maxY - minY, viewDimensions.height);

    return (
        <div className="PostcardView" ref={divRef}>
            <div
                className="PostcardView-image"
                style={{
                    backgroundImage: `url(${postcard.imageUrl})`,
                    width: `${postcard.width}px`,
                    height: `${postcard.height}px`,
                    transition: noTransition ? 'none' : '',
                    transform: `translate3d(-50%, -50%, 0) scale(${
                        scale * zoom
                    }) rotate(${postcard.rotation}deg)`
                }}
            />
            <div className="PostcardView-textBlocks">
                {postcard.textBlocks.map((textBlock, i) => (
                    <TextBlockEntry key={i} textBlock={textBlock} />
                ))}
            </div>
        </div>
    );
};

export default React.memo(PostcardView);
