import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService } from '../app/services/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  loggedIn: boolean;
  Language_Layout: string = "ltr";

  constructor(private translate: TranslateService, private authenticationService: AuthenticationService) {}

  ngOnInit() {
    if (!localStorage.getItem("language")) {
      localStorage.setItem("language", "en");
    }
    localStorage.getItem("language") == "en" ? this.Language_Layout = "ltr" : this.Language_Layout = "rtl";
    this.translate.setDefaultLang(localStorage.getItem("language"));
    this.translate.currentLang = localStorage.getItem("language");
    if (localStorage.getItem("currentUser")) {
      this.authenticationService.isLoggedIn = true;
    }
  }

  switchLanguage() {
    if (this.translate.currentLang === "ar") {
      this.translate.use("en");
      localStorage.setItem("language", "en");
      this.Language_Layout = "ltr";
    }
    else {
      this.translate.use("ar");
      localStorage.setItem("language", "ar");
      this.Language_Layout = "rtl";
    }

  }
}
