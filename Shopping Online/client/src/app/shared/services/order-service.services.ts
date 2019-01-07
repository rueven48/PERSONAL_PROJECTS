import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user-service.services';
import { OrderDialogComponent } from './../../order-dialog/order-dialog.component';
import { MatDialog } from '@angular/material';
import { Order } from '../models/order.model';
import { OrderRootObject } from '../models/order-root-object.model';


@Injectable()
export class OrderService {

  /*********** PROPERTIRS ****************/

  lastOrderOfCurrUser: OrderRootObject = {orderDetails: undefined};
  counterForNumberOfOrders: any = {numbers: undefined};
  counterForNumberOfOrdersOfSpecificDate: any = {numbers: undefined};
  orderPageformErrors: any = {orderErrorText : ''};
  switchMyCartStateOrderOrShopping: any = { position : 'shopping' };
  cartItemSearch: any = {cartItems: []};
  countClicksOnOrderButton: any = {clicks: 0};

  /*********** END PROPERTIRS ****************/

  constructor(private myHttpClient: HttpClient, private myUserService: UserService, private matdialog: MatDialog) {

  }

  /**
    @function createOrder - Create new order for the user. If its o.k. it will show pop up and let you print recipt, else
    it will show an error (exp: if there already 3 shipping dates already in Db ).
    @param city
    @param street
    @param shippingDate
    @param creditCardDigits
    @returns void
    **/
  createOrder(city: string, street: string, shippingDate: string, creditCardDigits: number): void {
    const newOrder = this.setNewOrderObject(city, street, shippingDate, creditCardDigits);
    const apiUrl = `http://localhost:6000/api/orders/${this.myUserService.currentUser._id}`;
    this.myHttpClient.post(apiUrl, newOrder,
        { observe: 'response',
            headers: {
                'xx-auth': this.myUserService.currentUser.token
            }
        })
    .subscribe( (resp: any) => {
        this.myUserService.currentUser.order = <Order>resp.body;
        this.addPlusOneToCounterOfOrders();
        this.orderPageformErrors.orderErrorText = '';
        this.openConfirmDialog();
    }, (httpRes) => {
      this.orderPageformErrors.orderErrorText = httpRes.error.error;
    });
  }

  setNewOrderObject (city: string, street: string, shippingDate: string, creditCardDigits: number): any {
    const newOrder = {};
    newOrder['city'] = city;
    newOrder['street'] = street;
    newOrder['shippingDate'] = shippingDate;
    newOrder['creditCardDigits'] = creditCardDigits;
    return newOrder;
  }


  /**
    @function getAllNumberOfOrdersOfUsers - Get all count orders in order to show the number of all orders for every user
    come to visit, that exist in the shop online at home page in part 3 of the view.
    @returns void
    **/
  getAllNumberOfOrdersOfUsers (): void {
    const apiUrl = `http://localhost:6000/api/orders/count`;
    this.myHttpClient.get(apiUrl)
    .subscribe( (resp: any) => {
        this.counterForNumberOfOrders.numbers = <number>resp.counter;
    });
  }

  addPlusOneToCounterOfOrders (): void {
    this.counterForNumberOfOrders.numbers++;
  }

  validCreditCardType (creditCardDigits: number): Boolean {
    return isNaN(creditCardDigits);
  }

  validationBeforeOrderCreate(city: string, street: string, shippingDate: string, creditCardDigits: number): void {
    const notValidCreditCard  = this.validCreditCardType(creditCardDigits);
    if (!notValidCreditCard) {
        this.createOrder(city, street, shippingDate, creditCardDigits);
      } else {
        this.orderPageformErrors.orderErrorText = 'Notice: credit card field must be a number!';
      }
  }

  openConfirmDialog(): void {
    this.matdialog.open(OrderDialogComponent, {
          disableClose: false
    });
  }

  /**
    @function getAllOrdersOfSpesificUser - Get all users orders in order to show detail of last one if needed.
    @param instanceProductList - This his callback will show pop up after the last order will added to curr user obj.
    @returns void
  **/
  getAllOrdersOfSpesificUser (instanceShoppingComponent: any): void {
    const apiUrl = `http://localhost:6000/api/orders/${this.myUserService.currentUser._id}`;
    this.myHttpClient.get(apiUrl,
        { observe: 'response',
            headers: {
                'xx-auth': this.myUserService.currentUser.token
            }
        })
    .subscribe( (resp: any) => {
        if (resp.body.orders.length !== 0) {this.lastOrderOfTheCurrUser(resp); }
        if (instanceShoppingComponent !== undefined) {instanceShoppingComponent.openConfirmDialog(); }
    });
  }

  lastOrderOfTheCurrUser(resp: any): void {
    this.lastOrderOfCurrUser.orderDetails = <Order>resp.body.orders[resp.body.orders.length - 1];
  }

  changeStateMyCart(newState: string): void {
    this.switchMyCartStateOrderOrShopping.position = newState;
  }

  /**
    @function countClickOnGoToOrder - This function is in order to count how many times user click on 'go to order'
    button. The pop up welcome will only be shown after login/register complete and if the user click on order and then go back to
    shop i dont want that the open pop up and not run to server for nothing welcome will appear becouse it should appear only once.
    @returns void
  **/
  countClickOnGoToOrder (): void {
    this.countClicksOnOrderButton.clicks ++;
  }

  /**
    @function initCountClickOnGoToOrder - init the counter every time the home page is loaded so that in the begining the couner is 0.
    So in shopping page when ngOnInit will there will be no running to server to get orders, becouse the user just
    go from 'order' page to 'shopping' page and there is no need for pop up welcome.
    @returns void
  **/
  initCountClickOnGoToOrder(): void {
    this.countClicksOnOrderButton.clicks = 0;
  }

}
