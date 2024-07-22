import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PostState, PostToAddState } from "./posts.reducer";

export const selectPostState = createFeatureSelector<PostState>('posts');

export const selectAllPosts = createSelector(
    selectPostState,
    (state: PostState) => {
        console.log('Selector - state.posts:', state.posts); 
        return state.posts;
    }
);

export const selectAllPostsFiltered = createSelector(
    selectPostState,
    (state: PostState) => {
        console.log('Selector - state.filteredPosts:', state.filteredPosts); 
        return state.filteredPosts;
    }
);