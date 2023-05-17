import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public hide: boolean = true;
  loginForm!: FormGroup;
  passwordReg: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>\/?])(?=.*[^\s]).{8,}$/;
  emailReg: RegExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i;

  constructor(
    private authService: AuthService,
    private storageService: StorageService,
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('paolo1@gmail.com', [
        Validators.required,
        Validators.pattern(this.emailReg),
      ]),
      password: new FormControl('Password@1', [
        Validators.required,
        Validators.pattern(this.passwordReg),
      ]),
    });
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

  handleResponse(resp: LoginResponse): void {
    console.log('loggato con successo');
    this.storageService.setStorage<string>('token', resp.token);
    this.storageService.setStorage<string>('refreshToken', resp.refreshToken);
  }

  handleLoginError(err: any): void {
    console.log(err);
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe({
        next: (resp) => this.handleResponse(resp),
        error: (err) => this.handleLoginError(err),
      });
    }
  }
}
