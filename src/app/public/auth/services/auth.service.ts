import { inject, Injectable, signal, WritableSignal } from '@angular/core';
import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UserRoleEnum } from '../../../core/enums/UserRole.enum';
import { UserModel } from '../interfaces/user.interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly baseUrl: string = environment.baseUrl;
  private http = inject(HttpClient);
  private readonly TOKEN_KEY: string = environment.JWT_KEY;
  private _currentUser: WritableSignal<UserModel | null> =
    signal<UserModel | null>(null);
  constructor() {}
  get currentUser() {
    return this._currentUser;
  }
  private generateToken(user: UserModel): string {
    const tokenData = {
      sub: user.id,
      username: user.username,
      role: user.role,
      exp: new Date().getTime() + 24 * 60 * 60 * 1000,
    };
    return btoa(JSON.stringify(tokenData));
  }
  login(
    username: string
  ): Observable<{ success: boolean; user: UserModel | null }> {
    return this.http.get<any[]>(`${this.baseUrl}users`).pipe(
      map((users) => {
        const user = users.find(
          (u) => u.username.toLowerCase() === username.toLowerCase()
        );

        if (user) {
          const role =
            user.id % 2 === 0 ? UserRoleEnum.Admin : UserRoleEnum.User;
          const userData: UserModel = {
            id: user.id,
            name: user.name,
            username: user.username,
            email: user.email,
            role,
            phone: user.phone,
          };
          const token = this.generateToken(userData);
          this._currentUser.set({
            ...userData,
            token,
          });
          console.log(this._currentUser());
          return { success: true, user: this.currentUser() };
        } else {
          return { success: false, user: this._currentUser() };
        }
      })
    );
  }
  logout(): void {
    this._currentUser.set(null);
  }
}
