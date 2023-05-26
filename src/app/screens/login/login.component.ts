import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { InputBase } from 'src/app/classes/forms/InputBase';
import { LoginResponse } from 'src/app/interfaces/LoginResponse';
import { AuthService } from 'src/app/services/auth/auth.service';
import { FormService } from 'src/app/services/form/form.service';
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
    private formService: FormService
  ) {
    /*
    this.userForm$ = this.formService.editUserForm({
      id: '10',
      lastName: 'Rossi',
      firstName: 'Mario',
      birthDate: '11/29/1999',
      email: 'mariorossi@gmail.com',
      phoneNumber: '3333333333',
      role: 'marketing',
    });
    */
    /*
     this.userForm$ = this.formService.addUserForm();
     */
    /*
     this.userForm$ = this.formService.editProductForm({
       brand: 'nike',
       id: '12112',
       images: 'images',
       listedPrice: '300.00',
       productName: 'Air',
       category: 'shoes',
       colour: 'white',
       englishDescription: 'english description',
       italianDescription: 'italian description',
       quantity: '22',
       size: '42',
       type: 'Initial type',
     });
     */
    /*
     this.userForm$ = this.formService.addCouponForm();
     this.userForm$ = this.formService.editOrderForm({
      status: 'completed',
     });
     */
    /*
     this.userForm$ = this.formService.editPersonalDataForm({
       firstName: 'Fra',
       lastName: 'Sci',
       birthDate: '11/29/1999',
       email: 'fra@gmail.com',
       password: 'Password@1',
       phoneNumber: '3333333333',
     });
*/
    // this.userForm$ = this.formService.personalAddressForm({
    //   label: 'label',
    //   fullName: 'Mario Rossi',
    //   address: 'Via Roma',
    //   country: 'Italia',
    //   phoneNumber: '333333333',
    //   zipCode: '39239',
    //   instructions: 'adsfashfk',
    // });
  }

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
        next: (resp) => {
          console.log('resp login', resp);
          this.handleResponse(resp);
        },
        error: (err) => this.handleLoginError(err),
      });
    }
  }

  onsub(event: any) {
    console.log(event);
  }
}
