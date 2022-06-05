import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as $ from 'jquery';
import { AvisServiceService } from 'src/app/services/avis.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import {TranslateService} from '@ngx-translate/core';
export interface Lang{
  id : string ;
  name : string ; 
}

@Component({
  selector: 'app-accueil-ophtalmologue',
  templateUrl: './accueil-ophtalmologue.component.html',
  styleUrls: ['./accueil-ophtalmologue.component.css']
})

export class AccueilOphtalmologueComponent implements OnInit {
  name  = '';
  nomPrenomExpert : string ; 
imagePath :string=null;
user :any={};
expert : any;

retrieveResponse: any={};
base64Data: any;
test : string = "rahma" ; 
nom_Expert : string="" ; 
id : number ;
resultats : any[]
allDemandes :any[]
lengthAllDemande : number ; 
testDateTime : string  ; 
language : string ; 
idExpert : number ; 
  constructor(private service : UserServiceService , private router : Router , private ar : ActivatedRoute
    , private avisService : AvisServiceService , private translate: TranslateService)
  {     translate.setDefaultLang('fr');
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }

  


lang: Lang[]=[
  {id :"fr" , name :"Francais"} , 
  {id :"en" , name :"English"} , ]
 
 

  ngOnInit() {
 
    this.avisService.lengthDemandePrincipale   ; 
    this.getAllDemandes();
    this.service.getData(parseInt(localStorage.getItem('id'))).subscribe(data=>{
      this.user=data
      this.idExpert=this.user.id ; 
      this.nomPrenomExpert = this.user.nomPrenom ; 
            if(this.user.image ==null){
              this.imagePath="./assets/imagesD/faces/user1.png"
            }
            else{
              this.imagePath="http://localhost:8281/expert/imageExpert/"+this.idExpert ; }
    
  }) ;
 //this.get();
    $( "#menu" ).on( "click", function()
{
  $( "#menu23" ).fadeToggle( "fast" );
});
console.log(localStorage.getItem("id"))
console.log(localStorage.getItem("name"))
console.log(localStorage.getItem("email"))
console.log(localStorage.getItem("token"))
this.id=parseInt(localStorage.getItem("id")) ; 
  }
  get(){
    this.avisService.getAllConsultations().subscribe(data=>{
      this.resultats=data ;
      //if()
  }) ; 
  }
  getAllDemandes(){
    /*this.avisService.getAllDemandes().subscribe(data=>{
    this.allDemandes=data ; 
    this.lengthAllDemande=this.allDemandes.length ; 
    console.log("tessssssssssst", this.allDemandes)
    console.log("lengrhhh", this.lengthAllDemande)
    })*/
    this.avisService.getAllDemandesLast().subscribe(data=>{
      this.allDemandes=data ; 
      this.avisService.lengthDemandePrincipale =this.allDemandes.length ; 
      console.log("tessssssssssst", this.allDemandes)
     })
  }
  onCheckboxChangeLanguage(event : any){
    console.log( "language selected is ", event.target.value)
    localStorage.setItem('lang', event.target.value);  
    
  }
  
  logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.service.islogin = false;
    this.router.navigate(['']);
    window.localStorage.clear();
      //location.reload();
  }

}
