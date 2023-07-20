import { User } from "./user.model";

export interface Blog {
    category: string;
    postContent: string;
    postCreation: string;
    postId: number;
    postImage: string;
    postTitle: string;
    postUpdation: string;
    user: User
    disLike: number;
    favorite: number;
    postlike: number;
}