import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { FormGroup, FormControl, ValidatorFn } from '@angular/forms';
import { MovieService } from '../shared/services/movie.service';
import { Movie } from './../shared/services/models/movie.model';

@Component({
  selector: 'app-movie-dialog-info',
  templateUrl: './movie-dialog-info.component.html',
  styleUrls: ['./movie-dialog-info.component.css']
})
export class MovieDialogInfoComponent implements OnInit {

  /*********** PROPERTIRS ****************/

  AddForm: FormGroup; // the use name: 'AddForm' refer both add mode of the form and edit mode of the form.
  imageMoviePreviewSrc = './../../assets/images/preview.png';
  state: any = this.myMovieService.state;
  movieSeleceted: Movie = this.myMovieService.movieSeleceted;

  /*********** END PROPERTIRS ****************/

  constructor(private movieDialog: MatDialog, private myMovieService: MovieService) {

    this.state = this.myMovieService.state;
    this.movieSeleceted = this.myMovieService.movieSeleceted;

    const AddGroupConfig = {
      title: new FormControl(this.movieSeleceted.Title, [
        f => (!f.value ?  { err: `` } : null),
        f => (!f.value && !f.pristine ? { err: `Title is required!` } : null),
        f => f.value && !f.pristine && this.isMovieTitleExist(f.value) ? { err: `Title  is already exist!` } : null,
        f => f.value && f.value.length >= 60 ? { err: `Title is max 60 chars!` } : null,
        f => f.value && f.value.length < 1 ? { err: `Title is min 1 chars!` } : null
        ]),
      year:  new FormControl(this.movieSeleceted.Year, [
        f => (!f.value ?  { err: `` } : null),
        f => (!f.value && !f.pristine ? { err: `Year is required!` } : null),
        f => f.value && !this.isValidDate(f.value) ? { err: `Year pattern must be "yyyy" and year 1900 until now!` } : null,
        f => f.value && f.value.length >= 30 ? { err: `Year is max 30 chars!` } : null,
        f => f.value && f.value.length < 1 ? { err: `Year is min 1 chars!` } : null
        ]),
      runtime: this.getFormControl(2, 40, 'Movie runtime', this.movieSeleceted.Runtime),
      genre: this.getFormControl(2, 120, 'Movie genre', this.movieSeleceted.Genre),
      director: this.getFormControl(2, 40, 'Movie director', this.movieSeleceted.Director),
      rate: this.getFormControl(1, 40, 'Movie rate', this.movieSeleceted.imdbRating),
      poster:  new FormControl(this.movieSeleceted.Poster, [
        f => (!f.value ?  { err: `` } : null),
        f => (!f.value && !f.pristine ? { err: `Image is required!` } : null),
        f => f.value && !this.isValidUrlPic(f.value) ? { err: `Image pattern must be "http" link and image format at the end!` } : null,
        f => f.value && f.value.length >= 500 ? { err: `Image is max 500 chars!` } : null,
        f => f.value && f.value.length < 1 ? { err: `Image is min 1 chars!` } : null
        ]),
      };

      this.AddForm = new FormGroup(AddGroupConfig);
  }

  ngOnInit() {
  }

  /**
    @function getFormControl - validation function for each form Control Name in the form.
    checks if there is no value, checks min and max chars to put in the inputs.
    @param min
    @param max
    @param label
    @param defaultVal - i want some value to send so that in edit mode so the button save want be diabled
    @returns FormControl
  **/
  getFormControl(min: number, max: number, label: string, defaultVal: any): FormControl {
    return new FormControl(defaultVal || '', [
      f => (!f.value ? { err: `` } : null),
      f => (!f.value && !f.pristine ? { err: `${label} is required!` } : null),
      f => f.value && f.value.length >= max ? { err: `${label} is max ${max} chars!` } : null,
      f => f.value && f.value.length < min ? { err: `${label} is min ${min} chars!` } : null
    ]);
  }

  /**
    @function closeDialog - close all dialogs pop up that are open.
    @returns void
  **/
  closeDialog(): void {
    this.movieDialog.closeAll();
  }

  /**
    @function addMovie - when user clicked add movie button it takes all values from Addform and send it to the
    service as obj in order to do add movie to the array, and close window.
    @returns void
  **/
  addMovie (): void {
    this.myMovieService.addMovie({
      Title: this.AddForm.value.title,
      Year: this.AddForm.value.year,
      Runtime: this.AddForm.value.runtime,
      Genre: this.AddForm.value.genre,
      Director: this.AddForm.value.director,
      imdbRating: this.AddForm.value.rate,
      Poster: this.AddForm.value.poster,
    });
    this.closeDialog();
  }

  /**
    @function editMovie - when user clicked edit movie button it takes all values from Addform and send it to the
    service as obj in order to do edit movie to the array, and close window.
    @returns void
  **/
  editMovie (): void {
    this.myMovieService.editMovie({
      imdbID: this.movieSeleceted.imdbID,
      Title: this.AddForm.value.title,
      Year: this.AddForm.value.year,
      Runtime: this.AddForm.value.runtime,
      Genre: this.AddForm.value.genre,
      Director: this.AddForm.value.director,
      imdbRating: this.AddForm.value.rate,
      Poster: this.AddForm.value.poster,
    });
    this.closeDialog();
  }

  /**
    @function isValidUrlPic - validation if picture is a link and if its ends with common pattern of
    file-type picture.
    @param pictureValue
    @returns boolean
  **/
  isValidUrlPic (pictureValue: string): boolean {
    const regular_url_pattern = /^(https?:\/\/.*\.(?:gif|jpg|jpeg|tiff|png))$/;
    const res = regular_url_pattern.test(pictureValue);
    return res;
  }

  /**
    @function setPreviewPic - when user clicked the image link input set the image for prewview display.
    @param movieImage
    @returns void
  **/
  setPreviewPic(movieImage: string): void {

    if (movieImage === 'default') {
      this.imageMoviePreviewSrc = './../../assets/images/preview.png';
    } else {
      this.imageMoviePreviewSrc = movieImage;
    }
  }


  /**
    @function isValidDate - valdiation when user clicked the year input check if the year isnt above
    current year or value of input less than the year 1900(i decide it logically), and if its not a number.
    @param yearValue
    @returns boolean
  **/
  isValidDate(yearValue: string): boolean {

    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const yearAfterParse = Number(yearValue);

    if (yearAfterParse > currYear || yearAfterParse < 1900 ||  !yearAfterParse ) {
      return false;
    } else {
      return true;
    }
  }

  /**
    @function isMovieTitleExist - check if the movie title already exist.
    @param valueSearch
    @returns boolean
  **/
  isMovieTitleExist (valueSearch: string): boolean {
    return this.myMovieService.isMovieTitleExist(valueSearch);
  }

}
