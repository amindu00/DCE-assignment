import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IListUsers } from './IListUsers';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})

export class ListUsersComponent implements OnChanges {
  @Input() page!: number;

  constructor(private UserService: UserService) { }

  pageIncrement() { this.page++ }
  pageDecrement() { this.page-- }
  listUsers!: IListUsers;
  isEdit = false;
  user: any;

  ngOnChanges(changes: SimpleChanges): void {   //not calling function when changes occured
    this.UserService.getUsers(this.page).subscribe(d => this.listUsers = d);
    console.log(changes);
  }

  onDelete(id: number) {  //trouble with ui deleteing the div
    this.UserService.deleteUser(id).subscribe();
    const index = id - 1 - (this.listUsers.page - 1) * this.listUsers.per_page;
    delete this.listUsers.data[index];
  }

  cancelEdit(isEditEvent: boolean) {
    this.isEdit = isEditEvent;
    this.user = null;
  }

  onEdit(user: any) {
    this.user = user;
    this.isEdit = true;
  }
}
