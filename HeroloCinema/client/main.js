(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/*!**********************************************************!*\
  !*** ./src/$$_lazy_route_resource lazy namespace object ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/*!***********************************!*\
  !*** ./src/app/app.component.css ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n#my_header{\r\n  position: fixed;\r\n  top: 0;\r\n  width: 100%;\r\n  z-index: 1;\r\n}"

/***/ }),

/***/ "./src/app/app.component.html":
/*!************************************!*\
  !*** ./src/app/app.component.html ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n\n    <app-header id=\"my_header\"></app-header>\n\n    <app-main></app-main>\n\n    <app-footer></app-footer>\n\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = /** @class */ (function () {
    function AppComponent() {
        this.today = Date.now();
    }
    AppComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! ./app.component.html */ "./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.css */ "./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/platform-browser */ "./node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "./node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _main_main_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./main/main.component */ "./src/app/main/main.component.ts");
/* harmony import */ var _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./shared/services/movie.service */ "./src/app/shared/services/movie.service.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _movies_movies_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./movies/movies.component */ "./src/app/movies/movies.component.ts");
/* harmony import */ var _header_header_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./header/header.component */ "./src/app/header/header.component.ts");
/* harmony import */ var _footer_footer_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./footer/footer.component */ "./src/app/footer/footer.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./page-not-found/page-not-found.component */ "./src/app/page-not-found/page-not-found.component.ts");
/* harmony import */ var _movie_dialog_info_movie_dialog_info_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./movie-dialog-info/movie-dialog-info.component */ "./src/app/movie-dialog-info/movie-dialog-info.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/platform-browser/animations */ "./node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _movie_dialog_delete_movie_dialog_delete_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./movie-dialog-delete/movie-dialog-delete.component */ "./src/app/movie-dialog-delete/movie-dialog-delete.component.ts");
/* harmony import */ var _pipes_title_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./pipes/title.pipe */ "./src/app/pipes/title.pipe.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};


















