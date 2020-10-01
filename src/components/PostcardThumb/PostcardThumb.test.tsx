import { shallow } from 'enzyme';
import React from 'react';
import PostcardThumb, { Props } from './PostcardThumb';

const defaultProps: Props = {
    postcard: { imageUrl: 'url', rotation: 0, scale: 1 },
    isSelected: false,
    selectPostcard: jest.fn()
};

beforeEach(jest.clearAllMocks);

test('PostcardThumb can be selected when clicking', () => {
    const container = shallow<Props>(<PostcardThumb {...defaultProps} />);
    container.simulate('click');

    expect(defaultProps.selectPostcard).toHaveBeenCalledWith(
        defaultProps.postcard
    );
});
