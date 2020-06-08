import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Photo} from '../../shared/models';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {AuthenticationServiceService} from '../../_services/authentication-service.service';
import {UserService} from '../../_services/user.service';
import {AlertifyService} from '../../_services/alertify-service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  @Input() photos: Photo[]
  @Output() onProfilePhotoChange = new EventEmitter<string>();
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  baseUrl = environment.apiUrl


  constructor(private authService: AuthenticationServiceService,
              private userService: UserService,
              private alertifyService: AlertifyService) {}

  ngOnInit(): void {

    this.uploader = new FileUploader({
      url: `${this.baseUrl}users/${this.authService.decodedToken.nameid}/photos`,
      authToken: `Bearer ${localStorage.getItem('token')}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024,
    });

    this.uploader.onAfterAddingFile = (fileItem => { fileItem.withCredentials = false;});

    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if(response){
        const res: Photo = JSON.parse(response)
        const photo = {
          id: res.id,
          description: res.description,
          dateAdded: res.dateAdded,
          url: res.url,
          isMain: res.isMain
        };
        this.photos.push(photo);
      }
    }

    this.hasBaseDropZoneOver = false;
  }

  fileOverBase(e:any):void {
    this.hasBaseDropZoneOver = e;
  }

  setAsMainPhoto(photo:Photo) {
    this.userService.updateProfilePhoto(+this.authService.decodedToken.nameid,photo.id).subscribe( responseData => {
      const mainPhoto = this.photos.filter( photo => photo.isMain)[0];
      mainPhoto.isMain = false;
      photo.isMain = true;
      this.onProfilePhotoChange.emit(photo.url)
    }, error => {
      this.alertifyService.errorMessage(error);
    });
  }

  onDeletePhoto(photo: Photo) {
    this.userService.deletePhoto(+this.authService.decodedToken.nameid, photo.id).subscribe( responseData => {
      this.photos.splice(this.photos.findIndex(p => p.id == photo.id), 1);
      this.alertifyService.success('photo deleted successfully');
      },
      error => {
      this.alertifyService.errorMessage(error);
      })
  }
}
