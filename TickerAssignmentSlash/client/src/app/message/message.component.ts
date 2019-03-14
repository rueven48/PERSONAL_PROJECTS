import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { Message } from '../shared/services/models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.css']
})
export class MessageComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  shownMessages: Message[] = []; // array of messages only to display.

  /*********** END PROPERTIRS ****************/
  
  constructor(private MessageService: MessageService) { }

  ngOnInit() {
    this.shownMessages = this.MessageService.shownMessages;
  }

}
