import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isAuth: boolean = false; 

  constructor(private authService:AuthService){
    console.log(this.authService.isAuthenticated )
  this.authService.isAuthenticated().subscribe({
    next:(value) => {
        console.log(value)
        this.isAuth = value
    },
  })
  }

  logout(){
    this.authService.logout();
  }
}
