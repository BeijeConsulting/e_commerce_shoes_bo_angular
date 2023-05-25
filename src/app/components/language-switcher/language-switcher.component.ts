import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
})
export class LanguageSwitcherComponent {
  showMenu: boolean = false;
  selectedLanguage: string;

  constructor(
    private translateService: TranslateService,
    private storage: StorageService
  ) {
    this.selectedLanguage = this.translateService.currentLang;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  changeLanguage(e: Event) {
    const language: string | undefined = (e.target as HTMLImageElement).dataset[
      'language'
    ];
    if (!language) return;
    this.translateService.use(language);
    this.selectedLanguage = language;
    this.storage.setStorage('language', language);
    this.toggleMenu();
  }
}
