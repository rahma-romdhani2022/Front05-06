import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GeneralisteService } from 'src/app/services/generaliste.service';

@Component({
  selector: 'app-espace-stockage',
  templateUrl: './espace-stockage.component.html',
  styleUrls: ['./espace-stockage.component.css']
})
export class EspaceStockageComponent implements OnInit {

  constructor(private ar : ActivatedRoute , private service : AdminService , private router:Router , 
    private generalisteService : GeneralisteService) 
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
  test : any ; 
  retrieveResponse: any={};
  base64Data: any;
  id : number ;
  admin : any ; 
  imagePath : string ;
  username : string ;  
  role : string ;
  adminDigital:string ="adminDigital";
  adminMedical:string="adminMedical";
  tabAllGeneraliste : any ; 
  espaceStockageX : number ; 
  ngOnInit(){
    this.generalisteService.getAllGeneralistes().subscribe( data =>{
     
   this.tabAllGeneraliste=data ;

   
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
     this.test=res ; 
     console.log(this.test.role);
     if(this.test.role === "Medical Manager"){
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
    for (let i = 0; i < this.tabAllGeneraliste.length; i++ ) {
    this.generalisteService.getExpaceStockagePArMEdecin( this.tabAllGeneraliste[i].id).subscribe(
      response=>{
    this.espaceStockageX=response;
      console.log("Name = ", this.tabAllGeneraliste[i]);
    var echarts = require('echarts');

var chartDom = document.getElementById('main');
var myChart = echarts.init(chartDom, 'dark');
var option;

option = {
  backgroundColor:'#1A202E',
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {},
   /* grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },*/
    xAxis: {
      type: 'value',
       axisLabel: {
          formatter: '{value} Go'
        }
    },
    yAxis: {
      type: 'category',
      data: [this.tabAllGeneraliste[i].nomPrenom]
    },
    series: [
      {
        name: 'Espace de stockage ',
        type: 'bar',
        color:"#DB5959",
       
        label: {
          show: true  ,
          color :"#fff",
          borderRadius:15,
        },
        emphasis: {
          focus: 'series'
        },
        data: [this.espaceStockageX , ]
      },
  
    ]
  };
  

option && myChart.setOption(option);

})}
})  
  }
  getAllMedecins(){
    this.generalisteService.getAllGeneralistes().subscribe(
      data =>{
this.tabAllGeneraliste=data ;
      }
    )
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
