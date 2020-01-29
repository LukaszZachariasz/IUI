import {Injectable} from '@angular/core';
import {AppConst} from '../constants/app-const';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  filesToUpload: Array<File>;

  constructor() {
    this.filesToUpload = [];
  }

  upload(foodId: number) {
    this.makeFileRequest(AppConst.serverPath + '/food/addNew/image?id=' + foodId, [], this.filesToUpload)
      .then((res) => {
          console.log(res);
        },
        err => {
          console.log(err);
        });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = fileInput.target.files as Array<File>;
  }

  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      const formData: any = new FormData();
      const xhr = new XMLHttpRequest();

      for (let i = 0; i < files.length; i++) {
        formData.append('uploads[]', files[i], files[i].name);
      }
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('image uploaded successfully!');
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.open('POST', url, true);
      xhr.setRequestHeader('x-auth-token', localStorage.getItem('xAuthToken'));
      xhr.send(formData);
    });
  }

  modify(foodId: number) {
    if (this.filesToUpload.length > 0) {
      this.upload(foodId);
    }
  }
}
