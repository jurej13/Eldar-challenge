import { inject, Injectable } from '@angular/core';
import { PostModel } from '../../../shared/interfaces/post.interface';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl: string = environment.baseUrl;
  private http: HttpClient = inject(HttpClient);
  constructor() {}
  editPost(post: PostModel) {
    console.log('post entrando al servicio', post);
    return this.http.put<PostModel>(
      `${this.baseUrl}posts/${post.id}`,
      JSON.stringify(post),
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
  }
  createPost(postData: Omit<PostModel, 'id'>) {
    console.log('post entrando al servicio', postData);
    return this.http.post<PostModel>(`${this.baseUrl}posts`, postData, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
  }
}
