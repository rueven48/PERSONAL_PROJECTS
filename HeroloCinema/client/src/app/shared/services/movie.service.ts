import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AnimationGroupPlayer } from '@angular/animations/src/players/animation_group_player';
import { Movie } from './models/movie.model';


@Injectable()
export class MovieService {

    /*********** PROPERTIRS ****************/

    apiKeyValue = 'bc2f8f5a';
    movies: Movie[] = []; // movies array contain each movie obj.
    counterIds = 0; // counter for movie ID genrate.
    movieSeleceted: Movie = {}; // delete movie obj or edit movie obj.
    state: any = { position : 'add' };

    /*********** END PROPERTIRS ****************/

    constructor(private myHttpClient: HttpClient) {

    }

    /**
      @function initGetMovies - init do get request to the api movies and get all movies, according to the search
      param that send in filter, and get page 1.
      @param filter - at default i send 'Batman' but it can be change.
      @returns void
    **/
    initGetMovies(filter: string): void {
        this.myHttpClient.get(`http://www.omdbapi.com/?s=${filter}&page=1&apikey=${this.apiKeyValue}`)
            .subscribe((resp: any) => {
                this.initGetMovie(resp);
        });

    }

    /**
      @function initGetMovie - init do get request to the api movies for each movie in for loop, and set
      each of the movie obj in 'movies' array property.
      @param resp
      @returns void
    **/
    initGetMovie(resp: any): void {
        for (let i = 0; i < resp.Search.length; i++) {

            const imdbIDValue = resp.Search[i].imdbID;
            this.myHttpClient.get(`http://www.omdbapi.com/?i=${imdbIDValue}&apikey=${this.apiKeyValue}`)
            .subscribe((response: any) => {
                this.setObjDetailsInMovieArray(response);
            });
        }
    }

    /**
      @function setObjDetailsInMovieArray -  set obj details according to specification into new movie obj.
      set the new obj into 'movies' array property.
      @param item - each movie obj is item.
      @returns void
    **/
    setObjDetailsInMovieArray(item: any): void {
        const movieObj = {};
        movieObj['imdbID'] = item.imdbID;
        movieObj['Title'] = item.Title.toLowerCase();
        movieObj['Year'] = item.Year;
        movieObj['Runtime'] = item.Runtime;
        movieObj['Genre'] = item.Genre;
        movieObj['Poster'] = item.Poster;
        movieObj['Director'] = item.Director;
        movieObj['imdbRating'] = item.imdbRating;
        this.movies.push(movieObj);
    }

    /**
      @function addMovie - generate new movie id. set it into the new movie, and add the new movie
      obj into 'movies' array property.
      @param movieObj
      @returns void
    **/
    addMovie (movieObj: Movie): void {
        const newMovieIdValue = this.createNewMovieId();
        movieObj = this.setNewMovieIdInMovieObj(movieObj, newMovieIdValue);
        this.addNewMovieIntoCurrMovieArr(movieObj);
    }

    /**
      @function createNewMovieId - generate new movie ID using counter to make it unique and return it.
      @returns string
    **/
    createNewMovieId (): string {
        const movieString = 'cc';
        this.counterIds++;
        const newMovieIdValue = movieString + this.counterIds;
        return newMovieIdValue;
    }

    /**
      @function setNewMovieIdInMovieObj - set the ID into new movie obj and return it.
      @param movieObj
      @param newMovieIdValue
      @returns Movie
    **/
    setNewMovieIdInMovieObj (movieObj: Movie, newMovieIdValue: string): Movie {
        movieObj['imdbID'] = newMovieIdValue;
        return movieObj;
    }

    /**
      @function addNewMovieIntoCurrMovieArr - add new movie into 'movies' array property.
      @param movieObj
      @returns void
    **/
    addNewMovieIntoCurrMovieArr (movieObj: Movie): void {
        this.movies.push(movieObj);
    }

    /**
      @function deleteMovie - delete chosen movie from the array using movie ID becouse
      its unique and will be only one in each movie obj.
      @param movieId
      @returns void
    **/
    deleteMovie (movieId: string): void {
        for (let i = 0; i < this.movies.length; i++) {

            if (this.movies[i].imdbID === movieId) {
                this.movies.splice(i, 1);
            }
        }
    }

    /**
      @function editMovie - do for loop on 'movies' array property and edit new changes into
      the same movie. do the search also with movie ID becouse its unique.
      @param movieId
      @returns void
    **/
    editMovie (movieObj: Movie): void {
        for (let i = 0; i < this.movies.length; i++) {

            if (this.movies[i].imdbID === movieObj.imdbID) {
              this.movies[i] = movieObj;
              break;
            }
        }
    }

    /**
      @function isMovieTitleExist - validtaion check if the movie title already in 'movies' array property
      return true, else false. search do by title.
      @param valueSearch
      @returns boolean
    **/
    isMovieTitleExist (valueSearch: string): boolean {
        for (let i = 0; i < this.movies.length; i++) {

            if (this.movies[i].Title === valueSearch) {
                return true;
            }
        }
        return false;
    }

    /**
      @function setSelectedMovieIntoObj - set selected movie into 'movieSeleceted' obj property.
      this will happened in edit movie or delete movie case.
      @param movieId
      @returns void
    **/
    setSelectedMovieIntoObj (movieId: string): void {
        for (let i = 0; i < this.movies.length; i++) {
            if (this.movies[i].imdbID === movieId) {
                this.movieSeleceted = this.movies[i];
                break;
            }
        }
    }

    /**
      @function changeStateMovieInfo - change the state of the movie AddForm in movie-dialog-info compponent
      to edit mode or add mode according to positionValue that been send to the function. the value is
      send when there is clicked on edit button -> 'edit' or if there is clicked on add button -> 'add'.
      @param positionValue - 'edit' or 'add;
      @returns void
    **/
    changeStateMovieInfo(positionValue: string): void {
      this.state.position = positionValue;
    }



}
