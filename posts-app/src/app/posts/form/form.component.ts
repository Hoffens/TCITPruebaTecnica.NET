import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { addPost } from '../../state/posts/posts.actions';
import { PostForm } from './form.model';
import { Observable } from 'rxjs';
import { PostState } from '../../state/posts/posts.reducer';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit {
  postName: string = '';
  postDescription: string = '';
  isFormValid: boolean = true;
  postForm$: Observable<PostForm | null>;
  isButtonDisabled$: Observable<boolean>;

  constructor(private store: Store<PostState>) {
    this.isButtonDisabled$ = this.store.pipe(select(state => state.isBtnDisabled));
    this.postForm$ = this.store.pipe(select(state => state.postForm));
  }

  ngOnInit() {
    this.postForm$.subscribe(form => {
      if (form) {
        this.postName = form.name;
        this.postDescription = form.description;
      }
    });
  }

  validateInputs() {
    if (!this.postName || !this.postDescription) {
      this.isFormValid = false;
    } else {
      this.isFormValid = true;
    }
  }

  onAddPost() {
    this.validateInputs();

    if (!this.isFormValid) {
      console.log('invalid!!');
      return;
    }

    const newPost: PostForm = {
      name: this.postName,
      description: this.postDescription
    }

    this.store.dispatch(addPost({ post: newPost }));
  }
}
