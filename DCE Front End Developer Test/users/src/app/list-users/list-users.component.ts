import { Component, OnInit } from '@angular/core';
import { IListUsers } from './IListUsers';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  constructor(private UserService: UserService) { }
  page = 1;
  listUsers!: IListUsers;

  pageIncrement():void {this.page++};
  pageDecrement():void {this.page--};


  ngOnInit(): void {
    this.UserService.getUsers(this.page).subscribe(d => this.listUsers = d);
  }


}
