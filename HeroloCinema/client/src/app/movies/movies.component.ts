import { Component, OnInit } from '@angular/core';
import { Movie } from '../shared/services/models/movie.model';
import { MovieService } from '../shared/services/movie.service';
import { MatDialogModule, MatCardModule, MatButtonModule, MatToolbarModule, MatDialog} from '@angular/material';
import { MovieDialogDeleteComponent } from '../movie-dialog-delete/movie-dialog-delete.component';
import { MovieDialogInfoComponent } from '../movie-dialog-info/movie-dialog-info.component';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.css']
})
export class MoviesComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  movies: Movie[] = this.myMovieService.movies;

  /*********** END PROPERTIRS ****************/

  constructor(private movieDialogDelete: MatDialog, private myMovieService: MovieService, private movieDialogInfo: MatDialog) {
    this.movies = this.myMovieService.movies;
  }

  ngOnInit() {
    this.myMovieService.initGetMovies('Batman'); // init the api request on start of app.
  }

  /**
    @function openEditDialogMovieInfo - open pop up window in edit mode. change state in service into 'edit'.
    set the edit obj into movieSeleceted property in service movie.
    @param valueSearch
    @returns void
  **/
  openEditDialogMovieInfo(movieId: string): void {
    this.movieDialogDelete.closeAll();
    this.myMovieService.changeStateMovieInfo('edit');
    this.myMovieService.setSelectedMovieIntoObj(movieId);
    this.movieDialogInfo.open(MovieDialogInfoComponent, {
    height: '700px',
    width: '500px',
    disableClose: false,
    }
    );
  }


  /**
    @function openDeleteDialog - open pop up window in delete mode.
    set the delete obj into movieSeleceted property in service movie.
    @param movieId
    @returns void
  **/
  openDeleteDialog(movieId: string): void {
    this.movieDialogDelete.closeAll();
    this.myMovieService.setSelectedMovieIntoObj(movieId);
      this.movieDialogDelete.open(MovieDialogDeleteComponent, {
      height: '250px',
      width: '500px',
      disableClose: false,
      }
      );
  }
}

