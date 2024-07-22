import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { first, firstValueFrom } from "rxjs";
import { PostForm } from "../form/form.model";

@Injectable({ providedIn: 'root' })
export class ListService {
    private apiUrl = 'https://localhost:44370/api/posts';

    constructor(private http: HttpClient) { }

    async getPosts(): Promise<Post[]> {

      const result = await firstValueFrom(this.http.get<Post[]>(this.apiUrl));

      console.log(`getPosts - service: ${result}`);

      return result || [];
    }

    async deletePost(id: number) {
      const result = await firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`));

      console.log(`deletePost - service: ${result}`);

      return result || [];
    }

    async addPost(newPost: PostForm): Promise<Post> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/json'
      });

      const result = await firstValueFrom(
          this.http.post<Post>(this.apiUrl, newPost, { headers })
      );

      console.log(`addPost - service: ${result}`);
      
      return result;
    }
}