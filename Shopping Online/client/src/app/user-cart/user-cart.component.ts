import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';
import { OrderService } from '../shared/services/order-service.services';

@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.css']
})
export class UserCartComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  user: User = this.myUserService.currentUser;
  cartItemSearch: any = this.myOrderService.cartItemSearch;
  switchMyCartStateOrderOrShopping: any = { position : 'shopping' };

  /*********** END PROPERTIRS ****************/

  constructor(private myUserService: UserService, private myOrderService: OrderService ) {
    this.switchMyCartStateOrderOrShopping = this.myOrderService.switchMyCartStateOrderOrShopping;
    this.cartItemSearch = this.myOrderService.cartItemSearch;
   }

  ngOnInit() {
  }

  deleteItemFromCart(cartitem: any): void {
    this.myUserService.deleteItemFromCart(cartitem, this);
  }



}
