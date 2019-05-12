import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private angularFireAuth: AngularFireAuth,
    private router: Router) {

  }

  loginWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(email, password); // return promise
  }

  registerWithEmail(email: string, password: string) {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(email, password);
  }

  getStatus() {
    return this.angularFireAuth.authState;
  }

  logOut() {
    return this.angularFireAuth.auth.signOut()
      .then(() => {
        alert('Sesión cerrada con éxito');
        this.router.navigate(['/login']);
      })
      .catch((error) => {
        console.log(error);
      });
  }
}
