import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input() uid: String;
  public contact: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    console.log(this.uid);
    this.userService.getUserById(this.uid).valueChanges().subscribe((data: User) => {
      this.contact = data;
    })
  }

}
