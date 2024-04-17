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

  constructor(private formBuilder: FormBuilder,private authService: AuthService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const username = this.loginForm?.get('username')?.value;
      const password = this.loginForm?.get('password')?.value;
      
      this.login(username, password)

      console.log('Felhasználónév:', username);
      console.log('Jelszó:', password);
    } else {
      // Ha a form érvénytelen, megjeleníthetsz hibaüzeneteket vagy más visszajelzést a felhasználónak
    }
  }

  get isAuthenticated(): boolean {
    return this.authService.isAuthenticated;
  }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }
}