var appRoutes = [
    { path: 'app/home', component: _home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"] },
    { path: 'app', pathMatch: 'full', redirectTo: '/app/home' },
    { path: '', redirectTo: '/app/home', pathMatch: 'full' },
    { path: '**', component: _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_12__["PageNotFoundComponent"] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            // tslint:disable-next-line:max-line-length
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _main_main_component__WEBPACK_IMPORTED_MODULE_4__["MainComponent"], _movies_movies_component__WEBPACK_IMPORTED_MODULE_8__["MoviesComponent"], _header_header_component__WEBPACK_IMPORTED_MODULE_9__["HeaderComponent"], _footer_footer_component__WEBPACK_IMPORTED_MODULE_10__["FooterComponent"], _home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"], _page_not_found_page_not_found_component__WEBPACK_IMPORTED_MODULE_12__["PageNotFoundComponent"], _movie_dialog_info_movie_dialog_info_component__WEBPACK_IMPORTED_MODULE_13__["MovieDialogInfoComponent"], _movie_dialog_delete_movie_dialog_delete_component__WEBPACK_IMPORTED_MODULE_16__["MovieDialogDeleteComponent"], _pipes_title_pipe__WEBPACK_IMPORTED_MODULE_17__["SpecialPipe"]],
            imports: [
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_0__["BrowserModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClientModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["FormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_7__["ReactiveFormsModule"],
                _angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(appRoutes),
                _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatToolbarModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_15__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_14__["MatIconModule"]
            ],
            providers: [_shared_services_movie_service__WEBPACK_IMPORTED_MODULE_5__["MovieService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]],
            entryComponents: [_movie_dialog_info_movie_dialog_info_component__WEBPACK_IMPORTED_MODULE_13__["MovieDialogInfoComponent"], _movie_dialog_delete_movie_dialog_delete_component__WEBPACK_IMPORTED_MODULE_16__["MovieDialogDeleteComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/footer/footer.component.css":
/*!*********************************************!*\
  !*** ./src/app/footer/footer.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "footer {\r\n  height: 80px;\r\n}\r\n\r\n@media only screen\r\n  and (min-device-height: 481px)\r\n  and (max-device-height: 568px){\r\n    footer {\r\n      height: 40px;\r\n    }\r\n    .footerP {\r\n      bottom: 6vh !important;\r\n    }\r\n\r\n}\r\n\r\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\r\n  .footerP {\r\n    bottom: 2vh;\r\n    position: relative;\r\n  }\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/footer/footer.component.html":
/*!**********************************************!*\
  !*** ./src/app/footer/footer.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<footer class=\"text-center\">\n  <p class=\"footerP\">&copy; Herolo Cinema Assignment - Made by Rueven Cohen - {{today | date:\"MMM d, y\"}}</p>\n</footer>"

/***/ }),

/***/ "./src/app/footer/footer.component.ts":
/*!********************************************!*\
  !*** ./src/app/footer/footer.component.ts ***!
  \********************************************/
/*! exports provided: FooterComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FooterComponent", function() { return FooterComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var FooterComponent = /** @class */ (function () {
    /*********** END PROPERTIRS ****************/
    function FooterComponent() {
        /*********** PROPERTIRS ****************/
        this.today = Date.now();
    }
    FooterComponent.prototype.ngOnInit = function () {
    };
    FooterComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-footer',
            template: __webpack_require__(/*! ./footer.component.html */ "./src/app/footer/footer.component.html"),
            styles: [__webpack_require__(/*! ./footer.component.css */ "./src/app/footer/footer.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], FooterComponent);
    return FooterComponent;
}());



/***/ }),

/***/ "./src/app/header/header.component.css":
/*!*********************************************!*\
  !*** ./src/app/header/header.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n.main_headline{\r\n    position: relative;\r\n    top: 5px;\r\n    color: white;\r\n    text-align: center;\r\n}\r\n\r\nul{\r\n    position: relative;\r\n    list-style-type: none;\r\n}\r\n\r\nimg{\r\n    position: absolute;\r\n    top: -14px;\r\n    left: -62px;\r\n    width: 60px;\r\n    height: 60px;\r\n}\r\n\r\n.add_button{\r\n    position: relative;\r\n    top: 0px;\r\n    left: 75px ;\r\n    width: 135px;\r\n    height: 30px;\r\n    font-size: 15px;\r\n    color: orange;\r\n    text-decoration: none;\r\n}\r\n\r\nli a {\r\n    color: orange !important;\r\n}\r\n\r\n/* ----------- iPad ----------- */\r\n\r\n@media only screen\r\n  and (min-device-width: 400px)\r\n  and (max-device-width: 768px){\r\n\r\n    .main_headline{\r\n        font-size: 14px !important;\r\n    }\r\n}\r\n\r\n/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 481px)\r\n  and (max-device-height: 568px){\r\n\r\n    h3{\r\n        font-size: 12px;\r\n        letter-spacing: 4px;\r\n    }\r\n\r\n}\r\n\r\n/* ----------- iPhone 4 and 4S ----------- */\r\n\r\n@media only screen\r\n  and (min-device-width: 320px)\r\n  and (max-device-height: 480px){\r\n\r\n    .main_headline{\r\n        top: 15px;\r\n    }\r\n\r\n    h3{\r\n        font-size: 14px;\r\n        letter-spacing: 4px;\r\n\r\n    }\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/header/header.component.html":
/*!**********************************************!*\
  !*** ./src/app/header/header.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<nav class=\"navbar\">\n  <button (click)=\"openAddDialogMovieInfo()\" class=\"btn btn-link add_button\">\n    <img  class=\"ml-4\" src=\"./../../assets/images/plus.png\">\n    <p>Add movie</p>\n  </button>\n  <h3 class=\"main_headline text-center\">Welcome to the cinema using OMDb API !</h3>\n  <ul class=\"d-flex flex-row-reverse\">\n    <li><a routerLink=\"/app/home\">HOME</a></li>\n    <li class=\"mr-3\"><a href=\"https://www.imdb.com/\">IMDB</a></li>\n    <li class=\"mr-3\"><a href=\"http://www.omdbapi.com/\">OMDB</a></li>\n  </ul>\n\n</nav>\n\n"

/***/ }),

/***/ "./src/app/header/header.component.ts":
/*!********************************************!*\
  !*** ./src/app/header/header.component.ts ***!
  \********************************************/
/*! exports provided: HeaderComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HeaderComponent", function() { return HeaderComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _movie_dialog_info_movie_dialog_info_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../movie-dialog-info/movie-dialog-info.component */ "./src/app/movie-dialog-info/movie-dialog-info.component.ts");
/* harmony import */ var _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/movie.service */ "./src/app/shared/services/movie.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HeaderComponent = /** @class */ (function () {
    function HeaderComponent(movieDialog, myMovieService) {
        this.movieDialog = movieDialog;
        this.myMovieService = myMovieService;
    }
    HeaderComponent.prototype.ngOnInit = function () {
    };
    /**
      @function openAddDialogMovieInfo - open dianlog pop up window if user clicked add movie.
      @returns void
    **/
    HeaderComponent.prototype.openAddDialogMovieInfo = function () {
        this.myMovieService.movieSeleceted = {};
        this.movieDialog.closeAll();
        this.myMovieService.changeStateMovieInfo('add');
        this.movieDialog.open(_movie_dialog_info_movie_dialog_info_component__WEBPACK_IMPORTED_MODULE_2__["MovieDialogInfoComponent"], {
            height: '700px',
            width: '500px',
            disableClose: false,
        });
    };
    HeaderComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-header',
            template: __webpack_require__(/*! ./header.component.html */ "./src/app/header/header.component.html"),
            styles: [__webpack_require__(/*! ./header.component.css */ "./src/app/header/header.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_3__["MovieService"]])
    ], HeaderComponent);
    return HeaderComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/*!*****************************************!*\
  !*** ./src/app/home/home.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n"

/***/ }),

/***/ "./src/app/home/home.component.html":
/*!******************************************!*\
  !*** ./src/app/home/home.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div>\n\n  <app-movies></app-movies>\n\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = /** @class */ (function () {
    function HomeComponent() {
    }
    HomeComponent.prototype.ngOnInit = function () {
    };
    HomeComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! ./home.component.html */ "./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.css */ "./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/main/main.component.css":
/*!*****************************************!*\
  !*** ./src/app/main/main.component.css ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\r\n\r\n"

/***/ }),

/***/ "./src/app/main/main.component.html":
/*!******************************************!*\
  !*** ./src/app/main/main.component.html ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<div>\n\n             <router-outlet></router-outlet>\n\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/main/main.component.ts":
/*!****************************************!*\
  !*** ./src/app/main/main.component.ts ***!
  \****************************************/
/*! exports provided: MainComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MainComponent", function() { return MainComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var MainComponent = /** @class */ (function () {
    function MainComponent() {
    }
    MainComponent.prototype.ngOnInit = function () {
    };
    MainComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-main',
            template: __webpack_require__(/*! ./main.component.html */ "./src/app/main/main.component.html"),
            styles: [__webpack_require__(/*! ./main.component.css */ "./src/app/main/main.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], MainComponent);
    return MainComponent;
}());



/***/ }),

/***/ "./src/app/movie-dialog-delete/movie-dialog-delete.component.css":
/*!***********************************************************************!*\
  !*** ./src/app/movie-dialog-delete/movie-dialog-delete.component.css ***!
  \***********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "input {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 250px;\r\n  border-radius: 3px;\r\n}\r\n\r\n#button_save {\r\n  position: relative;\r\n  left: 15px;\r\n  width: 100px;\r\n  left: 55%;\r\n  top: 30px;\r\n}\r\n\r\n#button_cancel {\r\n  position: relative;\r\n  width: 100px;\r\n  left: 7%;\r\n  top: 30px;\r\n}\r\n\r\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\r\n  #button_save {\r\n    float: right;\r\n    left: 0;\r\n    right: 0;\r\n  }\r\n\r\n  #button_cancel {\r\n    float: left;\r\n    right: 0;\r\n    left: 0;\r\n  }\r\n}\r\n"

/***/ }),

/***/ "./src/app/movie-dialog-delete/movie-dialog-delete.component.html":
/*!************************************************************************!*\
  !*** ./src/app/movie-dialog-delete/movie-dialog-delete.component.html ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n\n    <span><strong class=\"main_title\">Delete Movie Message:</strong></span>\n  <hr/>\n\n    <div class=\"parent\">\n        <p>Are you sure you want to delete <strong>'{{movieSeleceted.Title|titlecase|specialPipe}}'</strong>?</p>\n        <input id=\"button_save\" class=\"btn btn-primary\" type=\"submit\" value=\"Ok\" (click)=\"deleteMovie()\" />\n        <input id=\"button_cancel\" class=\"btn btn-primary\" value=\"Cancel\" (click)=\"closeDialog()\" />\n    </div>\n\n  </div>\n\n\n"

/***/ }),

