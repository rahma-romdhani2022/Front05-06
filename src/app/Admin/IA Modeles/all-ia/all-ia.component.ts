import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { IAModelService } from 'src/app/services/IAModel.service';
import Swal from 'sweetalert2/dist/sweetalert2.js'

export interface IA_Model {
  id: number;
  nom:string ;
  date_ajout:string;
  date_debut:string;
  date_fin: string;
}
@Component({
  selector: 'app-all-ia',
  templateUrl: './all-ia.component.html',
  styleUrls: ['./all-ia.component.css']
})
export class AllIAComponent implements OnInit {
  nbrModeles : number ; 
  test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical" ;
  roleMedical :string ="";
  roleDigital :string =""; 
  allFiles:any[]=[];
  lengthTab : number ; 
  AllFilesF : any ; 
  constructor(private ar : ActivatedRoute , private dialog: MatDialog , private service : AdminService , private router : Router
    , private serviceIAModel : IAModelService) 
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
 modeles : IA_Model[]=[
      {id:1 , nom:'Modele 1 ',date_ajout:"2022/01/22",date_debut:'2022/04/12',date_fin:'2022/05/14'},
      {id:2 , nom:'Modele 2',date_ajout:"2022/01/22",date_debut:'2022/04/12',date_fin:'2022/05/14'},
      {id:3 , nom:'Modele 3',date_ajout:"2022/01/22",date_debut:'2022/04/12',date_fin:'2022/05/14'},
      {id:4 , nom:'Modele 4',date_ajout:"2022/01/22",date_debut:'2022/04/12',date_fin:'2022/05/14'},
      {id:5 , nom:'Modele 5',date_ajout:"2022/01/22",date_debut:'2022/04/12',date_fin:'2022/05/14'},
      {id:6 , nom:'Modele 6',date_ajout:"2022/01/22",date_debut:'2022/04/12',date_fin:'2022/05/14'},
      {id:7 , nom:'Modele 7',date_ajout:"2022/01/22",date_debut:'2022/04/12',date_fin:'2022/05/14'},
       
    

   ]
  ngOnInit(){
    this.getAllFiles();
    this.nbrModeles= this.modeles.length ; 
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
     this.test=res ; 
     console.log(this.test.role);
     if(this.test.role === "Medical Manager"){
       this.roleMedical=this.test.role
      this.username = this.test.nomPrenom ; 
      console.log(parseInt(localStorage.getItem('idAdmin')))
      console.log(localStorage.getItem("nameAdmin"))
      this.service.getAdminMedicall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
        this.admin=data
              if(this.admin.image ==null){
                this.imagePath="./assets/imagesD/faces/user.jpg"
              }
              else{
                this.imagePath = "http://localhost:8281/adminMedical/getImage/"+this.admin.id}
              console.log(this.imagePath)
              this.role=this.admin.role;  }) ;
     }
     else{
       if(this.test.role === "Digital Manager"){
         this.roleDigital=this.test.role ;
         this.username = this.test.nomPrenom ; 
        console.log(parseInt(localStorage.getItem('idAdmin')))
        console.log(localStorage.getItem("nameAdmin"))
        this.service.getAdminDigitall(parseInt(localStorage.getItem('idAdmin'))).subscribe(data=>{
          this.admin=data
                if(this.admin.image ==null){
                  this.imagePath="./assets/imagesD/faces/user.jpg"
                }
                else{
                  this.imagePath = "http://localhost:8281/adminDigital/getImage/"+this.admin.id}
                console.log(this.imagePath)
                this.role=this.admin.role;  }) ;
       }
     }
    })

  }

  getAllFiles(){
  this.serviceIAModel.getAllFiles().subscribe(data=>{
  this.serviceIAModel.AllIAModeles=data ;
  this.serviceIAModel.lengthAllIAModeles=data.length ;
  this.lengthTab = this.allFiles.length ;  
  console.log("alll files ", this.allFiles);
})
  }
   
   delete(){
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "de supprimer Modéle IA  : Nom de Modéle  !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimé !',
          'Patient a été supprimé.',
          'success'
        )
      }
    })
  }
   details(){
    Swal.fire({
      background: '#1A202E',
      title: 'Custom animation with Animate.css',
      showClass: {
        popup: 'animate__animated animate__fadeInDown'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOutUp'
      }
      
    })
}

deleteFileIAModel(id :number){
  console.log("idddd" , id)
    Swal.fire({
      title: 'Êtes-vous sûr?',
      text: "de supprimer ce fichier",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Annuler',
      confirmButtonText: 'Oui, supprimez-le!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.serviceIAModel.deleteById(id).subscribe(()=>{this.getAllFiles()
        Swal.fire(
          'Supprimé !',
          'Fichier a été supprimé.',
          'success'
        )})}
      });
  }
    

  set searchIAModel(chaine: string) {

    this.serviceIAModel.AllIAModeles = this.filtrer(chaine);
  

  }



  filtrer(sousChaine: string) {
  
    this.serviceIAModel.getAllFiles().subscribe(data=>{
    this.AllFilesF = data;});     
    return this.AllFilesF.filter(e => e.date_hebergement.indexOf(sousChaine) != -1 || e.adminD.nomPrenom.indexOf(sousChaine) != -1 );


  }
logout() {
  localStorage.removeItem('nameAdmin');
  localStorage.removeItem('role');
  localStorage.removeItem('emailAdmin');
  localStorage.removeItem('idAdmin');
  localStorage.removeItem('token');
  this.service.islogin = false;
  this.router.navigate(['']);
  window.localStorage.clear();
}
}