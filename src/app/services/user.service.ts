import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public friends: User[];

  constructor() {
    this.friends = this.setFriends();
  }

  setFriends() {
    let usuario1: User = {
      nick: 'Eduardo',
      age: 24,
      email: 'ed@aoe.aoe',
      status: 'online',
      friend: true,
      uid: 1
    };
    let usuario2: User = {
      nick: 'Freddy',
      age: 28,
      email: 'fred@aoe.aoe',
      status: 'offline',
      friend: true,
      uid: 2
    };
    let usuario3: User = {
      nick: 'Yuliana',
      age: 18,
      email: 'yuli@aoe.aoe',
      status: 'busy',
      friend: true,
      uid: 3
    };
    let usuario4: User = {
      nick: 'Ricardo',
      age: 17,
      email: 'rick@aoe.aoe',
      status: 'away',
      friend: false,
      uid: 4
    };
    let usuario5: User = {
      nick: 'Marcos',
      age: 30,
      email: 'marcos@aoe.aoe',
      status: 'online',
      friend: false,
      uid: 5
    };
    return [usuario1, usuario2, usuario3, usuario4, usuario5];
  }
  getFriends(){
    return this.friends;
  }
}
