import { Component } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [Camera]
})
export class HomePage {
  imageData: string;

  constructor(private camera: Camera) { }

  getPicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options)
      .then((imageData) => {
        this.imageData = 'data:image/jpeg;base64,' + imageData;
      })
      .catch((err) => {
        console.error(err);
      });
  }
}
