import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  public friendId: any;
  public friends: User[];
  public friendSelected: User;

  constructor(private activatedRoute: ActivatedRoute) {
    this.friends = this.getFriends();
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    const friend = this.getFriendById(this.friendId);
    console.log(friend);
  }
  getFriendById(friendId) {
    return this.friends.filter(friend => friend.uid === parseInt(friendId))[0];
  }

  getFriends() {
    let usuario1: User = {
      nick: 'Eduardo',
      age: 24,
      email: 'ed@aoe.aoe',
      friend: true,
      uid: 1
    };
    let usuario2: User = {
      nick: 'Freddy',
      age: 28,
      email: 'fred@aoe.aoe',
      friend: true,
      uid: 2
    };
    let usuario3: User = {
      nick: 'Yuliana',
      age: 18,
      email: 'yuli@aoe.aoe',
      friend: true,
      uid: 3
    };
    let usuario4: User = {
      nick: 'Ricardo',
      age: 17,
      email: 'rick@aoe.aoe',
      friend: false,
      uid: 4
    };
    let usuario5: User = {
      nick: 'Marcos',
      age: 30,
      email: 'marcos@aoe.aoe',
      friend: false,
      uid: 5
    };
    return [usuario1, usuario2, usuario3, usuario4, usuario5];
  }

  ngOnInit() {
  }

}
