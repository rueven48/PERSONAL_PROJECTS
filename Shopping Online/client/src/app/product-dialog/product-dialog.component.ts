import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product-service.services';
import { UserService } from '../shared/services/user-service.services';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-product-dialog',
  templateUrl: './product-dialog.component.html',
  styleUrls: ['./product-dialog.component.css']
})
export class ProductDialogComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  selectedProductFromCategory: any;
  ProductQuantityValue: number;

  /*********** END PROPERTIRS ****************/


  constructor(private myProductService: ProductService, private myUserService: UserService, private matdialog: MatDialog ) {
    this.ProductQuantityValue = 1;
    this.selectedProductFromCategory = this.myProductService.selectedProductFromCategory;
  }

  ngOnInit() {

  }

  closeDialog(): void {
    this.matdialog.closeAll();
  }

  plusOneQuantity (quantity: number): void {
    quantity++;
    this.ProductQuantityValue = quantity;
  }

  minusOneQuantity (quantity: number): void {
    if (quantity > 1) {
      quantity--;
      this.ProductQuantityValue = quantity;
    }
  }

  validQuantityBiggerThanZero (productId: string, quantity: number) {
    if (quantity >= 1) {
      const result = this.myUserService.isUserHasChosenSameProductTwice(productId);
      if (result) { // update mode
          this.myUserService.updateCurrentItemToCart(productId, quantity, this);
          this.matdialog.closeAll();
      } else {  // add mode

          this.myUserService.addNewItemToCart(productId, quantity, this);
          this.matdialog.closeAll();
      }
    }
  }

}
