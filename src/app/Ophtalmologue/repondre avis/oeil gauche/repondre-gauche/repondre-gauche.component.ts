import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2' ; 
import * as $ from 'jquery';
import { ActivatedRoute, Router } from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { UserServiceService } from 'src/app/services/user-service.service';
import { AvisServiceService } from 'src/app/services/avis.service';
import { Consultation } from 'src/app/modele/consultation';
import { PatientService } from 'src/app/services/patient.service';
export interface Lang{
  id : string ;
  name : string ; 
}
@Component({
  selector: 'app-repondre-gauche',
  templateUrl: './repondre-gauche.component.html',
  styleUrls: ['./repondre-gauche.component.css']
})
export class RepondreGaucheComponent implements OnInit {
  testButtonAjoutEnGeneralDroite :boolean =false ; 
  hide = true;
  formGroup1: FormGroup;
  formGroup2: FormGroup;
   isLinear = false;
  name  = '';
imagePath :string=null;
user :any={};
expert : any={};
retrieveResponse: any={};
base64Data: any;
image5 : any ;
image4 : any ; 
image3 : any ; 
image2 : any ; 
image1  : any ; 
test : string = "rahma" ; 
nom_Expert : string="" ; 
idConsultation : any ; 
id : number ;
consultation: any ;
AutoDetection : any={}
existenceAvisExpertEnGeneral : number =2 ;
existenceAvisExpertGauche  : number =2;
existenceAvisExpertDroite: number =2 ; 
testButtonAjoutEnGeneral : boolean=false ; 
demandeD : number ; 
demandeG : number ; 
allDemandes : any ; 
lengthAllDemande : number ; 
maladieGaucheDeAutoDetection : string ;
graviteGaucheDeAutodetection : number ; 
nomDePatient : string ; 
genderPatient : string ;
agePatient : number ;  
antecedantsPatiens : string ;
split : any ; 
splitRes :any[] = [];
SainTest :boolean =false; 
testTabAnti : number  ; 
testMaladieGauche : string ; testGraviteGauche : string ; 
testMaladieGaucheAjout : number ;
/************ */
images: any[] = [];
  idAutoDetection: any
  retrieveResponse2: any
  imageee:string = null;
  imagePath1: any; //string=null;
  base64Data2: any;
  base64 = '';
  testMaladieDroite : string ; 
  testGraviteDroite : number ; 
  image1Gauchee : string ; 
  image2Gauchee : string ;
  image3Gauchee : string ;
  image4Gauchee : string ;
  constructor(private _formBuilder: FormBuilder , private service : UserServiceService , private router : Router ,
     private ar : ActivatedRoute , private serviceAvis : AvisServiceService , private servicePatient :PatientService)
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
  
lang: Lang[]=[
  {id :"fr" , name :"Francais"} , 
  {id :"en" , name :"English"} , ]
  ngOnInit() { 
    this.getConsultation(); 
    this.serviceAvis.lengthDemandePrincipale ; 
    this.getAllDemandes(); 
    this.ar.paramMap.subscribe((x)=>{
    this.idConsultation =+ x.get('idConsultation'); 
    localStorage.setItem("idConsult", this.idConsultation) }) ; 
   console.log(  this.idConsultation   , "iddddddddddddddddddd")
    this.id=parseInt(localStorage.getItem("id")) ; 
    this.service.getData(parseInt(localStorage.getItem('id'))).subscribe(data=>{
      this.user=data
            if(this.user.image ==null){
              this.imagePath="./assets/imagesD/faces/user1.png"
            }
            else{
              this.imagePath=this.imagePath ; 
            
              this.imagePath="http://localhost:8281/expert/imageExpert/"+this.id ; }
    
  }) ;
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
getImage(){
  this.service.getImageConsultation(parseInt(localStorage.getItem('idConsult'))).subscribe(data=>{
    this.imageee=data ; 
  })
}
  getConsultation(){
    this.serviceAvis.getConsultationID(parseInt(localStorage.getItem('idConsult'))).subscribe((params => {
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
    if(this.consultation.autoDetection.maladieGauche !== "Sain"){
      this.SainTest=true
    }
    this.servicePatient.getAgePatient(this.consultation.patient.id).subscribe(response=>{
      this.agePatient = response ; 
    })
   
  

    this.AutoDetection = this.consultation.autoDetection 
    this.demandeD=this.consultation.demandeAvisD ; 
    this.demandeG=this.consultation.demandeAvisG ; 
    this.AutoDetection = this.consultation.autoDetection  ; 
    if( this.AutoDetection.avisExpert === null){
      this.existenceAvisExpertEnGeneral = 0 
      this.existenceAvisExpertDroite = 0 ;
      this.existenceAvisExpertGauche = 0 ; 
}
else {
if(this.AutoDetection.avisExpert.maladieGauche === null){
   this.existenceAvisExpertDroite = 1;
   this.existenceAvisExpertGauche = 0}
 
else{
   this.existenceAvisExpertDroite = 0 ;  
   this.existenceAvisExpertGauche =  1 }

    
  
}
    this.maladieGaucheDeAutoDetection=this.consultation.autoDetection.maladieGauche ; 
    this.graviteGaucheDeAutodetection = this.consultation.autoDetection.graviteGauche ; 
   console.log("maladie  droite " , this.maladieGaucheDeAutoDetection , "gravite de maladie droite "  , this.graviteGaucheDeAutodetection)
    this.nomDePatient=this.consultation.patient.username ; 
    this.genderPatient=this.consultation.patient.gender ; 
    this.antecedantsPatiens=this.consultation.patient.antecedant ; 
    console.log("rahmaaa anteceadantes ",this.antecedantsPatiens )
    if(this.antecedantsPatiens.length=== 1){
      this.splitRes[0]=this.antecedantsPatiens;
      this.testTabAnti=1;
    }
    this.split = this.antecedantsPatiens.split(",");
      for (let i=0; i<this.split.length; i++){
              this.splitRes[i]=this.split[i] ; 
              this.testTabAnti=i++;
    console.log("antecedantes ",this.split[i]);
      }
      console.log( "resultatysis"  , this.splitRes)

    if(this.consultation.autoDetection.avisExpert === null){
  
      this.testMaladieGauche = null ; 
      this.testGraviteGauche =  null ; 
       this.testMaladieDroite= null ; 
       this.testGraviteDroite =  null ; 
    }
    else {
        this.testMaladieGauche = this.consultation.autoDetection.avisExpert.maladieGauche ; 
        this.testGraviteGauche = this.consultation.autoDetection.avisExpert.graviteGauche ; 
        this.testMaladieDroite= this.consultation.autoDetection.avisExpert.maladieDroite ; 
        this.testGraviteDroite = this.consultation.autoDetection.avisExpert.graviteDroite ;
    }
    console.log("droite demande  : " , this.demandeD , "Gauche demande " , this.demandeG)
        console.log("consultationnnnnnnn " , this.consultation)
   
  
  
}));
  }  getAllDemandes(){
    this.serviceAvis.getAllDemandesLast().subscribe(data=>{
      this.allDemandes=data ; 
      this.serviceAvis.lengthDemandePrincipale=this.allDemandes.length ; 
      console.log("tessssssssssst", this.allDemandes)
      console.log("lengrhhh", this.lengthAllDemande) })
  } 
  disabledButton(){
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-right',
      iconColor: 'white',
      background:"#87adbd",
      width:'400px',
      customClass: {
        popup: 'colored-toast'
      },
      showConfirmButton: false,
      timer: 1500,
      timerProgressBar: true
    })


    Toast.fire({
      icon: 'info',
      title: 'cette demande admet un avis déjà'
   
    })
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