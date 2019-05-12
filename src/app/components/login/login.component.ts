import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public operationType: String = 'login';
  public email: string = null;
  public password: string = null;
  public nick: string = null;
  constructor(private authenticationService: AuthenticationService,
    private userService: UserService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginWithEmail(this.email, this.password)
      .then((data) => {
        alert('Logeado correctamente');
        console.log(data);
        this.router.navigate(['home']);
      }).catch((error) => {
        alert('error');
        console.log(error);
      });
  }

  register() {
    this.authenticationService.registerWithEmail(this.email, this.password)
      .then((data) => {
        const user = {
          uid: data.user.uid,
          email: this.email,
          nick: this.nick
        };
        this.userService.createUser(user)
          .then((data2) => {
            alert('Registrado correctamente');
            console.log(data2);
          })
          .catch((error2) => {
            alert('Ha ocurrido un error');
            console.log(error2);
          });
      }).catch((error) => {
        console.log(error);
      });
  }

}
