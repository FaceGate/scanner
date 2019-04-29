import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Response} from '../class/response';


@Injectable({
    providedIn: 'root'
})
export class PictureService {
    response: Response = {
        success: false,
        member: {
            id: 1,
            firstName: 'John',
            lastName: 'Doe',
        }
    };

    constructor() {
    }

    upload(picture: string): Observable<{}> {

        // TODO : send picture to micro-service
        const responseObservable = new Observable(observer => {
            setTimeout(() => {
                observer.next(this.response);
            }, 1000);
        });

        return responseObservable;
    }
}
