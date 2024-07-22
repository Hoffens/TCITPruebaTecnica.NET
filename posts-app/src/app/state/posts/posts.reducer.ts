import { Action, createReducer, on } from "@ngrx/store";
import { Post } from "../../posts/list/post.model";
import { addPost, addPostSuccess, filterPostsSuccess, loadPostsSuccess, removePostSuccess } from './posts.actions';
import { PostForm } from "../../posts/form/form.model";

export interface PostState {
    posts: Post[];
    filteredPosts: Post[];
    postForm: PostForm;
    isBtnDisabled: boolean;
}
  
export const initialState: PostState = {
  posts: [],
  filteredPosts: [],
  postForm: {
    name: '',
    description: ''
  },
  isBtnDisabled: false
};

export interface PostToAddState {
    post: PostForm;
    added: boolean;
}

export const initialPostToAddState: PostToAddState = {
    post: {
        name: '',
        description: ''
    },
    added: false
}

const _postReducer = createReducer(
    initialState,
    on(loadPostsSuccess, (state, { posts }) => {
        console.log('Reducer - posts:', posts); 
        return { ...state, posts, filteredPosts: posts };
    }),
    on(filterPostsSuccess, (state, { posts }) => ({
        ...state,
        filteredPosts: posts
        //posts: posts
    })),
    on(removePostSuccess, (state, { post }) => ({
        ...state,
        filteredPosts: state.posts.filter(p => p.id !== post.id),
        posts: state.posts.filter(p => p.id !== post.id),
    })),
    on(addPostSuccess, (state, { post }) => ({
        ...state,
        posts: [...state.posts, post],
        filteredPosts: [...state.posts, post],
        postForm: {
            name: '',
            description: ''
        },
        isBtnDisabled: false
    })),
);

export function postReducer(state: PostState | undefined, action: Action) {
    return _postReducer(state, action);
}
