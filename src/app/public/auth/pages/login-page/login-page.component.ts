import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'login-page',
  standalone: true,
  imports: [ButtonModule, ReactiveFormsModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  private fb = inject(FormBuilder);
  private loginService = inject(AuthService);
  public loginForm = this.fb.group({
    username: ['', [Validators.required, Validators.minLength(3)]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });
  constructor() {}

  ngOnInit() {}

  login() {
    console.log(this.loginForm.value);
    const { username, password } = this.loginForm.value;
    if (username && password) {
      this.loginService.login(username).subscribe({
        next: (res) => {
          if (res.success) {
            console.log(
              `Login successful! User: ${JSON.stringify(res.user, null, 2)} `
            );
          } else {
            console.log('Login failed');
          }
        },
        error: (err) => {
          console.error('Error during login', err);
        },
      });
    }
  }
}
