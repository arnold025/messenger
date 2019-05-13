import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class RequestsService {

  constructor(private angularFireDataBase: AngularFireDatabase) {

  }

  createRequest(request) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.angularFireDataBase.object('requests/' + cleanEmail + '/' + request.senderId).set(request);
  }

  setRequestStatus(request, status) {
    const cleanEmail = request.receiverEmail.replace('.', ',');
    return this.angularFireDataBase.object('requests/' + cleanEmail + '/' + request.senderId + '/status').set(request);
  }

  getRequestsForEmail(email) {
    const cleanEmail = email.replace('.', ',');
    return this.angularFireDataBase.list('requests/' + cleanEmail);
  }
}
