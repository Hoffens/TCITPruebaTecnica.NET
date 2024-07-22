import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { loadPosts, removePost } from '../../state/posts/posts.actions';
import { selectAllPostsFiltered } from '../../state/posts/posts.selector';
import { Post } from './post.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent implements OnInit {
  public allPosts$ = this.store.select(selectAllPostsFiltered);

  constructor(private store: Store) {}

  ngOnInit() {
    this.store.dispatch(loadPosts());
  }

  onDeletePost(post: Post): void {
    this.store.dispatch(removePost({ post }));
  }
}
