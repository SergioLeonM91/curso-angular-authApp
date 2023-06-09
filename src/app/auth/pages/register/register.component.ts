import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent {

  myForm: FormGroup = this._fb.group({
    name: [
      'Test4',
      [ Validators.required ]
    ],
    email: [
      'test4@test.com',
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

  register() {
    const { name, email, password } = this.myForm.value;

    this._authService.register(name, email, password)
      .subscribe( valid => {
        if(valid === true) {
          this._router.navigateByUrl('/dashboard');
        } else {
          Swal.fire('Error', valid, 'error');
        }
      });

  }
}
