import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  signupForm!: FormGroup;

  constructor(private formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.signupForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSignup(){
    if (this.signupForm.valid) {
      const email = this.signupForm?.get('email')?.value;
      const password = this.signupForm?.get('password')?.value;
      
      this.signUp(email, password)

      //console.log(this.isAuthenticated)

      console.log('Felhasználónév:', email);
      console.log('Jelszó:', password);
    } else {
      // Ha a form érvénytelen, megjeleníthetsz hibaüzeneteket vagy más visszajelzést a felhasználónak
    }
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      const email = this.loginForm?.get('email')?.value;
      const password = this.loginForm?.get('password')?.value;
      
      this.login(email, password)

      //console.log(this.isAuthenticated)

      console.log('Felhasználónév:', email);
      console.log('Jelszó:', password);
    } else {
      // Ha a form érvénytelen, megjeleníthetsz hibaüzeneteket vagy más visszajelzést a felhasználónak
    }
  }

  /*get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }*/

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  signUp(email: string, password: string){
    this.authService.signUp(email, password);
  }
}
