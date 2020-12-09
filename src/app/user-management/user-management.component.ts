import {Component, OnInit } from '@angular/core';
import {UserManagementService} from './service/user-management.service';
import {User} from './service/user';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import { GroupDto } from '../services/dto/group.dto';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDTO } from './service/userdto';

export const SEC_ADMIN_GROUP_NAME: string = 'SEC_ADMIN';
export const SEC_ADMIN_GROUP_ID: number = 1;

@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.scss']
})
export class UserManagementComponent implements OnInit {

  dataset: UserDTO[];
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

  deleteUser(user) {
    if(user.groups.includes(SEC_ADMIN_GROUP_NAME) && this.dataset.filter(x=>x.groups.includes(SEC_ADMIN_GROUP_NAME)).length == 1){
      this.messageService.error('Cannot delete only user with SEC_ADMIN group since then the application won\'t be accessible')
    } else {
      this.userService.deleteUserByUsername(user.username).subscribe(res=> {
        this.refreshUserTable();
      });
    }
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
    const secAdminUsers: UserDTO[] = this.dataset.filter(x=>x.groups.includes(SEC_ADMIN_GROUP_NAME));
    if(!password || !passwordConfirm){
      this.messageService.error('Password and Confirm Password must be filled');
    } else if(password.value !== passwordConfirm.value){
      this.messageService.error('Password and Confirm Password must have the same value');
    } else if(!this.selectedGroups || this.selectedGroups.length == 0){
      this.messageService.error('It must have groups assigned');
    } else if(!this.selectedGroups.includes(SEC_ADMIN_GROUP_ID) && secAdminUsers.length == 1
        && secAdminUsers[0].username == this.newUserForm.get('username').value){
      this.messageService.error('Cannot remove group of only user with SEC_ADMIN group since then the application won\'t be accessible');
      return;
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
    this.selectedGroups = [];
  }
}
