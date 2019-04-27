import { Component } from '@angular/core';
import {
  CameraPreview,
  CameraPreviewOptions,
  CameraPreviewPictureOptions,
} from '@ionic-native/camera-preview/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  picture: string;

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

  constructor(private cameraPreview: CameraPreview) { }

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
    console.log(this.picture);
  }
}
