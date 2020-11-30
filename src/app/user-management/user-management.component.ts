import {Component, OnInit } from '@angular/core';
import {UserManagementService} from './service/user-management.service';
import {User} from './service/user';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { GroupDto } from '../services/dto/group.dto';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  dataset: User[];
  visible: boolean = false;
  newUserForm: FormGroup;
  groupOptions: GroupDto[];
  selectedGroups: number[];


  constructor(private userService: UserManagementService, private formBuilder: FormBuilder,
    private authenticationService: AuthenticationService, private messageService: NzMessageService) {
  }

  ngOnInit() {
    this.authenticationService.userGroups.subscribe(g => this.groupOptions = g);

    this.newUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    }, {validators: this.passwordsMatch});

    this.refreshUserTable();
  }

  refreshUserTable(): void {
    this.userService.getUsers().subscribe(users => {
      this.dataset = users;
    });
  }

  userGroups(groups: string[]): string {
    return groups.join(', ');
  }

  addUser() {
    this.visible = true;
    this.newUserForm.get('username').enable();
    this.selectedGroups = [];
  }

  addedUserHandler($event: User) {
    this.refreshUserTable();
  }

  editUser(user) {
    this.visible = true;
    this.newUserForm.get('username').setValue(user.username);
    this.newUserForm.get('username').disable();
    let groups: number[] = [];
    user.groups.forEach(element => {
      groups.push(this.groupOptions.find(x=> x.name == element).id);
    });
    this.selectedGroups = groups;
  }

  deleteUser(user: User) {
    this.userService.deleteUserByUsername(user.username).subscribe(res=> {
      this.refreshUserTable();
    });
  }

  passwordsMatch: ValidatorFn = (control: FormGroup): ValidationErrors | undefined => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm');

    return password && passwordConfirm && password.value !== passwordConfirm.value
      ? {passwordMismatch: true}
      : undefined;
  }


  submit() {
    const password = this.newUserForm.get('password');
    const passwordConfirm = this.newUserForm.get('passwordConfirm');

    if(!password || !passwordConfirm){
      this.messageService.error('Password and Confirm Password must be filled');
    } else if(password.value !== passwordConfirm.value){
      this.messageService.error('Password and Confirm Password must have the same value');
    } else if(!this.selectedGroups || this.selectedGroups.length == 0){
      this.messageService.error('It must have groups assigned');
    }

    if (this.newUserForm.valid && this.selectedGroups.length > 0) {
      const user = new User(this.newUserForm.get('username').value, this.selectedGroups, this.newUserForm.get('password').value);
      this.authenticationService.provisionUser(user).subscribe(res => {
        if (res) {
          this.refreshUserTable();
          this.cancel();
        }
      });
    }
  }

  cancel() {
    this.visible = false;
    this.newUserForm.reset();
  }
}
