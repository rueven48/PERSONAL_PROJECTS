import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/user.model';
import { Product } from '../models/product.model';
import { hash } from './sha-convertor.service';
import {Router} from '@angular/router';
import { ProductService } from './product-service.services';
import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';


@Injectable()
export class UserService {

    /*********** PROPERTIRS ****************/

    /*
    Current user can be User or Admin. Either way both of them in order to get in must have valid token.
    User will have a key "cart" and fill it with items and will do an order. Admin will use the key "product" in
    order to choose which product he wanted to update.
    */
    currentUser: User = {
        _id: undefined,
        userId: undefined,
        userName: undefined,
        userPassword: undefined,
        isAdmin: false,
        firstName: 'Guest',
        lastName: undefined,
        token: undefined,
        cart: [],
        lastOpenCart: {},
        cartStatus: {status: undefined},
        order: undefined,
        product: {},
        sumAmountCartItems: {totalAmount : 0},
    };

    homePageState: any = { position : 'login' };
    homePageFormErrors: any = {registerText : '', loginText : ''};
    adminPageFormMessages: any = {adminSuccessText : '', adminErrorText: ''};

    /*********** END PROPERTIRS ****************/

    constructor(private myHttpClient: HttpClient, private myRouter: Router, private myProductService: ProductService) {

    }

    /**
    @function loginUser - User log in to system, if its o.k. he will go to shopping page, else there will be an error.
    @param loginUser
    @returns void
    **/
    loginUser(loginUser: User): void {
        const apiUrl = `http://localhost:6000/api/login`;
        const hashPassword = hash(loginUser.userPassword);
        this.myHttpClient.get(apiUrl, {
            observe: 'response',
            headers: {
                'xx-auth': `${hashPassword}${loginUser.userName}`
            }})
            .subscribe((resp) => {
                this.currentUser.token = resp.headers.get('xx-auth');
                this.currentUser.userName = loginUser.userName;
                this.setCurrentUserWithCompatibilitiesObjectValues(resp);
                (this.currentUser.isAdmin === true) ?  this.myRouter.navigate(['/admin']) : this.myRouter.navigate(['/shopping']);
            }, (httpRes) => {
                this.homePageFormErrors.loginText = httpRes.error.error;
            });
    }

    /**
    @function registerUser - This his registration step 1 for user. If its o.k. he will go to step 2. Else there will be
    an error. Data is not saved in Db until step 2 is o.k. .
    @param newUser
    @returns void
    **/
    registerUser(newUser: User): void {
        const apiUrl  = `http://localhost:6000/api/users/register`;
        newUser.userPassword = hash(newUser.userPassword);
        this.myHttpClient.post(apiUrl, newUser, {observe: 'response'})
        .subscribe((resp: any) => {
            this.setCurrentUserWithCompatibilitiesObjectValues(resp);
            this.homePageState.position = 'registerStepTwo'; // change view to next step
        }, (httpRes) => {
            this.homePageFormErrors.registerText = httpRes.error.error;
        });
    }

    /**
    @function registerUserStepTwo - This his registration step 2 for user. Data is saved in Db after all fields o.k. .
    @param newUser
    @returns void
    **/
    registerUserStepTwo(newUser: User): void {
        this.setNewUserRegisterIntoCurrUser(newUser);
        const apiUrl  = `http://localhost:6000/api/users/registerStepTwo`;
        this.myHttpClient.post(apiUrl, this.currentUser, {observe: 'response'})
        .subscribe( (resp) => {
            this.currentUser.token = resp.headers.get('xx-auth');
            this.myRouter.navigate(['/shopping']); // change page to shopping after registration sucsess
        });
    }

    setNewUserRegisterIntoCurrUser(newUser: User) {
        this.currentUser['_id'] = newUser._id;
        this.currentUser['city'] = newUser.city;
        this.currentUser['street'] = newUser.street;
        this.currentUser['firstName'] = newUser.firstName;
        this.currentUser['lastName'] = newUser.lastName;
    }

