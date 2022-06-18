import { IPost } from '../../../models/IPost';

export interface PostsState {
  posts: IPost[];
  loadingPosts: boolean;
}

export enum PostsActionEnum {
  GET_POSTS = 'GET_POSTS',
}

export interface GetPostsAction {
  type: PostsActionEnum.GET_POSTS;
  payload: IPost[];
}

export type PostsAction = GetPostsAction;
