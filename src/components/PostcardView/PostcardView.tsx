import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSync } from '@fortawesome/free-solid-svg-icons/faSync';

import TextBlockEntry from 'components/TextBlockEntry';

import Postcard from 'types/Postcard';
import { rotatePostcard } from 'redux/postcardActions';
import { useDispatch } from 'redux/hooks';

import useMouseRotation from './useMouseRotation';
import useDisplayScale from './useDisplayScale';

import './PostcardView.scss';

export interface Props {
    postcard: Postcard;
    zoom: number;
}

const PostcardView: React.FC<Props> = ({ postcard, zoom }) => {
    const dispatch = useDispatch();
    const { scale, canvaRef } = useDisplayScale(postcard, zoom);

    // no transition when changing the selected postcard
    const lastPostcard = React.useRef(postcard.imageUrl);
    let noTransition = false;
    if (lastPostcard.current !== postcard.imageUrl) {
        lastPostcard.current = postcard.imageUrl;
        noTransition = true;
    }

    const imageRef = React.useRef<HTMLDivElement>(null);
    function onRotateStart() {
        imageRef.current!.style.transition = 'none';
        const box = imageRef.current!.getBoundingClientRect();
        return { x: box.left + box.width / 2, y: box.top + box.height / 2 };
    }

    function onRotate(angle: number) {
        imageRef.current!.style.transform = `translate3d(-50%, -50%, 0) scale(${scale}) rotate(${angle}deg)`;
    }

    function onRotateEnd(angle: number) {
        imageRef.current!.style.transition = '';
        dispatch(rotatePostcard(angle));
    }
    const { onMouseDown } = useMouseRotation(
        postcard.rotation,
        onRotateStart,
        onRotate,
        onRotateEnd
    );

    return (
        <div className="PostcardView" ref={canvaRef}>
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
