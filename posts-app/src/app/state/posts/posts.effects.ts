import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { ListService } from "../../posts/list/list.service";
import { addPost, addPostFailure, addPostSuccess, filterPostFailure, filterPosts, filterPostsSuccess, loadPosts, loadPostsFailure, loadPostsSuccess, removePost, removePostFailure, removePostSuccess } from './posts.actions';
import { catchError, from, map, of, switchMap } from "rxjs";
import { PostState } from "./posts.reducer";
import { select, Store } from "@ngrx/store";
import { selectAllPosts } from "./posts.selector";

@Injectable()
export class PostsEffects {
    constructor(
        private actions$: Actions,
        private store: Store<PostState>,
        private listService: ListService,
    ) {}

    loadPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(loadPosts),
            switchMap(() => {
                console.log('Loading posts...');
                return from(this.listService.getPosts()).pipe(
                    map((posts) => {
                        console.log('Posts loaded:', posts);
                        return loadPostsSuccess({ posts });
                    }),
                    catchError((error) => {
                        console.error('Error loading posts:', error);
                        return of(loadPostsFailure({ error: error.message }));
                    })
                );
            })
        )    
    );

    removePost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removePost),
            switchMap(({ post }) =>
                from(this.listService.deletePost(post.id)).pipe(
                    map(() => removePostSuccess({ post })),
                    catchError((error) => of(removePostFailure({ error: error.message })))
                )
            )
        )
    );

    addPost$ = createEffect(() =>
        this.actions$.pipe(
            ofType(addPost),
            switchMap(({ post }) =>
                from(this.listService.addPost(post)).pipe(
                    map((addedPost) => addPostSuccess({ post: addedPost })),
                    catchError((error) => of(addPostFailure({ error: error.message })))
                )
            )
        )
    );

    filterPosts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(filterPosts),
            switchMap(({ filter }) => 
                this.store.pipe(
                    select(selectAllPosts),
                    map(posts => {
                        const filteredPosts = posts.filter(post => 
                            post.name.toLowerCase().includes(filter.toLowerCase())
                        );
                        return filterPostsSuccess({ posts: filteredPosts });
                    }),
                    catchError(error => of(filterPostFailure({ error: error.message })))
                )
            )
        )
    );
}