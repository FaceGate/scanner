import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {IonicModule} from '@ionic/angular';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';

import {MatDialogModule} from '@angular/material/dialog';

import {CameraPage, ResponseModalPage} from './camera';


@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: CameraPage
            }
        ]),
        MatDialogModule
    ],
    declarations: [
        CameraPage,
        ResponseModalPage
    ],
    entryComponents: [
        ResponseModalPage
    ]
})
export class CameraPageModule {
}
