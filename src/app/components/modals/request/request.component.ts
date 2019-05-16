import { Component, OnInit } from '@angular/core';
import { DialogComponent, DialogService } from 'ng2-bootstrap-modal';
import { UserService } from 'src/app/services/user.service';
import { RequestsService } from 'src/app/services/requests.service';

export interface PromptModel {
  scope: any;
  currentRequest: any;
}

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.scss']
})
export class RequestComponent extends DialogComponent<PromptModel, any> implements PromptModel {
  scope: any;
  shouldAdd: String = 'yes';
  currentRequest: any;

  constructor(public dialogService: DialogService,
    private userService: UserService,
    private requestService: RequestsService) {
    super(dialogService);
  }

  accept() {
    console.log(this.currentRequest);
    let typeResponse = '';
    if (this.shouldAdd === 'yes') {
      typeResponse = 'accepted';
    } else if (this.shouldAdd === 'no') {
      typeResponse = 'rejected';
    } else {
      typeResponse = 'decide_later';
    }
    this.requestService.setRequestStatus(this.currentRequest, typeResponse)
      .then((data) => {
        if (this.shouldAdd !== 'yes') { return; }
        this.userService.addFriend(this.scope.user.uid, this.currentRequest.sender)
          .then((response) => {
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
      })
      .catch(error => {
        console.log(error);
      });
  }
}
