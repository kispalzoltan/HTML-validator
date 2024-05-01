import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, map } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(private afAuth: AngularFireAuth,
     private toastr: ToastrService,
     private router: Router) {
   }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log("signUp is successful")
        this.afAuth.idTokenResult.subscribe(x => {
          console.log(x?.token)
          localStorage.setItem("access_token", x?.token ?? "");
          localStorage.setItem("email", email);
          this.router.navigate(['/uploadhtml']);
        })
       
      })
      .catch((error) => {
        this.toastr.error('Sikertelen regisztráció!');
      });
  }

  login(email: string, password: string) {
    this.afAuth.signInWithEmailAndPassword(email, password)
      .then((usercred) => {
        console.log("login is successful")
        this.afAuth.idTokenResult.subscribe(x => {
          console.log(x?.token)
          localStorage.setItem("access_token", x?.token ?? "");
          localStorage.setItem("email", email);
          this.router.navigate(['/uploadhtml']);
        })
        
        // Login successful
      })
      .catch((error) => {
        this.toastr.error('Sikertelen bejelentkezés!');
      });
  }

  logout() {
    console.log(this.afAuth.currentUser)
    this.afAuth.signOut()
      .then(() => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("email");

        this.router.navigate(['/login']);
        this.toastr.success('Sikeres kijelentkezés!');
      })
      .catch((error) => {
        this.toastr.error('Sikertelen kijelentkezés!');
      });
  }

  /* get isAuthenticated(): boolean {
    console.log(this.afAuth.currentUser)
    return this.afAuth.currentUser !== null;
  } */
  isAuthenticated(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      map(user => !!user)
    );
  }

}
