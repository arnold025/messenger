import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public friends: User[];
  public query: String = '';

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService) {
    this.setFriends();
  }

  setFriends() {
    this.userService.getUsers().valueChanges().subscribe(
      (data: User[]) => {
        this.friends = data;
      }, (error) => {
        console.log(error);
      });
  }

  logOut() {
    this.authenticationService.logOut();
  }

  ngOnInit() {
  }

}