    /**
    @function setCurrentUserWithCompatibilitiesObjectValues - Every key that came from D.b object will be coppied into
    current user key in compatibility.
    @param resp
    @returns void
    **/
    setCurrentUserWithCompatibilitiesObjectValues(resp: any): void {
        for (const key in resp.body) {
            if (resp.body.hasOwnProperty(key)) {
                this.currentUser[key] = resp.body[key];
            }
        }
    }

    /**
    @function getAllOpenCartItemsOfSpecificUser - Get all cart items obj that open for certain user and fill in key "cart"
    of current user.
    @returns void
    **/
    getAllOpenCartItemsOfSpecificUser (): void {
        const apiUrl = `http://localhost:6000/api/cartItems/user/${this.currentUser._id}`;
        this.myHttpClient.get(apiUrl,
             { observe: 'response',
               headers: {
                    'xx-auth': this.currentUser.token
               }
             })
        .subscribe( (resp: any) => {
            this.currentUser.cart = resp.body;
            this.CalculateTotalAmountOfAllCartItems();
        });
    }

    /**
    @function addNewItemToCart - Add a new item of user into his cart in order to buy them. Price
    param is never sent to server because i am taking the price of product from Db in server and not from user.
    @param productId
    @param quantity
    @param service - this his a callback that after the item will added to cart, than there will
    be a calculate of the total sum of all items, in order to display it.
    @returns void
    **/
    addNewItemToCart(productId: string, quantity: number, service: any): void {
        const newCartItem = this.setAddNewItemToCartObject(productId, quantity);
        const apiUrl = `http://localhost:6000/api/cartItems/${this.currentUser._id}`;
        this.myHttpClient.post(apiUrl, newCartItem,
            { observe: 'response',
               headers: {
                    'xx-auth': this.currentUser.token
               }
            })
        .subscribe( (resp: any) => {
            this.currentUser.cart.push(resp.body);
            if (service !== undefined) { service.myUserService.addNewAmountToAllCartItems(productId); }
        });
    }

    /**
    @function updateCurrentItemToCart - Update current item of user into his cart in order to buy them. Price
    param is never sent to server because i am taking the price of product from Db in server and not from user.
    @param productId
    @param quantity
    @param service - this his a callback that after the item will added to cart, than there will
    be a calculate of the total sum of all items updated, in order to display it.
    @returns void
    **/
    updateCurrentItemToCart (productId: string, quantity: number, service: any): void {
        const currentCartItem = this.setUpdateCurrentItemObject(productId, quantity);
        const apiUrl = `http://localhost:6000/api/cartItems/user?userId=${this.currentUser._id}`;
        this.myHttpClient.put(apiUrl, currentCartItem,
            { observe: 'response',
                headers: {
                    'xx-auth': this.currentUser.token
                }
            })
        .subscribe( (resp: any) => {
            this.setUpdatedProductIntoCurrUserCart(resp);
            if (service !== undefined) { service.myUserService.updateNewAmountToAllCartItems(); }
        });
    }

    setUpdatedProductIntoCurrUserCart (resp: any): void {
        for (let i = 0; i < this.currentUser.cart.length; i++) {
            if ( this.currentUser.cart[i].productId == resp.body.productId  ) {
                this.currentUser.cart[i] = resp.body;
                break;
            }
        }
    }

    setAddNewItemToCartObject (productId: string, quantity: number): any {
        const newCartItem = {};
        newCartItem['productId'] = productId;
        newCartItem['quantity'] = quantity;
        return newCartItem;
    }

    setUpdateCurrentItemObject (productId: string, quantity: number): any {
        const currentCartItem = {};
        currentCartItem['productId'] = productId;
        currentCartItem['quantity'] = quantity;
        currentCartItem['cartId'] = this.currentUser.cart[0].cartId;
        return currentCartItem;
    }

