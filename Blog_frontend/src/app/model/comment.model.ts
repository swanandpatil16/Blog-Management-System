import { Blog } from "./blog.model";
import { User } from "./user.model";

export interface Comment{
    commentId: number;
    content: string;
    post: Blog;
    user: User;
}