import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import * as $ from 'jquery';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AvisServiceService } from 'src/app/services/avis.service';
export interface Maladie{
  id : number ; 
  nom : string ; 
}
export interface Niveau{
  id : number ; 
  niv : number ; 
}
export interface Lang{
  id : string ;
  name : string ; 
}
@Component({
  selector: 'app-ajout-gauche',
  templateUrl: './ajout-gauche.component.html',
  styleUrls: ['./ajout-gauche.component.css']
})
export class AjoutGaucheComponent implements OnInit {
  gaucheComm : string ; 
formGroup1: FormGroup;
formGroup2: FormGroup;
isLinear = false;
name  = '';
imagePath :string=null;
imagePathhh : string ; 
user :any={};
expert : any={};
retrieveResponse: any={};
base64Data: any;
test : string = "rahma" ; 
nom_Expert : string="" ; 
id : number ; 
idConsultation:number ;
consultation: any ;
demandeD : number ; 
demandeG : number ; 
images: any[] = [];
ress : any ; 
avisExpertAjouter : any ;
autoDetection: any ;
allDemandes : any ; 
lengthAllDemande: number ; 
maladieGaucheDeAutoDetection : string ; 
graviteGaucheDeAutodetection : number
testMaladieDroite : string ; 
testMaladieGauche : string ; 
testGraviteDroite : number ;
testGraviteGauche : number ; 
boutonValider : number =0 ; 
AutoDetection : any ; 
testGravite : number =0 ; 
testMaladie : number =0; 
existenceAvisExpertEnGeneral : number ; 
existenceAvisExpertDroite: number ; 
existenceAvisExpertGauche : number; 
idExpert : number ; 
SainTest : boolean=false ; 
image1Gauchee : string ; 
image2Gauchee : string ; 
image3Gauchee : string ;
 image4Gauchee : string ; 
 commRes : string ; 
maladies : Maladie[]=[
  {id :1, nom:"Sain"},
  {id :2, nom:"Le trou maculaire"},
  {id :3, nom:"Le décollement de rétine"},
  {id :4, nom:"rétinopathie diabétique"},
  {id :5, nom:"DMLA"},
];
niveaux : Niveau[]=[
  {id :1, niv:1},
  {id :2, niv:2},
  {id :3, niv:3},
];
  constructor(private _formBuilder: FormBuilder , private service : UserServiceService ,
     private router : Router , private ar : ActivatedRoute , private serviceAvis : AvisServiceService)
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
  ngOnInit() {
    this.serviceAvis.lengthDemandePrincipale ; 
    this.getAllDemandes(); 
    this.ar.paramMap.subscribe((x)=>{
      this.idConsultation =+ x.get('idConsultation');  }) ; 
   
      console.log( "idd consultationnnn:",this.idConsultation)
     this.getConsultation();
    this.id=parseInt(localStorage.getItem("id")) ; 
    this.service.getData(parseInt(localStorage.getItem('id'))).subscribe(data=>{
      this.user=data
      this.idExpert=this.user.id ; 
            if(this.user.image ==null){
              this.imagePath="./assets/imagesD/faces/user1.png"
            }
            else{
              this.imagePath="http://localhost:8281/expert/imageExpert/"+this.idExpert ;}
    
  }) ;
    // mtaa dropdown 
    $( "#menu" ).on( "click", function()
    {
      $( "#menu23" ).fadeToggle( "fast" );
    });
    this.formGroup1 = this._formBuilder.group({
      firstCtrl: ['', Validators.required],
    });
    this.formGroup2 = this._formBuilder.group({
      secondCtrl: ['', Validators.required],
    });
  }
  confimerOperation(){
    Swal.fire({
     
      icon: 'success',
      title: 'Votre avis a bien été ajouté',
      showConfirmButton: false,
      timer: 2000
    })
    this.router.navigate(['/accueil'])
  }
  getConsultation(){
    this.serviceAvis.getConsultationID( this.idConsultation).subscribe((params => {
    this.consultation = params;
    if(this.consultation.image1_Gauche !== null){
      this.image1Gauchee="http://localhost:8281/consultation/imageGauche1/"+this.idConsultation; 
    }
    if(this.consultation.image2_Gauche !== null){
      this.image2Gauchee="http://localhost:8281/consultation/imageGauche2/"+this.idConsultation; 
    }
    if(this.consultation.image3_Gauche !== null){
      this.image3Gauchee="http://localhost:8281/consultation/imageGauche3/"+this.idConsultation;
    }
    if(this.consultation.image4_Gauche !== null){
      this.image4Gauchee="http://localhost:8281/consultation/imageGauche4/"+this.idConsultation;
    }
    if(this.consultation.autoDetection.maladieGauche!== "Sain"){
      this.SainTest=true ;
    }
    this.demandeD = this.consultation.demandeAvisD ; 
    this.demandeG = this.consultation.demandeAvisG ; 
    this.AutoDetection = this.consultation.autoDetection ;
    ///// test gravite et maladie  
  if(  this.AutoDetection.graviteGauche === 0) {
    this.testGravite = 0 ; 
  }
  else{
    this.testGravite = 1; 
  }
  if(  this.AutoDetection.MaladieGauche === null) {
    this.testMaladie = 0 ; 
  }
  else{
    this.testMaladie = 1; 
  }
  // test  activation des lien 
  if( this.AutoDetection.avisExpert === null){
    this.existenceAvisExpertEnGeneral = 0 
    this.existenceAvisExpertDroite = 2 ;
    this.existenceAvisExpertGauche = 2 ; 
}
else {
if(this.AutoDetection.avisExpert.maladieDroite === null){
    this.existenceAvisExpertDroite = 0;
    this.existenceAvisExpertGauche =  1}
  
else{
    this.existenceAvisExpertDroite = 1 ; } 
  //  this.existenceAvisExpertGauche =  0 

    if(this.AutoDetection.avisExpert.maladieGauche === null){
      this.existenceAvisExpertDroite = 1;
      this.existenceAvisExpertGauche =  0}
    
  else{
    //  this.existenceAvisExpertDroite = 0 ;  
      this.existenceAvisExpertGauche =  1 }

}
     
   

   

  
}));
  }
  addAvisGauche(value){
    
    if(value.commentaireGauche === ""){
      this.commRes =null ; 
    }
    else{
      this.commRes =value.commentaireGauche ; 
    }
    value ={
      "maladieGauche" :value.maladieGauche ,
      "graviteGauche" :value.graviteGauche ,
      "commentaireGauche": this.commRes } 
if(this.consultation.autoDetection.avisExpert === null){
  this.serviceAvis.addAvisExpert(this.id).subscribe(parms=>{
    this.avisExpertAjouter=parms
    this.getAllDemandes() ; 
    this.serviceAvis.updateAvisExpertGaucheQuiCreerAInstant(this.avisExpertAjouter.id , value).subscribe(parms=>{
      this.autoDetection=this.consultation.autoDetection; 
      this.getAllDemandes() ; 
    this.serviceAvis.putAvisExpert(this.autoDetection.id , this.idConsultation , this.avisExpertAjouter.id).subscribe(res=>{
      this.getAllDemandes() ; 
      this.boutonValider =1 ; 
      Swal.fire({
        icon: 'success',
        title: 'votre avis a bien  ajouter  ',
        showClass: {
          popup: 'animate__animated animate__fadeInDown' },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      }); });
  } , err=>{
  console.log(err);
  const Toast = Swal.mixin({
    toast: true,
    position: 'top-right',
    background :'#f8bb86',
    iconColor: 'white',
    customClass: {
      popup: 'colored-toast'
    },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true
  })
 Toast.fire({
    icon: 'warning',
    title: 'il yaa probléme !!!!'
  }) 
  })
  
}
else{
  this.serviceAvis.updateAvisExpertGaucheQuiCreerAInstant(this.consultation.autoDetection.avisExpert.id , value).subscribe(parms=>{
    this.autoDetection=this.consultation.autoDetection.id ;  
    this.getAllDemandes() ; 
    this.serviceAvis.putAvisExpert(this.autoDetection , this.idConsultation , this.consultation.autoDetection.avisExpert.id).subscribe(res=>{
    this.boutonValider =1 ; 
    Swal.fire({
      icon: 'success',
      title: 'Votre avis a bien été ajouté  ',
      showClass: {
        popup: 'animate__animated animate__fadeInDown' },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
   /*  this.getAllDemandes() ; 
   const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      background:"#a5dc86 ",
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })
     Toast.fire({
      icon: 'success',
      title: 'Votre avis bien ajouté '
    })*/
    }); } , err=>{
console.log(err);
const Toast = Swal.mixin({
  toast: true,
  position: 'top-right',
  background :'#f8bb86',
  iconColor: 'white',
  customClass: {
    popup: 'colored-toast'
  },
  showConfirmButton: false,
  timer: 1500,
  timerProgressBar: true
})
Toast.fire({
  icon: 'warning',
  title: 'il yaa probléme !!!!'
})
});
}
 this.ngOnInit() ; 
this.getAllDemandes() ; 

Swal.fire({
  icon: 'success',
  title: 'Votre avis a bien été ajouté  ',
  showClass: {
    popup: 'animate__animated animate__fadeInDown' },
  hideClass: {
    popup: 'animate__animated animate__fadeOutUp'
  }
})
this.ngOnInit() ; 
//this.router.navigate(['/demande_gauche/'+this.idConsultation]) ; 
}

getAllDemandes(){
    /*this.avisService.getAllDemandes().subscribe(data=>{
    this.allDemandes=data ; 
    this.lengthAllDemande=this.allDemandes.length ; 
    console.log("tessssssssssst", this.allDemandes)
    console.log("lengrhhh", this.lengthAllDemande)
    })*/
    this.serviceAvis.getAllDemandesLast().subscribe(data=>{
      this.allDemandes=data ; 
      this.serviceAvis.lengthDemandePrincipale=this.allDemandes.length ; 
      console.log("tessssssssssst", this.allDemandes)
      console.log("lengrhhh", this.serviceAvis.lengthDemandePrincipale) })
}
   logout() {
    localStorage.removeItem('name');
    localStorage.removeItem('token');
    this.service.islogin = false;
  this.router.navigate(['']);
      ///location.reload();
  }

  reouterrr(){
    this.router.navigate(['/demande_gauche/'+this.idConsultation])
  }
}