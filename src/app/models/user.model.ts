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
    id?: number ;
    image: string ;
    content: string ;
    userId: number ;
    user?: User;
    comments?: Comment[];
    userName: string;
    userImage:string;
    creationDate: string;
  }
  
  export interface Comment {
    id: number;
    content: string;
    userId: number;
    postId: number;
    user?: User;
    post?: Post;
  }
  
  export interface LoginDto {
    email: string;
    password: string;
  }
  