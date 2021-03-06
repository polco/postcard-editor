import { shallow } from 'enzyme';
import React from 'react';
import PostcardThumb, { Props } from './PostcardThumb';

const defaultProps: Props = {
    postcard: {
        imageUrl: 'url',
        rotation: 0,
        width: 1,
        height: 1,
        textBlocks: []
    },
    isSelected: false,
    x: 0,
    scale: 1,
    selectPostcard: jest.fn(),
    removePostcard: jest.fn()
};

beforeEach(jest.clearAllMocks);

test('PostcardThumb can be selected when clicking', () => {
    const container = shallow<Props>(<PostcardThumb {...defaultProps} />);
    const stopPropagation = jest.fn();
    container.simulate('click', { stopPropagation });

    expect(defaultProps.selectPostcard).toHaveBeenCalledWith(
        defaultProps.postcard
    );
    expect(stopPropagation).toHaveBeenCalled();
});
