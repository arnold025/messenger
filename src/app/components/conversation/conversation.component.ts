import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  public friendId: any;
  public friends: User[];
  public friend: User;
  public price: number = 78.2362596594949;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService) {
    this.friends = userService.getFriends();
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.friend = this.getFriendById(this.friendId);
  }

  getFriendById(friendId) {
    const user = this.friends.filter(friend => friend.uid === parseInt(friendId));
    if (user[0]) { return user[0]; }
  }

  ngOnInit() {
  }

}
