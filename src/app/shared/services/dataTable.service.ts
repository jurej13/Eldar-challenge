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
        console.log('Posts cargados:', posts);
        this._posts.set(posts);
      })
    );
  }

  getPaginatedPosts(page: number): Observable<PostModel[]> {
    this._currentPage.set(page);
    if (this._posts().length === 0) {
      return this.initialLoad$.pipe(
        map((posts) => {
          const startIndex = (page - 1) * 10;
          const endIndex = startIndex + 10;
          return posts.slice(startIndex, endIndex);
        })
      );
    }
    return of(this._posts()).pipe(
      map((posts) => {
        const startIndex = (page - 1) * 10;
        const endIndex = startIndex + 10;
        return posts.slice(startIndex, endIndex);
      })
    );
  }

  refreshPosts(): void {
    this.initialLoad$.subscribe();
  }

  getPosts() {
    return this._posts();
  }

  getCurrentPage() {
    return this._currentPage();
  }
}
