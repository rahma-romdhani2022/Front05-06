import { Component } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { Router } from '@angular/router';
import * as $ from 'jquery';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'test1TP2';
  constructor( private translate: TranslateService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('fr');

     // the lang to use, if the lang isn't available, it will use the current loader to get them
    //translate.use('fr');
}
switchLanguage( language : string ){
  this.translate.use(language)
}
 
}