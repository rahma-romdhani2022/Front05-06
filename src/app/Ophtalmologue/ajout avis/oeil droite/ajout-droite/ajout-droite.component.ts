import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2' ; 
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
  selector: 'app-ajout-droite',
  templateUrl: './ajout-droite.component.html',
  styleUrls: ['./ajout-droite.component.css']
})
export class AjoutDroiteComponent implements OnInit {
  consultationAjouter : number =0 ; 
 maladieDroiteRecupere : string =null ; 
 droiteComm : string ; 
 variable  : string ; 
 graviteDroiteRecupere : string =null ; 
 commDroiteRecupere : string =null ; 
avisExpertAjouter : any ; 
  formGroup1: FormGroup;
  formGroup2: FormGroup;
   isLinear = false;
  name  = '';
imagePath :string=null;
user :any={};
expert : any={};
retrieveResponse: any={};
base64Data: any;
test : string = "rahma" ; 
nom_Expert : string="" ; 
id : number ; 
idConsultation:number ;
consultation: any ;
AutoDetection : any={} ; 
existenceAvisExpertEnGeneral : number ; 
existenceAvisExpertDroite: number ; 
existenceAvisExpertGauche : number ; 
autoDetection : any ; 
images: any[] = [];
ress : any ; 
SainTest : boolean=false;
allDemandes : any ; 
demandeD : number ; 
demandeG : number ; 
lengthAllDemande : number ;  
maladieDroiteDeAutoDetection : string ; 
graviteDroiteDeAutodetection : number; 
testMaladieDroite : string ; 
testGraviteDroite : number ; 
testMaladieGauche :string ;
testGraviteGauche : number ; 
selectedValue : any ; 
boutonValider : number =0 ; 
testMaladie : number ; 
testGravite : number ; 
idExpert : number ; 
image1Droitee : string ; 
image2Droitee:string ; 
image3Droitee:string ; 
image4Droitee:string ;
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
lang: Lang[]=[
  {id :"fr" , name :"Francais"} , 
  {id :"en" , name :"English"} , ]
 
/*gravite = document.getElementById('willay');
 selectedValue = null;
 gravite.addEventListener("change", function() {
this.selectedValue = this.value;
 });*/
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
  if(this.consultation.image1_Droite !== null){
    this.image1Droitee="http://localhost:8281/consultation/imageDroite1/"+this.idConsultation; 
  }
  if(this.consultation.image2_Droite !== null){
    this.image2Droitee="http://localhost:8281/consultation/imageDroite2/"+this.idConsultation; 
  }
  if(this.consultation.image3_Droite !== null){
    this.image3Droitee="http://localhost:8281/consultation/imageDroite3/"+this.idConsultation;
  }
  if(this.consultation.image4_Droite !== null){
    this.image4Droitee="http://localhost:8281/consultation/imageDroite4/"+this.idConsultation;
  }
  if(this.consultation.autoDetection.maladieDroite!== "Sain"){
    this.SainTest=true ;
  }
  this.AutoDetection = this.consultation.autoDetection ; 
  this.demandeD = this.consultation.demandeAvisD ; 
  this.demandeG = this.consultation.demandeAvisG  
  //test maladie et gravite 
  if(  this.AutoDetection.graviteDroite === 0) {
    this.testGravite = 0 ; 
  }
  else{
    this.testGravite = 1; 
  }
  if(  this.AutoDetection.MaladieDroite === null) {
    this.testMaladie = 0 ; 
  }
  else{
    this.testMaladie = 1; 
  }
  //// test les lien 
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
addAvisDroite(value){
if(value.commentaireDroite === ""){
  this.commRes =null ; 
}
else{
  this.commRes =value.commentaireDroite ; 
}
  value ={
    "maladieDroite" :value.maladieDroite ,
    "graviteDroite" :value.graviteDroite ,
    "commentaireDroite": this.commRes} 
if(this.consultation.autoDetection.avisExpert === null){
  this.serviceAvis.addAvisExpert(this.id).subscribe(parms=>{
  this.avisExpertAjouter=parms
  this.serviceAvis.updateAvisExpertDroiteQuiCreerAInstant(this.avisExpertAjouter.id , value).subscribe(parms=>{
  this.autoDetection=this.consultation.autoDetection; 
  this.serviceAvis.putAvisExpert(this.autoDetection.id , this.idConsultation , this.avisExpertAjouter.id).subscribe(res=>{
   this.boutonValider =1 ; 
    this.ngOnInit() ; 
    this.getAllDemandes() ; 
    this.ngOnInit() ; 
    this.getAllDemandes() ; console.log("vale de form " , value)
    Swal.fire({
      icon: 'success',
      title: ' Votre avis a bien été ajouté  ',
      showClass: {
        popup: 'animate__animated animate__fadeInDown' },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
    })
    this.ngOnInit() ; 
this.consultationAjouter=1 ; 
    });
   }

, err=>{
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
})
}
else{
  this.serviceAvis.updateAvisExpertDroiteQuiCreerAInstant(this.consultation.autoDetection.avisExpert.id, value).subscribe(parms=>{
    this.autoDetection=this.consultation.autoDetection; 
    this.serviceAvis.putAvisExpert(this.consultation.autoDetection.id , this.idConsultation , this.consultation.autoDetection.avisExpert.id).subscribe(res=>{
      this.boutonValider =1 ; 
      this.ngOnInit() ; 
      this.getAllDemandes() ;
      Swal.fire({
        icon: 'success',
        title: 'Votre avis a bien été ajouté',
        showClass: {
          popup: 'animate__animated animate__fadeInDown' },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      })
      this.ngOnInit() ; 
      this.getAllDemandes() ; 
      this.consultationAjouter=1 ; 

      }
  , err=>{
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

   this.ngOnInit() ; 
  this.getAllDemandes() ; console.log("vale de form " , value)
  Swal.fire({
    icon: 'success',
    title: 'votre avis a bien  ajouter  ',
    showClass: {
      popup: 'animate__animated animate__fadeInDown' },
    hideClass: {
      popup: 'animate__animated animate__fadeOutUp'
    }
  })
  /*const Toast = Swal.mixin({
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
  this.ngOnInit() ; 
//this.router.navigate(['/demande_droite/'+this.idConsultation]) ; 
});
}
}
getAllDemandes(){
    this.serviceAvis.getAllDemandesLast().subscribe(data=>{
      this.allDemandes=data ; 
      this.serviceAvis.lengthDemandePrincipale= this.allDemandes.length ; 
      console.log("tessssssssssst", this.allDemandes)
      console.log("lengrhhh",    this.serviceAvis.lengthDemandePrincipale) })
}
 logout() {
  localStorage.removeItem('name');
  localStorage.removeItem('token');
  this.service.islogin = false;
this.router.navigate(['']);
    ///location.reload();
}
reouterrr(){
  this.router.navigate(['/demande_droite/'+this.idConsultation])
}

/* fonction lier a chechkbox
handleSelected($event) {
  if ($event.target.checked === true) {
    var gravite = document.getElementById('graviteDroite')as HTMLInputElement;
    var maladie = document.getElementById('maladieDroite')as HTMLInputElement;
        gravite.disabled = true;
        maladie.disabled = true;
  }
  else{
    var gravite = document.getElementById('graviteDroite')as HTMLInputElement;
    var maladie = document.getElementById('maladieDroite')as HTMLInputElement;
        gravite.disabled = false;
        maladie.disabled = false;
  }
}*/
testSain() {
  
  var gravite = document.getElementById('graviteDroite')as HTMLInputElement;
  var maladie = document.getElementById('maladieDroite')as HTMLInputElement;
      gravite.disabled = true;
      maladie.disabled = true;
      this.variable="sain"
}
}