/***/ "./src/app/movie-dialog-delete/movie-dialog-delete.component.ts":
/*!**********************************************************************!*\
  !*** ./src/app/movie-dialog-delete/movie-dialog-delete.component.ts ***!
  \**********************************************************************/
/*! exports provided: MovieDialogDeleteComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieDialogDeleteComponent", function() { return MovieDialogDeleteComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../shared/services/movie.service */ "./src/app/shared/services/movie.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var MovieDialogDeleteComponent = /** @class */ (function () {
    /*********** END PROPERTIRS ****************/
    function MovieDialogDeleteComponent(movieDialogDelete, myMovieService) {
        this.movieDialogDelete = movieDialogDelete;
        this.myMovieService = myMovieService;
        /*********** PROPERTIRS ****************/
        this.movieSeleceted = {};
        this.movieSeleceted = this.myMovieService.movieSeleceted;
    }
    MovieDialogDeleteComponent.prototype.ngOnInit = function () {
    };
    /**
      @function closeDialog - close all dialogs pop up that are open.
      @returns void
    **/
    MovieDialogDeleteComponent.prototype.closeDialog = function () {
        this.movieDialogDelete.closeAll();
    };
    /**
      @function deleteMovie - when user clicked delete button go to movie service and delete the movie, and close window.
      @returns void
    **/
    MovieDialogDeleteComponent.prototype.deleteMovie = function () {
        this.myMovieService.deleteMovie(this.movieSeleceted.imdbID);
        this.closeDialog();
    };
    MovieDialogDeleteComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-movie-dialog-delete',
            template: __webpack_require__(/*! ./movie-dialog-delete.component.html */ "./src/app/movie-dialog-delete/movie-dialog-delete.component.html"),
            styles: [__webpack_require__(/*! ./movie-dialog-delete.component.css */ "./src/app/movie-dialog-delete/movie-dialog-delete.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_2__["MovieService"]])
    ], MovieDialogDeleteComponent);
    return MovieDialogDeleteComponent;
}());



/***/ }),

