import {Component, OnInit, Inject} from '@angular/core';
import {
    CameraPreview,
    CameraPreviewOptions,
    CameraPreviewPictureOptions,
} from '@ionic-native/camera-preview/ngx';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Response} from '../../class/response';
import {PictureService} from '../../services/picture.service';

@Component({
    selector: 'app-home',
    templateUrl: 'camera.page.html',
    styleUrls: ['camera.page.scss']
})
export class CameraPage {
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

    constructor(private cameraPreview: CameraPreview, private pictureService: PictureService, public dialog: MatDialog) {
    }

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
        this.pictureService.upload(this.picture).subscribe(response => {
            this.dialog.open(ResponseModalPage, {
                width: '70%',
                height: '40%',
                data: response
            });
        });
    }
}

@Component({
    selector: 'response-modal',
    templateUrl: 'response-modal.html',
    styleUrls: ['./camera.page.scss']
})
export class ResponseModalPage implements OnInit {

    constructor(
        public dialogRef: MatDialogRef<ResponseModalPage>,
        @Inject(MAT_DIALOG_DATA) public response: Response) {
    }
    
    ngOnInit() {
        setTimeout(() => {
            this.onNoClick();
        }, 3000);
    }

    onNoClick(): void {
        this.dialogRef.close();
    }
}

