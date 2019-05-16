import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RequestsService } from 'src/app/services/requests.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  public friends: User[];
  public query: String = '';
  public friendEmail: String = '';
  public user: User;
  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    private requestService: RequestsService) {
    this.setFriends();

    this.authenticationService.getStatus().subscribe(status => {
      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {
        this.user = data;
        if (this.user.friends) {
          this.user.friends = Object.values(this.user.friends);
        }
      });
    });
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

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result
      .then((result) => {

      }, (reason) => {

      });
  }
  sendRequest() {
    const request = {
      timestamp: Date.now(),
      receiverEmail: this.friendEmail,
      senderId: this.user.uid,
      status: 'pending'
    };
    this.requestService.createRequest(request)
      .then(() => {
        alert('Solicitud enviada');
      })
      .catch((error) => {
        alert('ha ocurrido un error');
        console.log(error);
      });
  }
}
