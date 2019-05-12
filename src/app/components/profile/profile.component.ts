import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService) {
    this.authenticationService.getStatus().subscribe(
      (status) => {
        this.userService.getUserById(status.uid).valueChanges().subscribe(
          (data: User) => {
            this.user = data;
          },
          (error) => {
            console.log(error);
          }
        )
      },
      (error) => {
        console.log(error);
      }
    );
  }

  ngOnInit() {
  }

  saveSettings() {
    this.userService.editUser(this.user)
      .then(() => {
        alert('Cambios guardados corectamente');
      })
      .catch((error) => {
        console.log(error);
      });
  }
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
