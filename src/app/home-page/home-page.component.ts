import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
   readMoreButton = document.querySelector('.readMoreButton')
   text =document.querySelector('.text') ;  
  name ='';
  
  constructor() { }

  ngOnInit() {
  window.localStorage.clear();
  this.name=localStorage.getItem('name')
  console.log(this.name)
  }
  myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Lire la suite";
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      btnText.innerHTML = "Voir moins";
      moreText.style.display = "inline";
    }
  }
  
}
