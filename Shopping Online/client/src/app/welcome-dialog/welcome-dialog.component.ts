import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { User } from '../shared/models/user.model';
import { UserService } from '../shared/services/user-service.services';
import { OrderService } from '../shared/services/order-service.services';
import { OrderRootObject } from '../shared/models/order-root-object.model';

@Component({
  selector: 'app-welcome-dialog',
  templateUrl: './welcome-dialog.component.html',
  styleUrls: ['./welcome-dialog.component.css']
})
export class WelcomeDialogComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  user: User;
  lastOrderOfCurrUser: OrderRootObject = this.myOrderService.lastOrderOfCurrUser;

   /*********** END PROPERTIRS ****************/

  constructor(private matdialog: MatDialog, private myUserService: UserService, private myOrderService: OrderService ) {
    this.user = this.myUserService.currentUser;
  }

  ngOnInit() {
    this.lastOrderOfCurrUser = <OrderRootObject>this.myOrderService.lastOrderOfCurrUser;
  }

  close (): void {
    this.matdialog.closeAll();
  }



}
