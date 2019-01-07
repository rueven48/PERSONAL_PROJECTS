import { Component, OnInit } from '@angular/core';
import { User } from '../shared/models/user.model';
import { ProductService } from '../shared/services/product-service.services';
import { UserService } from '../shared/services/user-service.services';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { CategoryRootObject } from '../shared/models/category-root-object.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {


  /*********** PROPERTIRS ****************/

  state = this.myProductService.state;
  user: User;
  adminEditForm: FormGroup;
  adminAddForm: FormGroup;
  categories: CategoryRootObject  = {items : []};
  categoryObjOfProductByAdmin: any =  this.myProductService.categoryObjOfProductByAdmin;
  adminPageFormMessages = this.myUserService.adminPageFormMessages;

  /*********** END PROPERTIRS ****************/

  constructor(private myProductService: ProductService, private myUserService: UserService) {

    this.myProductService.switchAddButtonProductFunctionalityInAdminOrUser(true); // product button is in admin mode
    this.user = this.myUserService.currentUser;
    this.categories =  this.myProductService.categories;
    this.categoryObjOfProductByAdmin =  this.myProductService.categoryObjOfProductByAdmin;
    this.myUserService.cleanMessagesFormAdmin();
    this.myUserService.cleanFieldsInEditFormAdmin();
    this.changeStateOfAdminEditOrAddProducts('add');
    this.myUserService.authenticationTokenToVisitPage();

    const adminEditGroupConfig = {
    name: this.getFormControl(2, 40, 'Product name'),
    _id: this.getFormControl(2, 40, 'Product id'),
    price: this.getFormControl(1, 10, 'Product price'),
    image: this.getFormControl(2, 40, 'Image file name'),
    categoryName: this.getFormControl(2, 40, 'Category name')
    };
    const adminAddGroupConfig = {
    name: this.getFormControl(2, 40, 'Product name', 'somthing'),
    price:  new FormControl('', [
            f => (!f.value ?  { err: `` } : null),
            f => (!f.value && !f.pristine ? { err: `Product price is required!` } : null),
            f => f.value && isNaN(f.value) ? { err: `Product price must be numbers!` } : null,
            f => f.value && f.value.length >= 10 ? { err: `Product price is max 10 chars!` } : null,
            f => f.value && f.value.length < 1 ? { err: `Product price is min 1 chars!` } : null
            ]),
    image: this.getFormControl(2, 40, 'Image file name', 'somthing')
    };
     this.adminEditForm = new FormGroup(adminEditGroupConfig);
     this.adminAddForm = new FormGroup(adminAddGroupConfig);
  }

  ngOnInit() {
    this.state = this.myProductService.state;
    this.onloadSlide();
  }

  getFormControl(min: number, max: number, label: string, flag = ''): FormControl {
    return new FormControl('', [
      f => (!f.value && flag !== '' ?  { err: `` } : null),
      f => (!f.value && !f.pristine ? { err: `${label} is required!` } : null),
      f => f.value && f.value.length >= max ? { err: `${label} is max ${max} chars!` } : null,
      f => f.value && f.value.length < min ? { err: `${label} is min ${min} chars!` } : null
    ]);
  }

  /* form group when there is no change by event of user is diabling the button
  although there is value in the inputs, and type=number doesnt give me
  all functionalty i need like min chars so for this kind of behaviour i do valdiation of my own for price number */

  validAdminEdit (name: string, productId: string, price: number, image: string, categoryNameSelected: string): void {
    const numValue = this.isInputValidNumber(price);
    if (numValue == false) {
      const categoryIdValue  = this.changeCategoryNameIntoCategoryId(categoryNameSelected);
      this.myUserService.updateProductByAdmin(name, productId, price, image, categoryIdValue);
    } else {
      this.adminPageFormMessages.adminSuccessText = '';
      this.myUserService.adminPageFormMessages.adminErrorText = 'Product price must be numbers!';
    }
  }

  addProductByAdmin (categoryNameSelected: string): void {
    const categoryIdValue = this.changeCategoryNameIntoCategoryId(categoryNameSelected);
    this.myUserService.addProductByAdmin({ name: this.adminAddForm.value.name,
      price: this.adminAddForm.value.price,
      image: this.adminAddForm.value.image,
      categoryId: categoryIdValue
    });
    this.adminAddForm.reset();
  }

  changeCategoryNameIntoCategoryId(categoryNameSelected: string): string {
    for (let i = 0; i < this.categories.items.length; i++) {
        if (this.categories.items[i].name === categoryNameSelected) {
            return this.categories.items[i]._id;
        }
    }
  }

  changeStateOfAdminEditOrAddProducts(newState: string): void {
    this.myUserService.cleanMessagesFormAdmin();
    this.myProductService.changeStateOfAdminEditOrAddProducts(newState);
  }


  /*
  this validation cover position that in edit Admin that the admin will delete
  the number that came from product and will try to click letter.
  form Control validation cant help becouse he is reacting to changes
  so if there was no change it will not let the user click save, and
  that behavior is not good in this case.
  */
  isInputValidNumber (value: any): boolean {
    return isNaN(value);
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
