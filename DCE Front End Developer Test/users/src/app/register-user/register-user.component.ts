import { Component } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register-user',
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent {
  constructor(private UserService: UserService) { }
  newUser = { name: '', job: '' }

  onSubmit() {
    this.UserService.createUsers(this.newUser)
      .subscribe(d => console.log(d));
    this.newUser = { name: '', job: '' }
  }
}
