import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.component.html',
  styleUrls: ['./reset-pwd.component.css']
})
export class ResetPwdComponent implements OnInit {

  constructor(private service : UserServiceService , private router : Router) { }

  ngOnInit() {

  }
sendEmail(f : NgForm){
this.service.sendEmail(f.value.email).subscribe(data=>{
Swal.fire({ 
  icon: 'success',
  title: 'Vérifier de votre adresse e-mail',
  showConfirmButton: false,
  timer: 2000
}),
(document.getElementById("iddd") as HTMLInputElement).value=""
}, err=>{
  Swal.fire({ 
    icon: 'error',
    title: "Il n'y a pas d'utilisateur avec cette adresse",
    showConfirmButton: false,
    timer: 2500
  })
}) ;
}
vers(){
  this.router.navigate(['/ForgetPassword'])
}
}
