import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product-service.services';
import { CategoryRootObject } from '../shared/models/category-root-object.model';
import { ProductRootObject } from '../shared/models/product-root-object.model';
import { Product } from '../shared/models/product.model';
import { MatDialogModule, MatCardModule, MatButtonModule, MatToolbarModule, MatDialog } from '@angular/material';
import { ProductDialogComponent } from '../product-dialog/product-dialog.component';
import { UserService } from '../shared/services/user-service.services';
import { Category } from '../shared/models/category.model';


@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  categories: CategoryRootObject;
  selectedProductsFromCategory: ProductRootObject;
  addButtonOfproductFunctionalityState: any = this.myProductService.addButtonOfproductFunctionalityState;

  /*********** END PROPERTIRS ****************/

  constructor(private myProductService: ProductService, private matdialog: MatDialog, private myUserService: UserService) {
    this.categories = this.myProductService.categories;
    this.selectedProductsFromCategory = this.myProductService.selectedProductsFromCategory;
    this.addButtonOfproductFunctionalityState = this.myProductService.addButtonOfproductFunctionalityState;
   }

  ngOnInit() {
    this.myProductService.initCategoriesAndProducts();
  }


  openConfirmDialog(product: Product): void {

    this.matdialog.closeAll();
    this.myProductService.selectedProductFromCategory.item = product;
    this.matdialog.open(ProductDialogComponent, {
        disableClose: false,
       }
    );
  }


  getProductsOfCategory(categoryId: string): void {
    this.myProductService.getProductsOfCategory(categoryId);
  }


  displayProductInAdminEdit (product: Product): void {
    this.myUserService.cleanMessagesFormAdmin();
    const categoryId = product.categoryId;
    const categoryObj = this.getProductCategoryNameFromCategoriesObject(categoryId);
    this.myProductService.changeStateOfAdminEditOrAddProducts('edit');
    this.myProductService.setCategoryNameOfProductChosenByAdmin(categoryObj);
    this.myUserService.displayProductInAdminEdit(product);
  }


  getProductCategoryNameFromCategoriesObject (categoryId: String): Category {
    for (let i = 0; i < this.categories.items.length; i++) {
      if (this.categories.items[i]._id === categoryId) {
        return this.categories.items[i];
      }
    }
  }



}
