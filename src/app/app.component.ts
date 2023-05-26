import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './services/storage/storage.service';
import { AuthService } from './services/auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'e-commerce-bo-angular';

  constructor(
    private translateService: TranslateService,
    private storage: StorageService,
    private authService: AuthService
  ) {
    const token: string | undefined | null = storage.getStorage('token');
    const permissions: string[] | undefined | null =
      storage.getStorage('permissions');

    console.log('Token in localstorage: ', token);
    console.log('Permissions in localstorage: ', permissions);

    if (token && permissions && permissions.length > 0) {
      this.authService.isLogged = true;
      this.authService.token.next(token);
      this.authService.userRole = permissions;
    }

    const choosenLanguage: string = this.storage.getStorage('language');
    if (choosenLanguage) {
      this.translateService.use(choosenLanguage);
    } else {
      this.storage.setStorage('language', 'it');
      this.translateService.use('it');
    }
  }
}
