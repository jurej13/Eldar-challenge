import { Component, inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import {
  selectAuthError,
  selectIsAuthenticated,
} from '../../../../core/store/auth/selectors/auth.selectors';
import { loginRequest } from '../../../../core/store/auth/actions/auth.actions';
@Component({
  selector: 'login-page',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent {
  private fb = inject(FormBuilder);
  private store = inject(Store);

  public loginForm: FormGroup = this.fb.group({
    username: ['Antonette', [Validators.required, Validators.minLength(3)]],
    password: ['asdasdasd', [Validators.required, Validators.minLength(6)]],
  });

  isAuthenticated$ = this.store.select(selectIsAuthenticated);
  error$ = this.store.select(selectAuthError);

  constructor() {}

  login() {
    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.store.dispatch(loginRequest({ username }));
    }
  }
}
