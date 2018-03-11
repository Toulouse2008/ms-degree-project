import { Component, OnInit } from '@angular/core';

import { ValidateService } from '../services/validate.service';
import { AuthService } from '../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

    name: String;
    username: String;
    email: String;
    password: String;

  constructor(private validateService: ValidateService,
            private flashMessageService: FlashMessagesService,
            private authService: AuthService,
            private router: Router ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
      console.log('123'); //test
      const user = {
          name: this.name,
          email: this.email,
          username: this.username,
          password: this.password
      }


  //validate
  if(!this.validateService.validateRegister(user)){
      //console.log('please fill in all fields');
      this.flashMessageService.show('Please fill in all fields', {cssClass: 'alert-danger', timeout: 3000});
      return false;
  }

  if(!this.validateService.validateEmail(user.email)){
      console.log('please enter valid email');
      return false;
  }
//register the user
  this.authService.registerUser(user).subscribe(data => {
      if(data.success){
          this.flashMessageService.show('Registration success',
          {cssClass: 'alert-success', timeout: 3000});
          this.router.navigate(['/login']);
      } else {
          this.flashMessageService.show('Registration failed, try again',
          {cssClass: 'alert-danger', timeout: 3000});
          this.router.navigate(['/register']);
      }
  });

}
}
