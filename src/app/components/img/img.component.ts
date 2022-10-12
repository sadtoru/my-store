import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.css']
})
export class ImgComponent implements OnInit {
  
  @Input() img: string = '';
  imgDefault = 'https://narayanapearls.in/assets/images/not-found.jpg';
  counter = 0; 

  constructor() { }

  ngOnInit(): void {
/*     window.setInterval(() => {
      this.counter += 1;
    },1000)
 */
  }

  imgError() {
    this.img = this.imgDefault
  }


}
