import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './posts/list/list.component';
import { FormComponent } from './posts/form/form.component';
import { StoreModule } from '@ngrx/store';
import { postReducer } from './state/posts/posts.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PostsEffects } from './state/posts/posts.effects';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './posts/filter/filter.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    FormComponent,
    FilterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    StoreModule.forRoot({ posts: postReducer }),
    EffectsModule.forRoot([PostsEffects]),
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
