import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { filterPosts } from '../../state/posts/posts.actions';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.css'
})
export class FilterComponent {
  filter: string = '';

  constructor(private store: Store) {}

  onFilter() {
    console.log(this.filter)
    this.store.dispatch(filterPosts({ filter: this.filter }));
  }
}
