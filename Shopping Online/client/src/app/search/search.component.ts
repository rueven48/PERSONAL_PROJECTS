import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/services/product-service.services';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private myProductService: ProductService) { }

  ngOnInit() {
  }

  searchProductsByName (name: String): void {
    if ( name === '' ) { // if  nothing we will reload the regular products;

      this.myProductService.getProductsOfCategory(this.myProductService.getFirstCategoryIdFromCategoriesObject());
    } else {
      this.myProductService.initProductsByName(name);
    }
  }


}
