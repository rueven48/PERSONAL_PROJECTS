import { Component, OnInit, Inject } from '@angular/core';
import { User } from '../shared/models/user.model';
import { ProductService } from '../shared/services/product-service.services';
import { UserService } from '../shared/services/user-service.services';
import { WelcomeDialogComponent } from './../welcome-dialog/welcome-dialog.component';
import { MatDialog } from '@angular/material';
import { OrderService } from '../shared/services/order-service.services';


@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css']
})
export class ShoppingComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  user: User = this.myUserService.currentUser;


  /*********** END PROPERTIRS ****************/

  constructor(private myUserService: UserService, private myProductService: ProductService,
      private matdialog: MatDialog, private myOrderService: OrderService) {

    this.user = this.myUserService.currentUser;
    this.myProductService.switchAddButtonProductFunctionalityInAdminOrUser(false); // product button is in user mode
    this.myUserService.authenticationTokenToVisitPage();
    this.myOrderService.changeStateMyCart('shopping');
   }


  ngOnInit() {
    this.myUserService.getAllOpenCartItemsOfSpecificUser();
    if (this.myOrderService.countClicksOnOrderButton.clicks === 0) { // i dont wont popup welcome will appear if user already in shop.
      this.myUserService.getAllCartsOfSpecificUser();
      this.myOrderService.getAllOrdersOfSpesificUser(this);
    }
    this.onloadSlide();
  }

  deleteAllCartItems(cartId: string): void {
    this.myUserService.deleteAllCartItems(cartId, this);
  }

  openConfirmDialog(): void {
    this.matdialog.open(WelcomeDialogComponent, {
          disableClose: false
    });
  }

  countClickOnGoToOrder () {
    this.myOrderService.countClickOnGoToOrder();
  }

  onloadSlide (): void {
      const container = document.getElementById('container');
      const left = document.getElementById('left_panel');
      const right = document.getElementById('right_panel');
      const handle = document.getElementById('drag');
      let isResizing = false;
      let lastDownX = 0;

      handle.onmousedown = function(e) {
          isResizing = true;
          lastDownX = e.clientX;
      };

      document.onmousemove = function(e) {
          // we don't want to do anything if we aren't resizing.
          if (!isResizing) {
              return;
          }
          const offsetRight = container.clientWidth - (e.clientX - container.offsetLeft)  ;
          left.style.right = offsetRight + 'px';
          right.style.width = offsetRight + 'px';
      };

      document.onmouseup = function(e) {
          // stop resizing
          isResizing = false;
      };
  }

}