/***/ "./src/app/movie-dialog-info/movie-dialog-info.component.css":
/*!*******************************************************************!*\
  !*** ./src/app/movie-dialog-info/movie-dialog-info.component.css ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "#close_icon {\r\n  position: relative;\r\n  font-size: 26px !important;\r\n  left: 46%;\r\n  top: -60px;\r\n}\r\n\r\n#close_icon:hover {\r\n  position: relative;\r\n  cursor: pointer;\r\n}\r\n\r\n.main_title {\r\n  position: relative;\r\n  font-size: 18px;\r\n  top: -60px;\r\n}\r\n\r\np {\r\n  font-size: 0.8em;\r\n  color: red;\r\n  display: block;\r\n  width: 400px;\r\n}\r\n\r\ninput {\r\n  position: relative;\r\n  display: inline-block;\r\n  width: 250px;\r\n  border-radius: 3px;\r\n}\r\n\r\n#input_title {\r\n  left: 43px;\r\n}\r\n\r\n#input_year {\r\n  left: 43px;\r\n}\r\n\r\n#input_runtime {\r\n  left: 18px;\r\n}\r\n\r\n#input_genre {\r\n  left: 34px;\r\n}\r\n\r\n#input_director {\r\n  left: 20px;\r\n}\r\n\r\n#input_rate {\r\n  left: 45px;\r\n}\r\n\r\n#input_image {\r\n  left: 49px;\r\n}\r\n\r\nimg {\r\n  position: relative;\r\n  left: 82px;\r\n  width: 140px;\r\n  height: 140px;\r\n}\r\n\r\n#button_save {\r\n  left: 15px;\r\n  width: 100px;\r\n  left: 55%;\r\n}\r\n\r\n#button_cancel {\r\n  width: 100px;\r\n  left: 7%;\r\n}\r\n\r\n#button_delete {\r\n  width: 130px;\r\n  left: -5%;\r\n  top: 55px;\r\n}\r\n\r\n/* ----------- iPhone x ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 737px)\r\n  and (max-device-height: 812px){\r\n\r\n    #button_save {\r\n      position: relative;\r\n      float: right;\r\n      top: -0.1vh !important;\r\n      left: 0vw !important;\r\n      right: 0;\r\n    }\r\n\r\n    input[type='text'],input[type='number']  {\r\n      width: 56% !important;\r\n      right: 10%;\r\n    }\r\n}\r\n\r\n/* ----------- iPhone 6,7,8 plus ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 668px)\r\n  and (max-device-height: 736px){\r\n\r\n    input[type='text'],input[type='number']  {\r\n      width: 60% !important;\r\n      right: 10%;\r\n    }\r\n\r\n    #button_save {\r\n      position: relative;\r\n      float: right;\r\n      top: -0.1vh !important;\r\n      left: 0vw !important;\r\n      right: 0;\r\n    }\r\n\r\n}\r\n\r\n/* ----------- iPhone 6,7,8  ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 569px)\r\n  and (max-device-height: 667px){\r\n\r\n    #button_save {\r\n      position: relative;\r\n      float: right;\r\n      top: -0.1vh !important;\r\n      left: 0vw !important;\r\n      right: 0;\r\n    }\r\n\r\n    input[type='text'],input[type='number']  {\r\n      width: 54% !important;\r\n      right: 10%;\r\n    }\r\n\r\n}\r\n\r\n/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 481px)\r\n  and (max-device-height: 568px){\r\n\r\n    #button_save {\r\n      position: relative;\r\n      float: right;\r\n      top: 6.9vh !important;\r\n      left: 4vw;\r\n      right: 0;\r\n\r\n    }\r\n}\r\n\r\n/* ----------- iPhone 4 and 4S ----------- */\r\n\r\n@media only screen and (min-device-width: 320px) and (max-device-width: 480px) {\r\n  #button_save {\r\n    float: right;\r\n    left: 4vw;\r\n    right: 0;\r\n    top: 8vh;\r\n  }\r\n\r\n  #button_cancel {\r\n    float: left;\r\n    right: 0;\r\n    left: 0;\r\n  }\r\n\r\n  .movieTitleContainer {\r\n    display: flex;\r\n    flex-direction: column-reverse;\r\n  }\r\n\r\n  .main_title{\r\n    right: 6vw;;\r\n  }\r\n\r\n  .moviePreviewImage {\r\n    position: relative;\r\n    left: 37%;\r\n  }\r\n\r\n  #close_icon {\r\n    position: relative;\r\n    font-size: 26px !important;\r\n    left: 0;\r\n    top: 0;\r\n  }\r\n  input{\r\n    width: 47%;\r\n    right: 10%;\r\n  }\r\n\r\n  .form-group{\r\n    position: relative;\r\n    right: 4vw;\r\n  }\r\n\r\n\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/movie-dialog-info/movie-dialog-info.component.html":
/*!********************************************************************!*\
  !*** ./src/app/movie-dialog-info/movie-dialog-info.component.html ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n<form [ngSwitch]=\"state.position\" [formGroup]=\"AddForm\">\n\n  <div class=\"movieTitleContainer\">\n    <span *ngSwitchCase=\"'add'\">\n      <strong class=\"main_title\">Add Movie:</strong>\n    </span>\n    <span *ngSwitchCase=\"'edit'\">\n        <strong class=\"main_title\">Edit Movie:</strong>\n    </span>\n    <img *ngSwitchCase=\"'add'\" alt=\"movie_pic\" class=\"moviePreviewImage\" src=\"{{imageMoviePreviewSrc}}\">\n    <img *ngSwitchCase=\"'edit'\" alt=\"movie_pic\" class=\"moviePreviewImage\" src=\"{{movieSeleceted.Poster}}\">\n    <i id=\"close_icon\" class=\"fa fa-times-circle\" (click)=\"closeDialog()\"></i>\n  </div>\n  <hr/>\n\n\n    <div class=\"form-group\">\n        <label>Movie Title:</label>\n        <input *ngSwitchCase=\"'add'\" type=\"text\" id=\"input_title\" class=\"form-control\" formControlName=\"title\"/>\n        <input *ngSwitchCase=\"'edit'\" value=\"{{movieSeleceted.Title}}\" type=\"text\" id=\"input_title\" class=\"form-control\" formControlName=\"title\"/>\n        <p>{{AddForm.controls.title.errors?.err}}</p>\n    </div>\n\n\n    <div class=\"form-group\">\n        <label>Movie Year:</label>\n        <input *ngSwitchCase=\"'add'\" type=\"text\" id=\"input_year\" class=\"form-control\" formControlName=\"year\"/>\n        <input *ngSwitchCase=\"'edit'\" value=\"{{movieSeleceted.Year}}\" type=\"text\" id=\"input_year\" class=\"form-control\" formControlName=\"year\"/>\n        <p id=\"yearErrorMessage\">{{AddForm.controls.year.errors?.err}}</p>\n    </div>\n\n    <div class=\"form-group\">\n      <label>Movie Runtime:</label>\n      <input *ngSwitchCase=\"'add'\" type=\"text\" id=\"input_runtime\" class=\"form-control\" formControlName=\"runtime\"/>\n      <input *ngSwitchCase=\"'edit'\" value=\"{{movieSeleceted.Runtime}}\" type=\"text\" id=\"input_runtime\" class=\"form-control\" formControlName=\"runtime\"/>\n      <p>{{AddForm.controls.runtime.errors?.err}}</p>\n    </div>\n\n    <div class=\"form-group\">\n      <label>Movie Genre:</label>\n      <input *ngSwitchCase=\"'add'\" type=\"text\" id=\"input_genre\" class=\"form-control\" formControlName=\"genre\"/>\n      <input *ngSwitchCase=\"'edit'\" value=\"{{movieSeleceted.Genre}}\" type=\"text\" id=\"input_genre\" class=\"form-control\" formControlName=\"genre\"/>\n      <p>{{AddForm.controls.genre.errors?.err}}</p>\n    </div>\n\n    <div class=\"form-group\">\n      <label>Movie Director:</label>\n      <input *ngSwitchCase=\"'add'\" type=\"text\" id=\"input_director\" class=\"form-control\" formControlName=\"director\"/>\n      <input *ngSwitchCase=\"'edit'\" value=\"{{movieSeleceted.Director}}\" type=\"text\" id=\"input_director\" class=\"form-control\" formControlName=\"director\"/>\n      <p>{{AddForm.controls.director.errors?.err}}</p>\n    </div>\n\n    <div class=\"form-group\">\n      <label>Movie Rate:</label>\n      <input *ngSwitchCase=\"'add'\" type=\"number\" id=\"input_rate\" class=\"form-control\" formControlName=\"rate\"/>\n      <input *ngSwitchCase=\"'edit'\" value=\"{{movieSeleceted.imdbRating}}\" type=\"number\" id=\"input_rate\" class=\"form-control\" formControlName=\"rate\"/>\n      <p>{{AddForm.controls.rate.errors?.err}}</p>\n    </div>\n\n    <div class=\"form-group\">\n        <label>Image Link:</label>\n        <input  *ngSwitchCase=\"'add'\" #movieImage type=\"text\" id=\"input_image\" class=\"form-control\" formControlName=\"poster\" (keyup)=\"isValidUrlPic(movieImage.value)?setPreviewPic(movieImage.value):setPreviewPic('default');\"/>\n        <input *ngSwitchCase=\"'edit'\" value=\"{{movieSeleceted.Poster}}\" #movieImage type=\"text\" id=\"input_image\" class=\"form-control\" formControlName=\"poster\" (keyup)=\"isValidUrlPic(movieImage.value)?setPreviewPic(movieImage.value):setPreviewPic('default');\"/>\n        <p>{{AddForm.controls.poster.errors?.err}}</p>\n    </div>\n\n\n\n    <div class=\"parent\">\n\n        <input *ngSwitchCase=\"'add'\" id=\"button_save\" class=\"form-control btn btn-primary\" type=\"submit\" value=\"Save\" [disabled]=\"AddForm.invalid\"  (click)=\"addMovie()\" />\n        <input *ngSwitchCase=\"'edit'\" id=\"button_save\" class=\"form-control btn btn-primary\" type=\"submit\" value=\"Save\" [disabled]=\"AddForm.invalid\"  (click)=\"editMovie()\" />\n        <input id=\"button_cancel\" class=\"form-control btn btn-primary\" value=\"Cancel\" (click)=\"closeDialog()\" />\n    </div>\n\n\n\n  </form>\n\n\n\n"

/***/ }),

