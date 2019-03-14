import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Message } from './models/message.model';
import { json }  from './../../db';

@Injectable()
export class MessageService {

    /*********** PROPERTIRS ****************/

    messages: Message[] = json.array; // Message array contain each movie obj.
    shownMessages: Message[] = []; // array of messages only to display

    /*********** END PROPERTIRS ****************/

    constructor(private myHttpClient: HttpClient) {
        
    }

    

}
