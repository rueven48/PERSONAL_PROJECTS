import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MessageService } from './shared/services/message.service';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { MatDialogModule, MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { TickerComponent } from './ticker/ticker.component';
import { MessageComponent } from './message/message.component';


const appRoutes: Routes = [
  { path: 'app/home', component: HomeComponent },
  { path: 'app', pathMatch: 'full', redirectTo: '/app/home' },
  { path: '', redirectTo: '/app/home', pathMatch: 'full'},

];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent , MainComponent, HeaderComponent, FooterComponent, HomeComponent, TickerComponent, MessageComponent],
  imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      RouterModule.forRoot(appRoutes),
      MatDialogModule,
      MatCardModule,
      MatButtonModule,
      MatToolbarModule,
      BrowserAnimationsModule,
      MatIconModule
],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule {}
