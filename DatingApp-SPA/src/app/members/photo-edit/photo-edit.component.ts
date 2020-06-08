import {Component, Input, OnInit} from '@angular/core';
import {Photo} from '../../shared/models';
import {FileUploader} from 'ng2-file-upload';
import {environment} from '../../../environments/environment';
import {AuthenticationServiceService} from '../../_services/authentication-service.service';

@Component({
  selector: 'app-photo-edit',
  templateUrl: './photo-edit.component.html',
  styleUrls: ['./photo-edit.component.css']
})
export class PhotoEditComponent implements OnInit {
  uploader:FileUploader;
  hasBaseDropZoneOver:boolean;
  baseUrl = environment.apiUrl
  @Input() photos: Photo[]


  constructor(private authService: AuthenticationServiceService) {}

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

}
