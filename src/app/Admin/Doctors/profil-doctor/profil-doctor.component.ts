import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { UserServiceService } from 'src/app/services/user-service.service';
import * as echarts from 'echarts';
@Component({
  selector: 'app-profil-doctor',
  templateUrl: './profil-doctor.component.html',
  styleUrls: ['./profil-doctor.component.css']
})
export class ProfilDoctorComponent implements OnInit {
test : boolean =true;
test5 : boolean =true;
test2 : boolean =true;
test3 : boolean =true;
test4 : boolean =true;
admin : any ; 
imageAdmin : any ; 
retrieveResponse: any={};
base64Data: any;
roleMedical :string ="" ; 
roleDigital :string ="";
idExpert : number ; 
expertARecperere : any ; 
  constructor(private ar : ActivatedRoute , private service : AdminService ,
    private serviceUser : UserServiceService ,  private router : Router)
  {
    ar.params.subscribe(val => {
      this.ngOnInit();
    })
  }
 
  ngOnInit() {
    this.ar.paramMap.subscribe((x)=>{
      this.idExpert =+ x.get('id');
      console.log("id : " , this.idExpert);
   } )
  this.GetExpertByID() ; 
    this.service.getUtilisateur(parseInt(localStorage.getItem("idAdmin"))).subscribe(res=>{
      this.admin= res ; 
      if(this.admin.role==="Medical Manager") {
        this.roleMedical=this.admin.role  ;

      }
      else{
       this.roleDigital=this.admin.role ; 
      }
      this.roleDigital=this.admin.role  ;
      if(this.admin.image ==null){
        this.imageAdmin="./assets/imagesD/faces/user.jpg"
      }
      else{
        this.imageAdmin = "http://localhost:8281/adminMedical/getImage/"+this.admin.id}
      console.log(this.admin)
        }) ; 
      
    $(".toggle-password").click(function() {

      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
    var chartDom = document.getElementById('main');
    var myChart = echarts.init(chartDom);
    var option;
    
    option = {
      title: {
        text: 'Temperature Change in the Coming Week'
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {},
      toolbox: {
        show: true,
        feature: {
          dataZoom: {
            yAxisIndex: 'none'
          },
          dataView: { readOnly: false },
          magicType: { type: ['line', 'bar'] },
          restore: {},
          saveAsImage: {}
        }
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      },
      series: [
        {
          name: 'Highest',
          type: 'line',
          data: [10, 11, 13, 11, 12, 12, 9],
          markPoint: {
            data: [
              { type: 'max', name: 'Max' },
              { type: 'min', name: 'Min' }
            ]
          },
          markLine: {
            data: [{ type: 'average', name: 'Avg' }]
          }
        },
        {
          name: 'Lowest',
          type: 'line',
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [{ name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }]
          },
          markLine: {
            data: [
              { type: 'average', name: 'Avg' },
              [
                {
                  symbol: 'none',
                  x: '90%',
                  yAxis: 'max'
                },
                {
                  symbol: 'circle',
                  label: {
                    position: 'start',
                    formatter: 'Max'
                  },
                  type: 'max',
                  name: '最高点'
                }
              ]
            ]
          }
        }
      ]
    };
    
    option && myChart.setOption(option);
    
   }
GetExpertByID(){
  this.serviceUser.getData(this.idExpert).subscribe(data=>{
    this.expertARecperere= data ; 
  })
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

