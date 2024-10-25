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
  private _filteredPosts = signal<PostModel[]>([]);

  private initialLoad$: Observable<PostModel[]>;

  constructor() {
    this.initialLoad$ = this.http.get<PostModel[]>(`${this.baseUrl}posts`).pipe(
      tap((posts) => {
        this._posts.set(posts);
        this._filteredPosts.set(posts);
      })
    );
  }

  searchPosts(searchTerm: string): void {
    if (!searchTerm.trim()) {
      this._filteredPosts.set(this._posts());
      return;
    }

    const lowercaseSearch = searchTerm.toLowerCase().trim();
    const filtered = this._posts().filter(
      (post) =>
        post.title.toLowerCase().includes(lowercaseSearch) ||
        post.body.toLowerCase().includes(lowercaseSearch)
    );
    this._filteredPosts.set(filtered);
  }

  getPaginatedPosts(page: number): Observable<PostModel[]> {
    this._currentPage.set(page);
    if (this._posts().length === 0) {
      return this.initialLoad$.pipe(
        map((posts) => this.paginateData(this._filteredPosts(), page))
      );
    }
    return of(this._filteredPosts()).pipe(
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
      const currentFiltered = this._filteredPosts();
      const filteredIndex = currentFiltered.findIndex(
        (post) => post.id === updatedPost.id
      );
      if (filteredIndex !== -1) {
        const newFiltered = [...currentFiltered];
        newFiltered[filteredIndex] = updatedPost;
        this._filteredPosts.set(newFiltered);
      }
    }
  }

  addLocalPost(newPost: PostModel): void {
    const currentPosts = this._posts();
    const postWithId = {
      ...newPost,
      id: Math.max(...currentPosts.map((p) => p.id)) + 1,
    };
    this._posts.set([postWithId, ...currentPosts]);
    this._filteredPosts.set([postWithId, ...this._filteredPosts()]);
  }

  getPosts() {
    return this._filteredPosts();
  }

  getCurrentPage() {
    return this._currentPage();
  }

  getTotalPosts() {
    return this._filteredPosts().length;
  }
}
