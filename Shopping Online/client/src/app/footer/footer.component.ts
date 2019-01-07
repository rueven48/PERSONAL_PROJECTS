import { Component } from '@angular/core';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: []
})
export class FooterComponent {

  /*********** PROPERTIRS ****************/

  adminName = 'Rueven Cohen - full stack';
  currentYear: number = (new Date()).getFullYear();

  /*********** END PROPERTIRS ****************/
}
