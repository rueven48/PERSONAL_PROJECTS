import { Injectable } from '@angular/core';



@Injectable()
export class CityService {

    /*********** PROPERTIRS ****************/

    citiesArr: string[]  = [
        'Jerusalem',
        'Tel Aviv',
        'Haifa',
        'Ashdod',
        'Rishon LeZiyyon',
        'Petah Tikva',
        'Beersheba',
        'Netanya',
        'Holon',
        'Bnei Brak'
    ];

    /*********** END PROPERTIRS ****************/

    constructor() {

    }



}
