import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MovieService } from '../shared/services/movie.service';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Movie } from '../shared/services/models/movie.model';

@Component({
  selector: 'app-movie-dialog-delete',
  templateUrl: './movie-dialog-delete.component.html',
  styleUrls: ['./movie-dialog-delete.component.css']
})
export class MovieDialogDeleteComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  movieSeleceted: Movie = {};

  /*********** END PROPERTIRS ****************/

  constructor(private movieDialogDelete: MatDialog, private myMovieService: MovieService) {
    this.movieSeleceted = this.myMovieService.movieSeleceted;
   }

  ngOnInit() {
  }

  /**
    @function closeDialog - close all dialogs pop up that are open.
    @returns void
  **/
  closeDialog(): void {
    this.movieDialogDelete.closeAll();
  }

  /**
    @function deleteMovie - when user clicked delete button go to movie service and delete the movie, and close window.
    @returns void
  **/
  deleteMovie(): void {
    this.myMovieService.deleteMovie(this.movieSeleceted.imdbID);
    this.closeDialog();
  }

}
