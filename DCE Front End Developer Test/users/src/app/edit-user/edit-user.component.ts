import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent {
  @Input() user!: any;
  @Output() isEditEvent = new EventEmitter<boolean>();

  constructor(private UserService: UserService) { }

  editCancel() {
    this.isEditEvent.emit(false);
  }
  onSubmitEdit() {
    this.UserService.editUsers(this.user.id, { name: this.user.name, job: this.user.job })
      .subscribe(d => console.log(d));
    this.editCancel();
  }

}
