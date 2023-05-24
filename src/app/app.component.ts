import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'e-commerce-bo-angular';

  constructor(
    private translateService: TranslateService,
    private storage: StorageService
  ) {
    const choosenLanguage: string = this.storage.getStorage('language');
    if (choosenLanguage) {
      this.translateService.use(choosenLanguage);
    } else {
      this.storage.setStorage('language', 'it');
      this.translateService.use('it');
    }
  }
}
