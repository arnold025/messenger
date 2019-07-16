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

  public email: string = null;
  public password: string = null;
  public nick: string = null;

  constructor(private authenticationService: AuthenticationService,
    private router: Router) { }

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
}
