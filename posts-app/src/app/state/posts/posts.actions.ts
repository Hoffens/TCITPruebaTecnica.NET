import { createAction, props } from "@ngrx/store";
import { PostForm } from "../../posts/form/form.model";
import { Post } from "../../posts/list/post.model";

export const addPost = createAction(
    '[Add Post Form] Add Post',
    props<{ post: PostForm }>()
);

export const addPostSuccess = createAction(
    '[Add Post API] Add Post Success',
    props<{ post: Post }>()
);

export const addPostFailure = createAction(
    '[Add Post API] Add Post Failure',
    props<{ error: string }>()
);

export const removePost = createAction(
    '[Remove Post Form] Remove Post',
    props<{ post: Post }>()
);

export const removePostSuccess = createAction(
    '[Remove Post API] Remove Post Success',
    props<{ post: Post }>()
);

export const removePostFailure = createAction(
    '[Remove Post API] Remove Post Failure',
    props<{ error: string }>()
);

export const filterPosts = createAction(
    '[Posts Filter] Filter posts',
    props<{ filter: string }>()
);

export const filterPostsSuccess = createAction(
    '[Posts Filter] Filter posts Success',
    props<{ posts: Post[] }>()
);

export const filterPostFailure = createAction(
    '[Posts Filter] Filter Post Failure',
    props<{ error: string }>()
);

export const loadPosts = createAction('[Posts List] Load posts');

export const loadPostsSuccess = createAction(
    '[Posts API] Posts Load Success',
    props<{ posts: Post[] }>()
);

export const loadPostsFailure = createAction(
    '[Posts API] Posts Load Failure',
    props<{ error: string }>()
);