import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public friends: User[];
  public query: String = '';

  constructor(private userService: UserService) {
    this.friends = userService.getFriends();
  }

  ngOnInit() {
  }

}
