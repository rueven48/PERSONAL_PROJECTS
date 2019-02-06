import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { MovieService } from './shared/services/movie.service';
import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MoviesComponent } from './movies/movies.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MovieDialogInfoComponent } from './movie-dialog-info/movie-dialog-info.component';
import { MatDialogModule, MatCardModule, MatButtonModule, MatToolbarModule, MatIconModule} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MovieDialogDeleteComponent } from './movie-dialog-delete/movie-dialog-delete.component';
import {SpecialPipe} from './pipes/title.pipe';


const appRoutes: Routes = [
  { path: 'app/home', component: HomeComponent },
  { path: 'app', pathMatch: 'full', redirectTo: '/app/home' },
  { path: '', redirectTo: '/app/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  // tslint:disable-next-line:max-line-length
  declarations: [AppComponent , MainComponent, MoviesComponent, HeaderComponent, FooterComponent, HomeComponent, PageNotFoundComponent, MovieDialogInfoComponent, MovieDialogDeleteComponent, SpecialPipe],
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
  providers: [MovieService],
  bootstrap: [AppComponent],
  entryComponents: [MovieDialogInfoComponent, MovieDialogDeleteComponent]
})
export class AppModule {}
