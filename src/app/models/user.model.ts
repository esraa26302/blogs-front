export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  image?: string;
  posts?: Post[];
  comments?: Comment[];
}

export interface Post {
  id?: number;
  image: string;
  content: string;
  userId: number;
  user?: User;
  comments?: Comment[];
  userName: string;
  userImage: string;
  creationDate: string;
}

export interface Comment {
  id: number;
  content: string;
  title?: string; 
  userId: number;
  postId: number;
  userName: string;
  userImage: string;
  user?: User;
  post?: Post;
  replies?: Comment[];
  parentCommentId? :number;
}



export interface CommentCreateDto {
  content: string;
  title?: string;
  postId?: number;
  parentCommentId?: number;
}

export interface CommentUpdateDto {
  content: string;
  title?: string;
}
  
  export interface LoginDto {
    email: string;
    password: string;
  }
  