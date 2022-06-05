import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import 'owl.carousel/dist/assets/owl.carousel.min.css';
import 'owl.carousel';
export interface Doctors{
  name : string ,
  image : string 
}

@Component({
  selector: 'app-rating-consultation',
  templateUrl: './rating-consultation.component.html',
  styleUrls: ['./rating-consultation.component.css']
})
export class RatingConsultationComponent implements OnInit {
 url ="http://localhost:8281/consultation/image/6" ; 
  doctors : Doctors[]=[
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image:"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
    {name:"rahma romdhani" , image :"./assets/doctors/d1.jpg"},
  ]
  constructor() { }
  currenteRate : number =0 ; 
  ngOnInit() {
    var imgUpload = document.getElementById('upload_imgs')as HTMLInputElement | null
    , imgPreview = document.getElementById('img_preview')
    , imgUploadForm = document.getElementById('img-upload-form')
    , totalFiles
    , previewTitle
    , previewTitleText
    , img;
  
  imgUpload.addEventListener('change', previewImgs, false);
  imgUploadForm.addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Images Uploaded! (not really, but it would if this was on your website)');
  }, false);
  
  function previewImgs(event) {
    totalFiles = imgUpload.files.length;
    
    if(!!totalFiles) {
      imgPreview.classList.remove('quote-imgs-thumbs--hidden');
      previewTitle = document.createElement('p');
      previewTitle.style.fontWeight = 'bold';
      previewTitleText = document.createTextNode(totalFiles + ' Total Images Selected');
      previewTitle.appendChild(previewTitleText);
      imgPreview.appendChild(previewTitle);
    }
    
    for(var i = 0; i < totalFiles; i++) {
      img = document.createElement('img');
      img.src = URL.createObjectURL(event.target.files[i]);
      img.classList.add('img-preview-thumb');
      imgPreview.appendChild(img);
    }
  }
  }
  }