/***/ "./src/app/movie-dialog-info/movie-dialog-info.component.ts":
/*!******************************************************************!*\
  !*** ./src/app/movie-dialog-info/movie-dialog-info.component.ts ***!
  \******************************************************************/
/*! exports provided: MovieDialogInfoComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieDialogInfoComponent", function() { return MovieDialogInfoComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/forms */ "./node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../shared/services/movie.service */ "./src/app/shared/services/movie.service.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MovieDialogInfoComponent = /** @class */ (function () {
    /*********** END PROPERTIRS ****************/
    function MovieDialogInfoComponent(movieDialog, myMovieService) {
        var _this = this;
        this.movieDialog = movieDialog;
        this.myMovieService = myMovieService;
        this.imageMoviePreviewSrc = './../../assets/images/preview.png';
        this.state = this.myMovieService.state;
        this.movieSeleceted = this.myMovieService.movieSeleceted;
        this.state = this.myMovieService.state;
        this.movieSeleceted = this.myMovieService.movieSeleceted;
        var AddGroupConfig = {
            title: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.movieSeleceted.Title, [
                function (f) { return (!f.value ? { err: "" } : null); },
                function (f) { return (!f.value && !f.pristine ? { err: "Title is required!" } : null); },
                function (f) { return f.value && !f.pristine && _this.isMovieTitleExist(f.value) ? { err: "Title  is already exist!" } : null; },
                function (f) { return f.value && f.value.length >= 60 ? { err: "Title is max 60 chars!" } : null; },
                function (f) { return f.value && f.value.length < 1 ? { err: "Title is min 1 chars!" } : null; }
            ]),
            year: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.movieSeleceted.Year, [
                function (f) { return (!f.value ? { err: "" } : null); },
                function (f) { return (!f.value && !f.pristine ? { err: "Year is required!" } : null); },
                function (f) { return f.value && !_this.isValidDate(f.value) ? { err: "Year pattern must be \"yyyy\" and year 1900 until now!" } : null; },
                function (f) { return f.value && f.value.length >= 30 ? { err: "Year is max 30 chars!" } : null; },
                function (f) { return f.value && f.value.length < 1 ? { err: "Year is min 1 chars!" } : null; }
            ]),
            runtime: this.getFormControl(2, 40, 'Movie runtime', this.movieSeleceted.Runtime),
            genre: this.getFormControl(2, 120, 'Movie genre', this.movieSeleceted.Genre),
            director: this.getFormControl(2, 40, 'Movie director', this.movieSeleceted.Director),
            rate: this.getFormControl(1, 40, 'Movie rate', this.movieSeleceted.imdbRating),
            poster: new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](this.movieSeleceted.Poster, [
                function (f) { return (!f.value ? { err: "" } : null); },
                function (f) { return (!f.value && !f.pristine ? { err: "Image is required!" } : null); },
                function (f) { return f.value && !_this.isValidUrlPic(f.value) ? { err: "Image pattern must be \"http\" link and image format at the end!" } : null; },
                function (f) { return f.value && f.value.length >= 500 ? { err: "Image is max 500 chars!" } : null; },
                function (f) { return f.value && f.value.length < 1 ? { err: "Image is min 1 chars!" } : null; }
            ]),
        };
        this.AddForm = new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormGroup"](AddGroupConfig);
    }
    MovieDialogInfoComponent.prototype.ngOnInit = function () {
    };
    /**
      @function getFormControl - validation function for each form Control Name in the form.
      checks if there is no value, checks min and max chars to put in the inputs.
      @param min
      @param max
      @param label
      @param defaultVal - i want some value to send so that in edit mode so the button save want be diabled
      @returns FormControl
    **/
    MovieDialogInfoComponent.prototype.getFormControl = function (min, max, label, defaultVal) {
        return new _angular_forms__WEBPACK_IMPORTED_MODULE_2__["FormControl"](defaultVal || '', [
            function (f) { return (!f.value ? { err: "" } : null); },
            function (f) { return (!f.value && !f.pristine ? { err: label + " is required!" } : null); },
            function (f) { return f.value && f.value.length >= max ? { err: label + " is max " + max + " chars!" } : null; },
            function (f) { return f.value && f.value.length < min ? { err: label + " is min " + min + " chars!" } : null; }
        ]);
    };
    /**
      @function closeDialog - close all dialogs pop up that are open.
      @returns void
    **/
    MovieDialogInfoComponent.prototype.closeDialog = function () {
        this.movieDialog.closeAll();
    };
    /**
      @function addMovie - when user clicked add movie button it takes all values from Addform and send it to the
      service as obj in order to do add movie to the array, and close window.
      @returns void
    **/
    MovieDialogInfoComponent.prototype.addMovie = function () {
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
    };
    /**
      @function editMovie - when user clicked edit movie button it takes all values from Addform and send it to the
      service as obj in order to do edit movie to the array, and close window.
      @returns void
    **/
    MovieDialogInfoComponent.prototype.editMovie = function () {
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
    };
    /**
      @function isValidUrlPic - validation if picture is a link and if its ends with common pattern of
      file-type picture.
      @param pictureValue
      @returns boolean
    **/
    MovieDialogInfoComponent.prototype.isValidUrlPic = function (pictureValue) {
        var regular_url_pattern = /^(https?:\/\/.*\.(?:gif|jpg|jpeg|tiff|png))$/;
        var res = regular_url_pattern.test(pictureValue);
        return res;
    };
    /**
      @function setPreviewPic - when user clicked the image link input set the image for prewview display.
      @param movieImage
      @returns void
    **/
    MovieDialogInfoComponent.prototype.setPreviewPic = function (movieImage) {
        if (movieImage === 'default') {
            this.imageMoviePreviewSrc = './../../assets/images/preview.png';
        }
        else {
            this.imageMoviePreviewSrc = movieImage;
        }
    };
    /**
      @function isValidDate - valdiation when user clicked the year input check if the year isnt above
      current year or value of input less than the year 1900(i decide it logically), and if its not a number.
      @param yearValue
      @returns boolean
    **/
    MovieDialogInfoComponent.prototype.isValidDate = function (yearValue) {
        var currDate = new Date();
        var currYear = currDate.getFullYear();
        var yearAfterParse = Number(yearValue);
        if (yearAfterParse > currYear || yearAfterParse < 1900 || !yearAfterParse) {
            return false;
        }
        else {
            return true;
        }
    };
    /**
      @function isMovieTitleExist - check if the movie title already exist.
      @param valueSearch
      @returns boolean
    **/
    MovieDialogInfoComponent.prototype.isMovieTitleExist = function (valueSearch) {
        return this.myMovieService.isMovieTitleExist(valueSearch);
    };
    MovieDialogInfoComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-movie-dialog-info',
            template: __webpack_require__(/*! ./movie-dialog-info.component.html */ "./src/app/movie-dialog-info/movie-dialog-info.component.html"),
            styles: [__webpack_require__(/*! ./movie-dialog-info.component.css */ "./src/app/movie-dialog-info/movie-dialog-info.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_1__["MatDialog"], _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_3__["MovieService"]])
    ], MovieDialogInfoComponent);
    return MovieDialogInfoComponent;
}());



