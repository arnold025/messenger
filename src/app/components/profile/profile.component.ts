import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { UserService } from 'src/app/services/user.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { AngularFireStorage } from '@angular/fire/storage';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public user: User;
  public imageChangedEvent: any = '';
  public croppedImage: any = '';
  public picture: any;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService,
    private firebaseStorage: AngularFireStorage) {
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
    if (this.croppedImage) { this.saveImage(); }
    this.saveDataUser();
  }

  saveImage() {
    const currentPictureId = Date.now();
    const pictures = this.firebaseStorage.ref(`pictures/${currentPictureId}.jpg`).putString(this.croppedImage, 'data_url');
    pictures
      .then((result) => {
        this.picture = this.firebaseStorage.ref(`pictures/${currentPictureId}.jpg`).getDownloadURL();
        this.picture.subscribe((p) => {
          this.userService.setAvatar(p, this.user.uid)
            .then(() => {
              alert('Avatar subido correctamente');
            })
            .catch(error => {
              alert('Hubo un error al subir la imagen');
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  saveDataUser() {
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
