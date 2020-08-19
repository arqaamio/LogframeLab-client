import {Component, OnInit} from '@angular/core';
import {UserManagementService} from './service/user-management.service';
import {User} from './service/user';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  dataset$: Observable<User[]>;
  dataset: User[];
  isAddingNewUser = false;

  constructor(private userService: UserManagementService) {
  }

  ngOnInit() {
    this.dataset$ = this.userService.getUsers();
    this.dataset$.subscribe(users => {
      this.dataset = users;
    });
  }

  userGroups(groups: string[]): string {
    return groups.join(', ');
  }

  addUserRow() {
    this.isAddingNewUser = true;
  }

  isAddingNewUserHandler(event) {
    this.isAddingNewUser = event;
  }

  addedUserHandler($event: User) {
    this.dataset = [...this.dataset, $event];
  }
}
