import axios, { AxiosResponse } from 'axios';
import { IPost } from '../models/IPost';

export default class PostsService {
  private static REACT_API = 'http://localhost:5000/posts';

  static async getPosts(): Promise<AxiosResponse<IPost[]>> {
    return await axios.get<IPost[]>(`${this.REACT_API}`);
  }
}
