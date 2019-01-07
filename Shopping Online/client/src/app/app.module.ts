import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HeadComponent } from './head/head.component';
import { FooterComponent } from './footer/footer.component';
import { MainComponent } from './main/main.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UserService } from './shared/services/user-service.services';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProductService } from './shared/services/product-service.services';
import { MatDialogModule, MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { OrderComponent } from './order/order.component';
import { OrderService } from './shared/services/order-service.services';
import { CityService } from './shared/services/city-service.services';
import { OrderDialogComponent } from './order-dialog/order-dialog.component';
import { ProductsComponent } from './products/products.component';
import { AdminComponent } from './admin/admin.component';
import { WelcomeDialogComponent } from './welcome-dialog/welcome-dialog.component';
import { SearchComponent } from './search/search.component';
import { PageNotAllowedComponent } from './page-not-allowed/page-not-allowed.component';
import { ProductDialogComponent } from './product-dialog/product-dialog.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { DatePipe } from '@angular/common';
import { UserCartComponent } from './user-cart/user-cart.component';



const appRoutes: Routes = [

    { path: 'home', component: HomeComponent },
    { path: 'shopping', component: ShoppingComponent },
    { path: 'order', component: OrderComponent },
    { path: 'admin', component: AdminComponent },
    { path: 'notAllowed', component: PageNotAllowedComponent },
    // default path - will redirect the current path to 'home'
    { path: '',
      redirectTo: '/home',
      pathMatch: 'full'
    },
   // ** is an angular placeholder for any path that does not exist
   { path: '**', component: PageNotFoundComponent }

  ];

@NgModule({
  declarations: [
    AppComponent,
    HeadComponent,
    FooterComponent,
    MainComponent,
    HomeComponent,
    PageNotFoundComponent,
    OrderComponent,
    OrderDialogComponent,
    ProductsComponent,
    AdminComponent,
    WelcomeDialogComponent,
    SearchComponent,
    PageNotAllowedComponent,
    ProductDialogComponent,
    ShoppingComponent,
    UserCartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    BrowserAnimationsModule,
    MatIconModule
 ],
  providers: [UserService, ProductService, OrderService, CityService, DatePipe],
  bootstrap: [AppComponent],
  entryComponents: [OrderDialogComponent, WelcomeDialogComponent, ProductDialogComponent]
})
export class AppModule { }
