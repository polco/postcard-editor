import React from 'react';

import TextBlockEntry from 'components/TextBlockEntry';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';

import Postcard from 'types/Postcard';
import { getRotatedBoundingBox } from 'utils/transform';
import { rotatePostcard } from 'redux/postcardActions';
import { useDispatch } from 'redux/hooks';

import './PostcardView.scss';
import useMouseRotation from './useMouseRotation';

export interface Props {
    postcard: Postcard;
    zoom: number;
}

const PADDING = 16 * 2;

const PostcardView: React.FC<Props> = ({ postcard, zoom }) => {
    const dispatch = useDispatch();
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
    const centerRef = React.useRef({ x: 0, y: 0 });
    React.useEffect(() => {
        const { clientWidth, clientHeight } = divRef.current!;
        setViewDimensions({
            width: clientWidth - PADDING,
            height: clientHeight - PADDING
        });

        const {
            left,
            top,
            width,
            height
        } = divRef.current!.getBoundingClientRect();
        centerRef.current.x = left + width / 2;
        centerRef.current.y = top + height / 2;
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

    const imageRef = React.useRef<HTMLDivElement>(null);
    function onRotateStart() {
        imageRef.current!.style.transition = 'none';
    }

    function onRotate(angle: number) {
        imageRef.current!.style.transform = `translate3d(-50%, -50%, 0) scale(${scale}) rotate(${angle}deg)`;
    }

    function onRotateEnd(angle: number) {
        imageRef.current!.style.transition = '';
        dispatch(rotatePostcard(angle));
    }
    const { onMouseDown } = useMouseRotation(
        centerRef,
        postcard.rotation,
        onRotateStart,
        onRotate,
        onRotateEnd
    );

    return (
        <div className="PostcardView" ref={divRef}>
            <div
                className="PostcardView-image"
                ref={imageRef}
                style={{
                    backgroundImage: `url(${postcard.imageUrl})`,
                    width: `${postcard.width}px`,
                    height: `${postcard.height}px`,
                    transition: noTransition ? 'none' : '',
                    transform: `translate3d(-50%, -50%, 0) scale(${scale}) rotate(${postcard.rotation}deg)`
                }}
                onMouseDown={onMouseDown}
            >
                <FontAwesomeIcon
                    size="3x"
                    icon={faSync}
                    className="PostcardView-rotateHook"
                    style={{
                        transform: `scale(${1 / scale})`
                    }}
                />
            </div>
            <div className="PostcardView-textBlocks">
                {postcard.textBlocks.map((textBlock, i) => (
                    <TextBlockEntry key={i} textBlock={textBlock} />
                ))}
            </div>
        </div>
    );
};

export default React.memo(PostcardView);