    /**
    @function deleteItemFromCart - Delete item that is already chosen and added to his cart.
    @param cartitem
    @param service - this his a callback that after the item will added to cart, than there will
    be a calculate of the total sum of all items in order to substract the amount from the total, in order to display it.
    @returns void
    **/
    deleteItemFromCart (cartitem: any, service: any): void {
        const apiUrl = `http://localhost:6000/api/cartItem/user?itemId=${cartitem._id}&cartId=${cartitem.cartId}`;
        this.myHttpClient.delete(apiUrl,
            { observe: 'response',
               headers: {
                    'xx-auth': this.currentUser.token
               }
            })
        .subscribe( (resp: any) => {
            if (service !== undefined) { service.myUserService.subtractNewAmountToAllCartItems(cartitem); }
            this.currentUser.cart = this.currentUser.cart.filter( el => el._id != resp.body.itemId );
        });
    }


    /**
    @function deleteAllCartItems - Delete all items from user cart.
    @param cartId
    @param service - this his a callback that after the item will added to cart, than there will
    zeroing all amount of all total items amount, in order to display it.
    @returns void
    **/
    deleteAllCartItems(cartId: string, service: any): void {
        const apiUrl = `http://localhost:6000/api/cartItems/user?cartId=${cartId}`;
        this.myHttpClient.delete(apiUrl,
            { observe: 'response',
                headers: {
                    'xx-auth': this.currentUser.token
                }
            })
        .subscribe( (resp: any) => {
            if (resp) { this.cleanCurrentUserCart(); }
            if (service !== undefined) { service.myUserService.zeroingAmountToAllCartItems(); }
        });
    }


    CalculateTotalAmountOfAllCartItems (): void {
        this.currentUser.sumAmountCartItems.totalAmount = 0;
        for (let i = 0; i < this.currentUser.cart.length; i++) {

          this.currentUser.sumAmountCartItems.totalAmount += this.currentUser.cart[i].totalPrice;
        }
    }

    addNewAmountToAllCartItems(productId: string): void {
        for (let item of this.currentUser.cart) {

            if (item.productId == productId ) {
                this.currentUser.sumAmountCartItems.totalAmount += item.totalPrice ;
            }
         }
    }

    updateNewAmountToAllCartItems(): void {
        this.currentUser.sumAmountCartItems.totalAmount = 0;
        for (let item of this.currentUser.cart) {

            this.currentUser.sumAmountCartItems.totalAmount += item.totalPrice ;
        }
    }

    subtractNewAmountToAllCartItems (cartitem: any): void {
        for (let item of this.currentUser.cart) {

            if (item.productId == cartitem.productId ) {
                this.currentUser.sumAmountCartItems.totalAmount -= item.totalPrice ;
            }
         }
    }

    zeroingAmountToAllCartItems (): void {
        this.currentUser.sumAmountCartItems.totalAmount = 0;
    }


    displayProductInAdminEdit (product: Product): void {
        this.currentUser.product = product;
    }


    /**
    @function updateProductByAdmin - Admin is updating product - it could be each of the params or all of them togather.
    @param name
    @param productId
    @param price
    @param image
    @param categoryId
    @returns void
    **/
    updateProductByAdmin (name: string, productId: string, price: number, image: string, categoryId: string): void {
        const currProduct = this.setUpdateProductByAdminIntoCurrProductObject(name, productId, price, image, categoryId);
        const apiUrl = `http://localhost:6000/api/products/${productId}`;
        this.myHttpClient.put(apiUrl, currProduct,
            { observe: 'response',
                headers: {
                    'xx-auth': this.currentUser.token
                }
            })
        .subscribe( (resp: any) => {
            this.myProductService.getProductsOfCategory(this.myProductService.getFirstCategoryIdFromCategoriesObject());
            this.cleanMessagesFormAdmin();
            this.adminPageFormMessages.adminSuccessText = resp.body.success_message;
        });
    }

    setUpdateProductByAdminIntoCurrProductObject(name: string, productId: string, price: number, image: string, categoryId: string): any {
        const currProduct = {};
        currProduct['name'] = name;
        currProduct['_id'] = productId;
        currProduct['price'] = price;
        currProduct['image'] = image;
        currProduct['categoryId'] = categoryId;
        return currProduct;
    }

