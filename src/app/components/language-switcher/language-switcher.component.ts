import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-language-switcher',
  templateUrl: './language-switcher.component.html',
  styleUrls: ['./language-switcher.component.css'],
})
export class LanguageSwitcherComponent {
  showMenu: boolean = false;
  selectedLanguage: string;

  constructor(private translateService: TranslateService) {
    this.selectedLanguage = this.translateService.currentLang;
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  changeLanguage(e: Event) {
    const language: any = (e.target as HTMLImageElement).dataset['language'];
    this.translateService.use(language);
    this.selectedLanguage = language;
    this.toggleMenu();
  }
}
