import { Component } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@ionic-native/camera-preview/ngx';

import { Cloudinary } from '@cloudinary/angular-5.x';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  picture: string;

  loading: any;

  cameraOpts: CameraPreviewOptions = {
    x: 0,
    y: 0,
    width: window.innerWidth,
    height: window.innerHeight,
    toBack: true
  };

  cameraPictureOpts: CameraPreviewPictureOptions = {
    quality: 100
  };

  constructor(private cameraPreview: CameraPreview, private cloudinary: Cloudinary, private http: HttpClient, public alertController: AlertController, public loadingController: LoadingController) { }

  ionViewDidEnter() {
    this.startCamera();
  }

  ionViewDidLead() {
    this.stopCamera();
  }

  async startCamera() {
    await this.cameraPreview.startCamera(this.cameraOpts);
  }

  async stopCamera() {
    await this.cameraPreview.stopCamera();
  }

  async takePicture() {
    const result = await this.cameraPreview.takePicture(this.cameraPictureOpts);
    this.picture = `data:image/jpeg;base64,${result}`;
    this.presentLoading("Uploading picture ...");
    this.uploadPhoto(this.picture).subscribe(res => {
      this.loading.dismiss();
      this.presentLoading("Identifying picture ...");
      this.identifyPerson(res.secure_url).subscribe(res => {
        this.loading.dismiss();
        this.presentAlert("Success", "user_id: " + res.user_id);
      })
    })
  }

  async presentAlert(statusText: string, message: string) {
    const alert = await this.alertController.create({
      header: statusText,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentLoading(message: string) {
    
    this.loading = await this.loadingController.create({
      message: message
    });

    await this.loading.present();
  }s

  private uploadPhoto(image_url: string): Observable<any> {
    let formData = new FormData();
    formData.append('file', image_url);
    formData.append('upload_preset', this.cloudinary.config().upload_preset);
    return this.http.post(`https://api.cloudinary.com/v1_1/${this.cloudinary.config().cloud_name}/upload`, formData)
      .pipe(
        catchError(error => {
          this.loading.dismiss();
          this.presentAlert(error.statusText, error.message);
          return throwError(error);
        })
      );
  }

  private identifyPerson(secure_url: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    return this.http.post("https://capio.serveo.net/identify", { "image_url": secure_url }, httpOptions)
      .pipe(
        catchError(error => {
          this.loading.dismiss();
          this.presentAlert(error.error.error, error.error.message);
          return throwError(error);
        })
      );
  }
}
