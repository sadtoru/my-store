import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  imgParent = '';
  token = '';
  
  constructor(
    private authService: AuthService,
    private userService: UsersService,
  ){ }

  createUser(){
    this.userService.create({
      name: 'Maria',
      email:'maria@mail.com',
      password: '12345'
    }).subscribe(rta => {
      console.log(rta);
    });
  }

  

}
