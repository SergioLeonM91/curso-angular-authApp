import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent {

  myForm: FormGroup = this._fb.group({
    email: [
      'test1@test.com',
      [ Validators.required, Validators.email ]
    ],
    password: [
      '123456',
      [ Validators.required, Validators.minLength(6) ]
    ]
  });

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _authService: AuthService
  ) {}

  login() {
    const { email, password } = this.myForm.value;

    this._authService.login(email, password)
      .subscribe( valid => {
        if(valid === true) {
          this._router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', valid, 'error');
        }
      });
  }
}
