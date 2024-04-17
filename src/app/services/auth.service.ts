import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';




@Injectable({
  providedIn: 'root'
})
export class AuthService {

  

  constructor(private afAuth: AngularFireAuth) {
   }

  signUp(email: string, password: string) {
    this.afAuth.createUserWithEmailAndPassword(email, password)
      .then(() => {
        // Sign up successful
       
      })
      .catch((error) => {
        // An error occurred
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
        })
        
        // Login successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  logout() {
    this.afAuth.signOut()
      .then(() => {
        // Logout successful
      })
      .catch((error) => {
        // An error occurred
      });
  }

  get isAuthenticated(): boolean {
    return this.afAuth.currentUser !== null;
  }

}
