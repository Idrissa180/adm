import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslateConfigService {

  currentLang: string;

  constructor(
    private translate: TranslateService,
  ) {
    this.currentLang = "fr";
  }

  getDefaultLanguage(){
    if (this.currentLang) {
      this.translate.setDefaultLang(this.currentLang);
    } else {
      const lang = this.translate.getBrowserLang()
      window.localStorage.setItem('lang', lang || "fr");
      const current = this.translate.getBrowserLang();
      this.currentLang = current || "fr";
      this.translate.setDefaultLang(this.currentLang);
    }
    return this.currentLang;
  }

  setLanguage(setLang: string) {
    this.translate.use(setLang);
    localStorage.setItem('lang', setLang);
  }

  getCurrentLang() {
    return localStorage.getItem('lang');
  }

}
