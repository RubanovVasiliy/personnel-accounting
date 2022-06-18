export interface IPost {
  id: string;
  title: string;
  types: IPostType[];
}

interface IPostType {
  id: string;
  title: string;
}
