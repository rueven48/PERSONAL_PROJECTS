import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatCardModule, MatButtonModule, MatToolbarModule, MatDialog} from '@angular/material';
import { MovieDialogInfoComponent } from '../movie-dialog-info/movie-dialog-info.component';
import { MovieService } from '../shared/services/movie.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private movieDialog: MatDialog, private myMovieService: MovieService) { }

  ngOnInit() {
  }

  /**
    @function openAddDialogMovieInfo - open dianlog pop up window if user clicked add movie.
    @returns void
  **/
  openAddDialogMovieInfo(): void {
    this.myMovieService.movieSeleceted = {};
    this.movieDialog.closeAll();
    this.myMovieService.changeStateMovieInfo('add');
    this.movieDialog.open(MovieDialogInfoComponent, {
      height: '700px',
      width: '500px',
      disableClose: false,
      }
    );
  }

}
