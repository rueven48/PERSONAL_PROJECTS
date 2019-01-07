import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryRootObject } from '../models/category-root-object.model';
import { Category } from '../models/category.model';
import { Product } from '../models/product.model';
import { ProductRootObject } from '../models/product-root-object.model';


@Injectable()
export class ProductService {

    /*********** PROPERTIRS ****************/

    categories: CategoryRootObject  = {items : []};
    selectedProductsFromCategory: ProductRootObject = { items: [] };
    selectedProductFromCategory: any = { item: <Product>{} };
    counterForNumberOfAllProducts: any = {numbers: undefined};
    addButtonOfproductFunctionalityState: any = {state: false};  // false = user , true = admin
    state: any = { position : 'add' };
    categoryObjOfProductByAdmin: any = { item : undefined };

  /*********** END PROPERTIRS ****************/


    constructor(private myHttpClient: HttpClient) {

    }

    /**
    @function initProductsByName - This will happen in search when user click the input filled.
    It will return only the products from that have the letters in the search input.
    @param name
    @returns void
    **/
    initProductsByName (name: String): void {
        this.myHttpClient.get(`http://localhost:6000/api/products/${name}`)
            .subscribe((resp: any) => {
                this.selectedProductsFromCategory.items = <Product[]>resp.items;
        });
    }

    /**
    @function getMilkAndEggsCategoryId - Get category first id of in order to send it Db and get all their products
    and show it always first to the user in shopping page.
    @returns String
    **/
    getFirstCategoryIdFromCategoriesObject(): String {
        return this.categories.items[0]._id;
    }

    /**
    @function initCategoriesAndProducts - This function get all the categories from Db,
    set it into categories object, and get all products that have the same first category id, to show it at begining in shopping page.
    @returns void
    **/
    initCategoriesAndProducts(): void {
        const apiUrl = `http://localhost:6000/api/categories`;
        this.myHttpClient.get(apiUrl)
        .subscribe((resp: any) => {
            this.categories.items = <Category[]>resp; // populate the categories from Db
            if (resp.length != 0) {this.getProductsOfCategory(this.getFirstCategoryIdFromCategoriesObject()); }
        });
    }

    /**
    @function getProductsOfCategory - Each click on categories send they id category, this function take it
    and get from Db all the products that have same category id - there are all belong to same group category.
    And set them into selectedProductsFromCategory obj.
    Im getting every click all the products again every time, and not collecting all the products at the beginning of the
    start of the program and then ask from them specific category becouse i want the product to be the most updated on second
    so if Admin add or update certain product than the user when he click the category he will see the most updated products.
    I know in this case there could many runs to server each click, but i am getting user experience so the products will be the
    most updated or added they could be and that is more important for me.

    @param categoryId
    @returns void
    **/
    getProductsOfCategory(categoryId: any): void {
        this.selectedProductsFromCategory.items = []; // i want to empty each call all last time products
        const apiUrl = `http://localhost:6000/api/products/category/${categoryId}`;
        this.myHttpClient.get(apiUrl)
        .subscribe((resp: any) => {
            if (resp.length != 0) { this.setProductsFromCategoryInObj(resp); }
        });
    }

    /**
    @function getAllNumberOfProductsInTheShop - Get all products count in order to show it in home page for user.
    @returns void
    **/
    getAllNumberOfProductsInTheShop (): void {
        const apiUrl = `http://localhost:6000/api/products/count`;
        this.myHttpClient.get(apiUrl)
        .subscribe( (resp: any) => {
            this.counterForNumberOfAllProducts.numbers = <number>resp.counter;
        });
    }

    setProductsFromCategoryInObj (resp: any): void {
        for (let i = 0; i < resp.length; i++) {
            this.selectedProductsFromCategory.items.push(resp[i]);
        }
    }

    setCategoryNameOfProductChosenByAdmin (categoryObj: Category): void {
        this.categoryObjOfProductByAdmin.item = <Category>categoryObj;
    }

    changeStateOfAdminEditOrAddProducts(newState: string): void {
        this.state.position = newState;
    }

    switchAddButtonProductFunctionalityInAdminOrUser (newState: boolean): void {
        this.addButtonOfproductFunctionalityState.state = newState;
    }

}
