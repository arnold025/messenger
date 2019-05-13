import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { ConversationService } from 'src/app/services/conversation.service';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.scss']
})
export class ConversationComponent implements OnInit {

  public friendId: any;
  public friend: User;
  public user: User;
  public conversationId: String;
  public textMessage: String;
  public conversation: any;
  public shake: Boolean = false;

  constructor(private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private conversationService: ConversationService,
    private authenticationService: AuthenticationService) {
    // this.friends = userService.getFriends();
    this.friendId = this.activatedRoute.snapshot.params['uid'];
    this.authenticationService.getStatus().subscribe((session) => {
      this.userService.getUserById(session.uid).valueChanges().subscribe((user: User) => {
        this.user = user;
      });
      this.userService.getUserById(this.friendId).valueChanges().
        subscribe((data: User) => {
          this.friend = data;
          const ids = [this.user.uid, this.friend.uid].sort();
          this.conversationId = ids.join('|');
          this.getConversations();
        },
          (error) => {
            console.log(error);
          });
    });
  }

  getMessageModel(text, type) {
    return {
      uid: this.conversationId,
      timestamp: Date.now(),
      text,
      sender: this.user.uid,
      receiver: this.friend.uid,
      type
    };
  }

  sendMessage() {
    const message = this.getMessageModel(this.textMessage, 'text');
    this.conversationService.createConversation(message)
      .then(() => {
        this.textMessage = '';
      });
  }

  sendVibration() {
    const message = this.getMessageModel(null, 'vibration');
    this.conversationService.createConversation(message).then(() => { });
    this.doVibration();
  }

  doVibration() {
    const auido = new Audio('assets/sound/zumbido.m4a');
    auido.play();
    this.shake = true;
    window.setTimeout(() => {
      this.shake = false;
    }, 1000);
  }

  getConversations() {
    this.conversationService.getConversation(this.conversationId).valueChanges()
      .subscribe((response) => {
        this.conversation = response;
        this.conversation.forEach(message => {
          if (!message.seen) {
            message.seen = true;
            this.conversationService.updateConversation(message);
            if (message.type === 'text') {
              const audio = new Audio('assets/sound/new_message.m4a');
              audio.play();
            } else if (message.type === 'vibration') {
              this.doVibration();
            }
          }
        });
        console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

  getUserNickById(id) {
    if (id === this.friend.uid) { return this.friend.nick; }
    return this.user.nick;
  }

  ngOnInit() {
  }

}
