import PostcardThumb from 'components/PostcardThumb';
import { shallow } from 'enzyme';
import React from 'react';
import { selectPostcard } from 'redux/actions';
import { useDispatch } from 'redux/hooks';
import Postcard from 'types/Postcard';
import PostcardList from './PostcardList';

jest.mock('redux/hooks');
const dispatch = useDispatch();

beforeEach(jest.clearAllMocks);

test('PostcardList can dispatch a selectPostcard action', () => {
    const postcard1: Postcard = {
        imageUrl: 'url',
        scale: 1,
        rotation: 1
    };
    const postcard2: Postcard = { ...postcard1 };

    const container = shallow(
        <PostcardList postcards={[postcard1, postcard2]} selectedIndex={0} />
    );
    container.find(PostcardThumb).at(1).props().selectPostcard(postcard2);

    expect(dispatch).toHaveBeenCalledWith(selectPostcard(1));
});
