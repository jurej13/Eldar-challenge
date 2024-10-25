import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable, of, tap } from 'rxjs';
import { PostModel } from '../interfaces/post.interface';

@Injectable({
  providedIn: 'root',
})
export class DataTableService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);

  private _posts = signal<PostModel[]>([]);
  private _currentPage = signal<number>(1);

  private initialLoad$: Observable<PostModel[]>;

  constructor() {
    this.initialLoad$ = this.http.get<PostModel[]>(`${this.baseUrl}posts`).pipe(
      tap((posts) => {
        this._posts.set(posts);
      })
    );
  }

  getPaginatedPosts(page: number): Observable<PostModel[]> {
    this._currentPage.set(page);
    if (this._posts().length === 0) {
      return this.initialLoad$.pipe(
        map((posts) => this.paginateData(posts, page))
      );
    }
    return of(this._posts()).pipe(
      map((posts) => this.paginateData(posts, page))
    );
  }

  private paginateData(posts: PostModel[], page: number): PostModel[] {
    const startIndex = (page - 1) * 10;
    const endIndex = startIndex + 10;
    return posts.slice(startIndex, endIndex);
  }
  updateLocalPost(updatedPost: PostModel): void {
    const currentPosts = this._posts();
    const index = currentPosts.findIndex((post) => post.id === updatedPost.id);
    if (index !== -1) {
      const newPosts = [...currentPosts];
      newPosts[index] = updatedPost;
      this._posts.set(newPosts);
    }
  }
  addLocalPost(newPost: PostModel): void {
    const currentPosts = this._posts();
    const postWithId = {
      ...newPost,
      id: Math.max(...currentPosts.map((p) => p.id)) + 1,
    };
    this._posts.set([postWithId, ...currentPosts]);
  }

  getPosts() {
    return this._posts();
  }

  getCurrentPage() {
    return this._currentPage();
  }
}