    /**
    @function updateProductByAdmin - Admin is adding new product to the online store.
    @param newProduct
    @returns void
    **/
    addProductByAdmin (newProduct: Product): void {
        const apiUrl = `http://localhost:6000/api/products`;
        this.myHttpClient.post(apiUrl, newProduct,
            { observe: 'response',
               headers: {
                    'xx-auth': this.currentUser.token
               }
            })
        .subscribe( (resp: any) => {
            this.myProductService.getProductsOfCategory(this.myProductService.getFirstCategoryIdFromCategoriesObject());
            this.cleanMessagesFormAdmin();
            this.adminPageFormMessages.adminSuccessText = resp.body.success_message;
        });
    }

    cleanMessagesFormAdmin (): void {
        this.adminPageFormMessages.adminSuccessText = '';
        this.adminPageFormMessages.adminErrorText = '';
    }

    cleanHomePageTextErrors(index: string): void {
        this.homePageFormErrors[index] = '';
    }

    cleanFieldsInEditFormAdmin (): void {
        this.currentUser.product = {};
    }

    cleanCurrentUserCart (): void {
        this.currentUser.cart = [];
    }

    /**
    @function getAllCartsOfSpecificUser - Get all user carts. After that will be check which  his last cart that is open,
    and if there no cart open he will give the last order to display to user. If there no cart open and no order
    ths is mean that this his first visit of user and it will show on pop up.
    @returns void
    **/
    getAllCartsOfSpecificUser (): void {
        const apiUrl = `http://localhost:6000/api/carts/user/${this.currentUser._id}`;
        this.myHttpClient.get(apiUrl,
             { observe: 'response',
               headers: {
                    'xx-auth': this.currentUser.token
               }
             })
        .subscribe( (resp: any) => {
            this.initLastOpenCartsOfCurrUser(resp);
            this.managmentCartsStatus(resp);
        });
    }

    initLastOpenCartsOfCurrUser (resp: any): void {
        for (let i = 0; i < resp.body.carts.length; i++) {

            if (resp.body.carts[i].isOpen == true) {
                this.currentUser.lastOpenCart = resp.body.carts[i];
            }
        }
    }

    /**
    @function managmentCartsStatus - This function manage the cart status in order to show it to the user in pop up
    in entry to shopping page.
    1. check if there is a carts in Db from user at all?
    2. check if there is open cart.
    3. check if there is closed carts - that mean there was an order.
    @param resp
    @returns void
    **/
    managmentCartsStatus (resp: any): void {
        if (resp.body.carts.length === 0) {
            this.currentUser.cartStatus.status = 'none';
        } else {
            for (let i = 0; i < resp.body.carts.length; i++) {

                if (resp.body.carts[i].isOpen == true ) {
                    this.currentUser.cartStatus.status = 'open';
                    break;
                } else {
                    this.currentUser.cartStatus.status = 'closed';
                }
            }
        }
    }

    authenticationTokenToVisitPage (): void {

        if (this.currentUser.token === undefined) {
            this.myRouter.navigate(['/notAllowed']);
        }
    }

    /**
    @function isUserHasChosenSameProductTwice - That means that the next click will send put request and not post
    request in order to update the chosen cart item.
    @param productId
    @returns boolean
    **/
    isUserHasChosenSameProductTwice (productId: string): boolean {

        for (let i = 0; i < this.currentUser.cart.length; i++) {

            if (this.currentUser.cart[i].productId == productId ) {
                return true;
            }
        }
        return false;
    }

    changeStateHomePageLoginOrRegister(newState: string): void {
        this.homePageState.position = newState;
    }

    logOut (): void {
        this.currentUser.firstName = 'Guest';
        this.currentUser.lastName = undefined;
        this.currentUser.token = undefined; // reset token
        this.homePageState.position = 'login'; // change the view back to login form
        this.myRouter.navigate(['/home']);
    }



}