/***/ }),

/***/ "./src/app/movies/movies.component.css":
/*!*********************************************!*\
  !*** ./src/app/movies/movies.component.css ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "ul {\r\n    position: relative;\r\n    list-style-type: none;\r\n    flex-wrap: wrap;\r\n    top: 12vh;\r\n    margin-bottom: 5%;\r\n    margin-right: 10%;\r\n    margin-left: 10%;\r\n}\r\n\r\nli{\r\n    position: relative;\r\n    text-decoration: none;\r\n    transition: all 0.5s;\r\n}\r\n\r\nimg{\r\n    height: 350px;\r\n    width:250px;\r\n}\r\n\r\nul li:hover button{\r\n    visibility: visible;\r\n}\r\n\r\nul li:hover{\r\n    font-size: 1.2em;\r\n    color: red;\r\n    font-family: Iceland;\r\n}\r\n\r\nul li:hover img{\r\n   opacity: 0.7;\r\n}\r\n\r\n.edit_button_cover{\r\n    position: absolute;\r\n    top: 20px;\r\n    left: 80px;\r\n    visibility: hidden;\r\n\r\n}\r\n\r\n.delete_button_cover{\r\n    position: absolute;\r\n    top: 20px;\r\n    left: 130px;\r\n    visibility: hidden;\r\n\tcursor:pointer;\r\n}\r\n\r\n.title_name_cover{\r\n    position: absolute;\r\n    border-radius: 20px 20px 20px 20px !important;\r\n    background: black;\r\n    width: 140px;\r\n    margin-right: auto;\r\n    margin-left: auto;\r\n    padding: 0;\r\n    text-align: center;\r\n    word-wrap:break-word;\r\n    top: 36%;\r\n    right: 24%;\r\n    color:red;\r\n    font-weight: 900;\r\n}\r\n\r\n.year_cover{\r\n    position: absolute;\r\n    border-radius: 20px 20px 20px 20px !important;\r\n    background: black;\r\n    width: 140px;\r\n    margin-right: auto;\r\n    margin-left: auto;\r\n    padding: 0;\r\n    text-align: center;\r\n    top: 75%;\r\n    right: 24%;\r\n    color:yellow;\r\n    font-weight: 900;\r\n}\r\n\r\n.rating_cover{\r\n    position: absolute;\r\n    border-radius: 20px 20px 20px 20px !important;\r\n    background: black;\r\n    width: 140px;\r\n    margin-right: auto;\r\n    margin-left: auto;\r\n    padding: 0;\r\n    text-align: center;\r\n    top: 85%;\r\n    right: 24%;\r\n    color:green;\r\n    font-weight: 900;\r\n}\r\n\r\nul li:hover .my_spans{\r\n    pointer-events: none;\r\n}\r\n\r\nul .delete_button_cover:hover {\r\n    color: #ff6600;\r\n}\r\n\r\nul .edit_button_cover:hover {\r\n    color: #00ff00;\r\n}\r\n\r\n/* ----------- iPad ----------- */\r\n\r\n@media only screen\r\n  and (min-device-width: 400px)\r\n  and (max-device-width: 768px){\r\n\r\n    ul {\r\n        top: 18vh !important;\r\n        right:-18% !important;\r\n    }\r\n}\r\n\r\n/* ----------- iPhone x ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 737px)\r\n  and (max-device-height: 812px){\r\n\r\n    ul {\r\n        top: 27vh !important;\r\n        right:3% !important;\r\n    }\r\n}\r\n\r\n/* ----------- iPhone 6,7,8 plus ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 668px)\r\n  and (max-device-height: 736px){\r\n\r\n    ul {\r\n        top: 25vh !important;\r\n        right:0% !important;\r\n    }\r\n\r\n}\r\n\r\n/* ----------- iPhone 6,7,8 ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 569px)\r\n  and (max-device-height: 667px){\r\n\r\n    ul {\r\n        top: 32vh !important;\r\n        right:5% !important;\r\n    }\r\n\r\n}\r\n\r\n/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */\r\n\r\n@media only screen\r\n  and (min-device-height: 481px)\r\n  and (max-device-height: 568px){\r\n\r\n    ul {\r\n        top: 30vh !important;\r\n        right:10% !important;\r\n    }\r\n}\r\n\r\n/* ----------- iPhone 4 and 4S ----------- */\r\n\r\n@media only screen\r\nand (min-device-width: 320px)\r\nand (max-device-width: 480px){\r\n\r\n    ul {\r\n        right: 12vw;\r\n        top: 34vh;\r\n        margin-bottom: 24%;\r\n    }\r\n\r\n    .movie_picture{\r\n        height: 230px;\r\n    }\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/movies/movies.component.html":
/*!**********************************************!*\
  !*** ./src/app/movies/movies.component.html ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n\n  <ul class=\"d-flex flex-row\" >\n\n    <li class=\"mr-5 mb-3\" *ngFor=\"let movie of movies\">\n      <img class=\"movie_picture\" [src]=\"movie.Poster\" alt=\"Movie Picture\">\n\n        <span class=\"title_name_cover my_spans\">{{movie.Title|titlecase|specialPipe}}</span>\n        <span class=\"year_cover my_spans\">Year: {{movie.Year}}</span>\n        <span class=\"rating_cover my_spans\">Rate: {{movie.imdbRating}}</span>\n\n      <button [id]=\"movie.imdbID\" type=\"button\" class=\"edit_button_cover rounded-circle btn btn-dark\" (click)=\"openEditDialogMovieInfo(movie.imdbID)\">\n          <i class=\"fa fa-pencil\" aria-hidden=\"true\"></i>\n      </button>\n      <button [id]=\"movie.imdbID\" type=\"button\" class=\"delete_button_cover rounded-circle btn btn-dark\" (click)=\"openDeleteDialog(movie.imdbID)\">\n          <i class=\"fa fa-trash\" aria-hidden=\"true\"></i>\n      </button>\n    </li>\n\n  </ul>\n\n</div>\n\n\n"

/***/ }),

