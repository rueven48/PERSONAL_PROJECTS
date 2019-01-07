import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: ['./order-dialog.component.css']
})
export class OrderDialogComponent {

  /*********** PROPERTIRS ****************/

  user: User = this.myUserService.currentUser;

  /*********** END PROPERTIRS ****************/

  constructor(private matdialog: MatDialog, private myRouter: Router, private myUserService: UserService, private datePipe: DatePipe) {
    this.user = this.myUserService.currentUser;
  }

  close (): void {
    this.matdialog.closeAll();
    this.myUserService.logOut();
    this.myUserService.cleanCurrentUserCart();
    this.myRouter.navigate(['/home']); // here if login worked the user transfer to products view
  }

  showReceipt (): void {
    this.expFile();
  }


  expFile(): void {

    const currOrder  = this.myUserService.currentUser.order;
    let fileText =  `
    Your order id is : ${currOrder._id} \r\n
    Your order Date is: ${this.datePipe.transform(currOrder.orderDate, 'yyyy-MM-dd')} \r\n
    Your order shipping date is: ${currOrder.shippingDate} \r\n
    Your order city is: ${currOrder.city} \r\n
    Your order street is: ${currOrder.street} \r\n
    Your order total Price is:$ ${currOrder.totalPrice} \r\n
    Your order credit card digits are: ${currOrder.creditCardDigits} \r\n
    ___________________\r\n
    Your cart items are: \r\n `;

    for (let i = 0; i < this.myUserService.currentUser.cart.length; i++) {

    const cartItem = this.myUserService.currentUser.cart[i];
    fileText += `
    Name: ${cartItem.name}, Price:$ ${cartItem.price}, Quantity: ${cartItem.quantity}, Total Price:$ ${cartItem.totalPrice} \r\n`;
    }
    const totalAmountObj = this.user.sumAmountCartItems;
    fileText +=  `*********************************************************************\r\n
    Total price of all products:$ ${totalAmountObj.totalAmount}`;

    const fileName = 'newfile001.txt';
    this.saveTextAsFile(fileText, fileName);
  }

  /**
  source : https://codepen.io/sandeep821/pen/JKaYZq
  **/
  saveTextAsFile (data: string, filename: string): void {

    if (!data) {
        console.error('Console.save: No data');
        return;
    }

    if (!filename) {
        filename = 'console.json';
    }

    const blob = new Blob([data], {type: 'text/plain'}),
    e  = document.createEvent('MouseEvents'),
    a  = document.createElement('a');
    // FOR IE:

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
    window.navigator.msSaveOrOpenBlob(blob, filename);
    } else {
    // tslint:disable-next-line:no-shadowed-variable
    const e = document.createEvent('MouseEvents'),
    // tslint:disable-next-line:no-shadowed-variable
    a = document.createElement('a');
    a.download = filename;
    a.href = window.URL.createObjectURL(blob);
    a.dataset.downloadurl = ['text/plain', a.download, a.href].join(':');
    e.initEvent('click', true, false);
    a.dispatchEvent(e);
    }
  }
}
