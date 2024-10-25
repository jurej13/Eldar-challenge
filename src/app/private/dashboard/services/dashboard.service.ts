import { inject, Injectable } from '@angular/core';
import { PostModel } from '../../../shared/interfaces/post.interface';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { DataTableService } from '../../../shared/services/dataTable.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private baseUrl: string = environment.baseUrl;
  private http: HttpClient = inject(HttpClient);
  private dataTableService = inject(DataTableService);

  editPost(post: PostModel) {
    return this.http
      .put<PostModel>(`${this.baseUrl}posts/${post.id}`, JSON.stringify(post), {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          this.dataTableService.updateLocalPost(post);
        })
      );
  }

  createPost(postData: Omit<PostModel, 'id'>) {
    return this.http
      .post<PostModel>(`${this.baseUrl}posts`, postData, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      })
      .pipe(
        tap((response) => {
          const newPost = { ...response, ...postData };
          this.dataTableService.addLocalPost(newPost);
        })
      );
  }
}
