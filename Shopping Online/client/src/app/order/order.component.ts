import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { OrderService } from '../shared/services/order-service.services';


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  user: User = this.myUserService.currentUser;
  orderForm: FormGroup;
  currCityOfUser: string;
  currStreetOfUser: string;
  currDateToday: any;
  cartItemSearch: any = {cartItems: []};
  orderPageformErrors: any = this.myOrderService.orderPageformErrors;

  /*********** END PROPERTIRS ****************/


  constructor(private myUserService: UserService, private myOrderService: OrderService) {
    this.user = this.myUserService.currentUser;
    this.myUserService.getAllOpenCartItemsOfSpecificUser();
    this.myOrderService.orderPageformErrors.orderErrorText = '';
    this.setCalculateDateToday();
    this.myUserService.authenticationTokenToVisitPage();
    this.myOrderService.changeStateMyCart('order');

    const orderGroupConfig = {
      city: this.getFormControl(2, 40, 'city'),
      street: this.getFormControl(2, 40, 'street'),
      shippingDate: new FormControl('', [
        f => (!f.value ?  { err: `` } : null),
        f => (!f.value && !f.pristine ? { err: `Shipping Date is required` } : null),
      ]),

      creditCard: new FormControl('', [
        f => (!f.value ?  { err: `` } : null),
        f => (!f.value && !f.pristine ? { err: `Credit card is required` } : null),
        f => f.value && f.value.length >= 5 ? { err: `Credit card is 4 chars!` } : null,
        f => f.value && f.value.length < 4 ? { err: `Credit card is 4 chars!` } : null
      ]),
   };

   this.orderForm = new FormGroup(orderGroupConfig);
  }

  ngOnInit() {
    this.orderPageformErrors = this.myOrderService.orderPageformErrors;
  }

  getFormControl(min: number, max: number, label: string, placeholder = ''): FormControl {
    return new FormControl(placeholder, [
      f => (!f.value && !f.pristine ? { err: `${label} is required!` } : null),
      f => f.value && f.value.length >= max ? { err: `${label} is max ${max} chars!` } : null,
      f => f.value && f.value.length < min ? { err: `${label} is min ${min} chars!` } : null
    ]);
  }

  validationBeforeOrderCreate(city: string, street: string, shippingDate: string, creditCardDigits: number): void {
    this.myOrderService.validationBeforeOrderCreate(city, street, shippingDate, creditCardDigits);
  }

  setCityFieldValueByCurrUser (): void {
   this.currCityOfUser = <string>this.myUserService.currentUser.city;
  }

  setStreetFieldValueByCurrUser (): void {
    this.currStreetOfUser = <string>this.myUserService.currentUser.street;
  }

  setCalculateDateToday (): void {
    const today: any = new Date();
    let dd: any = today.getDate();
    let mm: any = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }
    this.currDateToday = yyyy + '-' + mm + '-' + dd;
  }

  clearSearch (): void {
    this.myOrderService.cartItemSearch.cartItems = [];
  }

  searchItems (itemSearch: string): void {
    this.clearSearch();
    if (itemSearch !== '') {

      for (let i = 0; i < this.myUserService.currentUser.cart.length; i++) {

        const cartItem = this.myUserService.currentUser.cart[i];
        if (cartItem.name.toLowerCase().indexOf(itemSearch.toLowerCase()) != -1) {
          this.myOrderService.cartItemSearch.cartItems.push(cartItem.name);
        }
      }
    }
  }




}
