import { Component, OnInit } from '@angular/core';
import { MessageService } from '../shared/services/message.service';
import { Message } from '../shared/services/models/message.model';


@Component({
  selector: 'app-ticker',
  templateUrl: './ticker.component.html',
  styleUrls: ['./ticker.component.css']
})
export class TickerComponent implements OnInit {

  /*********** PROPERTIRS ****************/
  
  messages: Message[]; // array of all messages of an objs 
  lastElement:number;
  endOfMessagesArray:number;
  counter: number = 0; // to give id and user name different name every time they create
  searchValue:string = ''; // catch the value in order to clear the input textarea

  /*********** END PROPERTIRS ****************/
  
  constructor(private MessageService: MessageService) {
    this.messages = this.MessageService.messages;

  }

  ngOnInit() {
    this.initInsert3MessagesIntoArray();
    this.initMessagesLoop();
  }


  /**
      @function initInsert3MessagesIntoArray - init the 3 first messages from the messages array into shownMessages array.
      @returns void
  **/
  initInsert3MessagesIntoArray (): void {
    this.MessageService.shownMessages = [];
    
    for (let i = 0; i < 3; i++) {

       this.MessageService.shownMessages.push(this.messages[i]);
    }
  }


 /**
      @function initMessagesLoop - init the loop of messages using setInterval, every 3 seconds.
      @returns void
  **/
  initMessagesLoop(): void {

    this.lastElement = 2;
    
    setInterval( () => {      
         
      this.removeLastMessageFromShowMessages();

      this.lastElement++;
      
      this.insertNewMessageIntoShowMessages();      

    }, 3000);
  }


  /**
      @function removeLastMessageFromShowMessages - remove the third message from the showMessage array.
      @returns void
  **/
  removeLastMessageFromShowMessages(): void {
    if (this.endOfMessagesArray !=1) {
      this.MessageService.shownMessages.splice(2, 1); 
    }    
  }


  /**
      @function insertNewMessageIntoShowMessages - insert a new message at the begining of the ShowMessages array.
      By taking each next element from messages array and putting it into ShowMessages array .
      @returns void
  **/
  insertNewMessageIntoShowMessages(): void {
    
    for (let i = 0; i < this.messages.length; i++) {
                  
      if (this.lastElement ==  i) {  // here the lastElement is realy the nextElement because of the "this.lastElement++;"
        
        this.MessageService.shownMessages.unshift(this.messages[i]);
        
        if (this.messages.length-1 == i ) {
          this.lastElement = -1;                   
        }
        break;
      }      
    }  
  }


  /**
      @function addNewMessageByUser - add new message by the user from the textarea input.
      @param text_value - this is the text data that came from the user.
      @returns void
  **/
  addNewMessageByUser(text_value: string): void {
    const messageObj = this.addNewOBj(text_value);
    this.insertNewMessageIntoMessagesArray(messageObj);
    this.cleanTextAreaInput();
  }


  /**
      @function insertNewMessageIntoMessagsArray - insert new message into the all messages array.
      @param messageObj - this is the new message obj that goes into the messages array.
      @returns void
  **/
  insertNewMessageIntoMessagesArray(messageObj: any): void {
    this.messages.push(messageObj);
  }

  
  /**
      @function addNewOBj - add new obj message for each user according to user spesification (using my common logic).
      @param text_value - this is the text data that came from the user.
      @returns void
  **/
  addNewOBj(text_value: string): Message {
    const newObj = {};
    this.counter++;
    const today = new Date();
    const currDate  = today.getDate() + '.' +  today.getMonth() + '.' +  + today.getFullYear().toString().substr(-2);    
    newObj['id'] = 'user' + this.counter;
    newObj['pic'] = './../../assets/images/man_speak.png';
    newObj['fullName'] = 'User' + this.counter;;
    newObj['date'] = currDate;
    newObj['data'] = text_value;
    return newObj;
  }


  /**
      @function cleanTextAreaInput - clear input textarea fo more user friendly experience.
      @returns void
  **/
  cleanTextAreaInput(): void {
    this.searchValue = null;
  }


}
