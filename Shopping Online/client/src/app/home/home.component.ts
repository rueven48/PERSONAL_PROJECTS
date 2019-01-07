import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user-service.services';
import { User } from '../shared/models/user.model';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { OrderService } from '../shared/services/order-service.services';
import { ProductService } from '../shared/services/product-service.services';
import { CityService } from '../shared/services/city-service.services';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit  {


  /*********** PROPERTIRS ****************/

  user: User;
  citiesArr: string [];
  loginForm: FormGroup;
  registerForm: FormGroup;
  registerStepTwoForm: FormGroup;
  counterForNumberOfOrders: any = {numbers: undefined};
  counterForNumberOfAllProducts: any = {numbers: undefined};
  shopImg = './assets/images/online_supermarket.jpg';
  homePageState = this.myUserService.homePageState;
  homePageFormErrors = this.myUserService.homePageFormErrors;

  /*********** END PROPERTIRS ****************/

  constructor(private myUserService: UserService, private myOrderService: OrderService,
     private myProductService: ProductService, private myCityService: CityService) {

    this.user = this.myUserService.currentUser;
    this.counterForNumberOfOrders = this.myOrderService.counterForNumberOfOrders;
    this.counterForNumberOfAllProducts = this.myProductService.counterForNumberOfAllProducts;
    this.citiesArr = this.myCityService.citiesArr;
    this.homePageState = this.myUserService.homePageState;
    this.myUserService.cleanHomePageTextErrors('loginText');
    this.myOrderService.initCountClickOnGoToOrder();
    this.myUserService.logOut();

    const loginGroupConfig = {
      userName: this.getFormControl(2, 25, 'User name'),
      userPassword: this.getFormControl(5, 80, 'Password')
    };


    const registerGroupConfig = {
        userId: this.getFormControl(5, 20, 'User id'),
        userName: new FormControl('', [
          f => (!f.value ?  { err: `` } : null),
          f => (!f.value && !f.pristine ? { err: `User name is required!` } : null),
          f => f.value && f.value.length >= 30 ? { err: `User name is max 30 chars!` } : null,
          f => f.value && f.value.length < 2 ? { err: `User name is min 2 chars!` } : null,
          f => (f.value && !this.isValidEmail(f.value) ? { err: `Email pattern is not valid` } : null)
        ]),
        userPassword: this.getFormControl(5, 80, 'User password'),
        userPasswordConfirm: this.getFormControl(5, 80, 'User password again')
     };


     const registerStepTwoGroupConfig = {
      city: this.getFormControl(2, 40, 'City'),
      street: this.getFormControl(2, 40, 'Street'),
      firstName: this.getFormControl(2, 25, 'First name'),
      lastName: this.getFormControl(2, 35, 'Last name')
   };

    this.loginForm = new FormGroup(loginGroupConfig);
    this.registerForm = new FormGroup(registerGroupConfig);
    this.registerStepTwoForm = new FormGroup(registerStepTwoGroupConfig);
  }

  ngOnInit() {
    this.myOrderService.getAllNumberOfOrdersOfUsers();
    this.myProductService.getAllNumberOfProductsInTheShop();
  }

  getFormControl(min: number, max: number, label: string, placeholder = ''): FormControl {
      return new FormControl(placeholder, [
        f => (!f.value ?  { err: `` } : null),
        f => (!f.value && !f.pristine ? { err: `${label} is required!` } : null),
        f => f.value && f.value.length >= max ? { err: `${label} is max ${max} chars!` } : null,
        f => f.value && f.value.length < min ? { err: `${label} is min ${min} chars!` } : null
      ]);
  }

  changeState(newState: string): void {
    this.myUserService.cleanHomePageTextErrors('loginText'); // before change state clean error if there is in login view
    this.myUserService.cleanHomePageTextErrors('registerText'); // before change state  clean error if there is in register view
    this.loginForm.reset(); // before change state  clean form group loginForm errors
    this.registerForm.reset(); //  before change state  clean form group registerForm errors
    this.myUserService.changeStateHomePageLoginOrRegister(newState);
  }

  loginUser(): void {
    this.myUserService.loginUser({
      userName: this.loginForm.value.userName,
      userPassword: this.loginForm.value.userPassword
    });
  }

  validatePasswordConfirm(passwordValue: string, passwordConfirmValue: string): void {
    if (passwordValue === passwordConfirmValue) {
      this.myUserService.cleanHomePageTextErrors('registerText');
      this.registerUser();
    } else {
      this.myUserService.homePageFormErrors.registerText = 'Notice: password confirm must be equal to password field!';
    }
  }

  isValidEmail(value: string): boolean {
    // tslint:disable-next-line:max-line-length
    const regularEmailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularEmailPattern.test((value).toLowerCase());
  }

  registerUser(): void {
    this.myUserService.registerUser({
      userId: this.registerForm.value.userId,
      userName: this.registerForm.value.userName,
      userPassword: this.registerForm.value.userPassword,
      isAdmin: false
    });
  }

  registerUserStepTwo(): void {
    this.myUserService.registerUserStepTwo({
      city: this.registerStepTwoForm.value.city,
      street: this.registerStepTwoForm.value.street,
      firstName: this.registerStepTwoForm.value.firstName,
      lastName: this.registerStepTwoForm.value.lastName
    });
  }



}