/***/ "./src/app/movies/movies.component.ts":
/*!********************************************!*\
  !*** ./src/app/movies/movies.component.ts ***!
  \********************************************/
/*! exports provided: MoviesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MoviesComponent", function() { return MoviesComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../shared/services/movie.service */ "./src/app/shared/services/movie.service.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "./node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _movie_dialog_delete_movie_dialog_delete_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../movie-dialog-delete/movie-dialog-delete.component */ "./src/app/movie-dialog-delete/movie-dialog-delete.component.ts");
/* harmony import */ var _movie_dialog_info_movie_dialog_info_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../movie-dialog-info/movie-dialog-info.component */ "./src/app/movie-dialog-info/movie-dialog-info.component.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MoviesComponent = /** @class */ (function () {
    /*********** END PROPERTIRS ****************/
    function MoviesComponent(movieDialogDelete, myMovieService, movieDialogInfo) {
        this.movieDialogDelete = movieDialogDelete;
        this.myMovieService = myMovieService;
        this.movieDialogInfo = movieDialogInfo;
        /*********** PROPERTIRS ****************/
        this.movies = this.myMovieService.movies;
        this.movies = this.myMovieService.movies;
    }
    MoviesComponent.prototype.ngOnInit = function () {
        this.myMovieService.initGetMovies('Batman'); // init the api request on start of app.
    };
    /**
      @function openEditDialogMovieInfo - open pop up window in edit mode. change state in service into 'edit'.
      set the edit obj into movieSeleceted property in service movie.
      @param valueSearch
      @returns void
    **/
    MoviesComponent.prototype.openEditDialogMovieInfo = function (movieId) {
        this.movieDialogDelete.closeAll();
        this.myMovieService.changeStateMovieInfo('edit');
        this.myMovieService.setSelectedMovieIntoObj(movieId);
        this.movieDialogInfo.open(_movie_dialog_info_movie_dialog_info_component__WEBPACK_IMPORTED_MODULE_4__["MovieDialogInfoComponent"], {
            height: '700px',
            width: '500px',
            disableClose: false,
        });
    };
    /**
      @function openDeleteDialog - open pop up window in delete mode.
      set the delete obj into movieSeleceted property in service movie.
      @param movieId
      @returns void
    **/
    MoviesComponent.prototype.openDeleteDialog = function (movieId) {
        this.movieDialogDelete.closeAll();
        this.myMovieService.setSelectedMovieIntoObj(movieId);
        this.movieDialogDelete.open(_movie_dialog_delete_movie_dialog_delete_component__WEBPACK_IMPORTED_MODULE_3__["MovieDialogDeleteComponent"], {
            height: '250px',
            width: '500px',
            disableClose: false,
        });
    };
    MoviesComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-movies',
            template: __webpack_require__(/*! ./movies.component.html */ "./src/app/movies/movies.component.html"),
            styles: [__webpack_require__(/*! ./movies.component.css */ "./src/app/movies/movies.component.css")]
        }),
        __metadata("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"], _shared_services_movie_service__WEBPACK_IMPORTED_MODULE_1__["MovieService"], _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
    ], MoviesComponent);
    return MoviesComponent;
}());



/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.css":
/*!*************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.css ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1{\r\n    position: relative;\r\n    font-size: 2em;\r\n    text-align: center;\r\n    margin-bottom:60px;\r\n    top: 100px;\r\n}\r\n\r\ndiv{\r\n     text-align: center;\r\n}\r\n\r\n.btn{\r\n    position: relative;\r\n    top: 130px;\r\n}"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.html":
/*!**************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.html ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div>\n  <h1>\n      The requested URL was not found on this server (click on \"HOME\" in up-right corner).\n  </h1>\n</div>\n"

/***/ }),

/***/ "./src/app/page-not-found/page-not-found.component.ts":
/*!************************************************************!*\
  !*** ./src/app/page-not-found/page-not-found.component.ts ***!
  \************************************************************/
/*! exports provided: PageNotFoundComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PageNotFoundComponent", function() { return PageNotFoundComponent; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var PageNotFoundComponent = /** @class */ (function () {
    function PageNotFoundComponent() {
    }
    PageNotFoundComponent.prototype.ngOnInit = function () {
    };
    PageNotFoundComponent = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"])({
            selector: 'app-page-not-found',
            template: __webpack_require__(/*! ./page-not-found.component.html */ "./src/app/page-not-found/page-not-found.component.html"),
            styles: [__webpack_require__(/*! ./page-not-found.component.css */ "./src/app/page-not-found/page-not-found.component.css")]
        }),
        __metadata("design:paramtypes", [])
    ], PageNotFoundComponent);
    return PageNotFoundComponent;
}());



/***/ }),

/***/ "./src/app/pipes/title.pipe.ts":
/*!*************************************!*\
  !*** ./src/app/pipes/title.pipe.ts ***!
  \*************************************/
/*! exports provided: SpecialPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpecialPipe", function() { return SpecialPipe; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};

var SpecialPipe = /** @class */ (function () {
    function SpecialPipe() {
    }
    /**
      @function transform - transform is function of PipeTransform class - take unique chars and remove
      it when pipe specialPipe is used.
      @param value
      @returns string
    **/
    SpecialPipe.prototype.transform = function (value) {
        return value.replace(/[!@#$%^&*]/g, '');
    };
    SpecialPipe = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Pipe"])({
            name: 'specialPipe'
        })
    ], SpecialPipe);
    return SpecialPipe;
}());



/***/ }),

/***/ "./src/app/shared/services/movie.service.ts":
/*!**************************************************!*\
  !*** ./src/app/shared/services/movie.service.ts ***!
  \**************************************************/
