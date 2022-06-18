import { PostsAction, PostsActionEnum, PostsState } from './types';

const initialState: PostsState = {
  posts: [],
  loadingPosts: true,
};

export default function RateReducer(
  state = initialState,
  action: PostsAction
): PostsState {
  switch (action.type) {
    case PostsActionEnum.GET_POSTS:
      return { ...state, posts: action.payload, loadingPosts: false };

    default:
      return state;
  }
}
