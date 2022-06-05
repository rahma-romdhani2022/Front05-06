import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  user: any;
  id : number ; 
  imagePath :string=null;
  user1 :any={};
  retrieveResponse: any={};
  base64Data: any;
  gender : string =""; 
  nomPrenomExpert : string ; 
  emailExpert : string ; 
  telephoneExpert : number ; 
  constructor(public route: Router, private ar: ActivatedRoute, public service: UserServiceService) {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })

  }

  ngOnInit() {
    setTimeout(()=>{ }, 15000); 
    this.ar.paramMap.subscribe((x)=>{
      this.id =+ x.get('id');
    /* this.service.getData(this.id).subscribe(data => {
      this.user = data;
      console.log(this.user)
    
    });*/
     
    this.service.getData(parseInt(localStorage.getItem('id'))).subscribe(data=>{
      setTimeout(()=>{ }, 15000);    
      this.user=data; 
      this.nomPrenomExpert=this.user.nomPrenom;
      this.emailExpert=this.user.email ; 
      this.telephoneExpert=this.user.telephone
      this.gender = this.user.gender ; 
      console.log("userrr" ,this.user)
      console.log("expeeeeeeeeeeeert" , this.service.expertModifier)
            if(this.user.image ==null){
              this.imagePath="./assets/imagesD/faces/user1.png"
            }
            else{
              this.imagePath="http://localhost:8281/expert/imageExpert/"+this.id ; }
    
  }) ;
});
 
}

}
