import { AppDispatch } from '../..';
import PostsService from '../../../api/PostsService';
import { IPost } from '../../../models/IPost';
import { GetPostsAction, PostsActionEnum } from './types';

export const PostsActionCreators = {
  getPosts: (payload: IPost[]): GetPostsAction => ({
    type: PostsActionEnum.GET_POSTS,
    payload: payload,
  }),

  loadPosts: () => async (dispatch: AppDispatch) => {
    try {
      const response = await PostsService.getPosts();
      dispatch(PostsActionCreators.getPosts(response.data));
    } catch (e) {
      console.log(e);
    }
  },
};