/*! exports provided: MovieService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MovieService", function() { return MovieService; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/common/http */ "./node_modules/@angular/common/fesm5/http.js");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (undefined && undefined.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var MovieService = /** @class */ (function () {
    /*********** END PROPERTIRS ****************/
    function MovieService(myHttpClient) {
        this.myHttpClient = myHttpClient;
        /*********** PROPERTIRS ****************/
        this.apiKeyValue = 'bc2f8f5a';
        this.movies = []; // movies array contain each movie obj.
        this.counterIds = 0; // counter for movie ID genrate.
        this.movieSeleceted = {}; // delete movie obj or edit movie obj.
        this.state = { position: 'add' };
    }
    /**
      @function initGetMovies - init do get request to the api movies and get all movies, according to the search
      param that send in filter, and get page 1.
      @param filter - at default i send 'Batman' but it can be change.
      @returns void
    **/
    MovieService.prototype.initGetMovies = function (filter) {
        var _this = this;
        this.myHttpClient.get("http://www.omdbapi.com/?s=" + filter + "&page=1&apikey=" + this.apiKeyValue)
            .subscribe(function (resp) {
            _this.initGetMovie(resp);
        });
    };
    /**
      @function initGetMovie - init do get request to the api movies for each movie in for loop, and set
      each of the movie obj in 'movies' array property.
      @param resp
      @returns void
    **/
    MovieService.prototype.initGetMovie = function (resp) {
        var _this = this;
        for (var i = 0; i < resp.Search.length; i++) {
            var imdbIDValue = resp.Search[i].imdbID;
            this.myHttpClient.get("http://www.omdbapi.com/?i=" + imdbIDValue + "&apikey=" + this.apiKeyValue)
                .subscribe(function (response) {
                _this.setObjDetailsInMovieArray(response);
            });
        }
    };
    /**
      @function setObjDetailsInMovieArray -  set obj details according to specification into new movie obj.
      set the new obj into 'movies' array property.
      @param item - each movie obj is item.
      @returns void
    **/
    MovieService.prototype.setObjDetailsInMovieArray = function (item) {
        var movieObj = {};
        movieObj['imdbID'] = item.imdbID;
        movieObj['Title'] = item.Title.toLowerCase();
        movieObj['Year'] = item.Year;
        movieObj['Runtime'] = item.Runtime;
        movieObj['Genre'] = item.Genre;
        movieObj['Poster'] = item.Poster;
        movieObj['Director'] = item.Director;
        movieObj['imdbRating'] = item.imdbRating;
        this.movies.push(movieObj);
    };
    /**
      @function addMovie - generate new movie id. set it into the new movie, and add the new movie
      obj into 'movies' array property.
      @param movieObj
      @returns void
    **/
    MovieService.prototype.addMovie = function (movieObj) {
        var newMovieIdValue = this.createNewMovieId();
        movieObj = this.setNewMovieIdInMovieObj(movieObj, newMovieIdValue);
        this.addNewMovieIntoCurrMovieArr(movieObj);
    };
    /**
      @function createNewMovieId - generate new movie ID using counter to make it unique and return it.
      @returns string
    **/
    MovieService.prototype.createNewMovieId = function () {
        var movieString = 'cc';
        this.counterIds++;
        var newMovieIdValue = movieString + this.counterIds;
        return newMovieIdValue;
    };
    /**
      @function setNewMovieIdInMovieObj - set the ID into new movie obj and return it.
      @param movieObj
      @param newMovieIdValue
      @returns Movie
    **/
    MovieService.prototype.setNewMovieIdInMovieObj = function (movieObj, newMovieIdValue) {
        movieObj['imdbID'] = newMovieIdValue;
        return movieObj;
    };
    /**
      @function addNewMovieIntoCurrMovieArr - add new movie into 'movies' array property.
      @param movieObj
      @returns void
    **/
    MovieService.prototype.addNewMovieIntoCurrMovieArr = function (movieObj) {
        this.movies.push(movieObj);
    };
    /**
      @function deleteMovie - delete chosen movie from the array using movie ID becouse
      its unique and will be only one in each movie obj.
      @param movieId
      @returns void
    **/
    MovieService.prototype.deleteMovie = function (movieId) {
        for (var i = 0; i < this.movies.length; i++) {
            if (this.movies[i].imdbID === movieId) {
                this.movies.splice(i, 1);
            }
        }
    };
    /**
      @function editMovie - do for loop on 'movies' array property and edit new changes into
      the same movie. do the search also with movie ID becouse its unique.
      @param movieId
      @returns void
    **/
    MovieService.prototype.editMovie = function (movieObj) {
        for (var i = 0; i < this.movies.length; i++) {
            if (this.movies[i].imdbID === movieObj.imdbID) {
                this.movies[i] = movieObj;
                break;
            }
        }
    };
    /**
      @function isMovieTitleExist - validtaion check if the movie title already in 'movies' array property
      return true, else false. search do by title.
      @param valueSearch
      @returns boolean
    **/
    MovieService.prototype.isMovieTitleExist = function (valueSearch) {
        for (var i = 0; i < this.movies.length; i++) {
            if (this.movies[i].Title === valueSearch) {
                return true;
            }
        }
        return false;
    };
    /**
      @function setSelectedMovieIntoObj - set selected movie into 'movieSeleceted' obj property.
      this will happened in edit movie or delete movie case.
      @param movieId
      @returns void
    **/
    MovieService.prototype.setSelectedMovieIntoObj = function (movieId) {
        for (var i = 0; i < this.movies.length; i++) {
            if (this.movies[i].imdbID === movieId) {
                this.movieSeleceted = this.movies[i];
                break;
            }
        }
    };
    /**
      @function changeStateMovieInfo - change the state of the movie AddForm in movie-dialog-info compponent
      to edit mode or add mode according to positionValue that been send to the function. the value is
      send when there is clicked on edit button -> 'edit' or if there is clicked on add button -> 'add'.
      @param positionValue - 'edit' or 'add;
      @returns void
    **/
    MovieService.prototype.changeStateMovieInfo = function (positionValue) {
        this.state.position = positionValue;
    };
    MovieService = __decorate([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"])(),
        __metadata("design:paramtypes", [_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]])
    ], MovieService);
    return MovieService;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
var environment = {
    production: false
};
/*
 * In development mode, for easier debugging, you can ignore zone related error
 * stack frames such as `zone.run`/`zoneDelegate.invokeTask` by importing the
 * below file. Don't forget to comment it out in production mode
 * because it will have a performance impact when errors are thrown
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "./node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "./node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Jhon_Bryce\Node_projs\Herolo_Cinema\client\src\main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map