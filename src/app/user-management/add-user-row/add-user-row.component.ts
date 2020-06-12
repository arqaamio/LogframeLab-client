import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";
import {AuthenticationService} from "../../services/authentication.service";
import {GroupDto} from "../../services/dto/group.dto";
import {User} from "../service/user";

@Component({
  selector: 'app-add-user-row',
  templateUrl: './add-user-row.component.html',
  styleUrls: ['./add-user-row.component.scss']
})
export class AddUserRowComponent implements OnInit {

  newUserForm: FormGroup;
  groupOptions: GroupDto[];
  selectedGroups: number[];

  @Output("isAddingNewUser")
  isAddingNewUser = new EventEmitter<boolean>();

  @Output("addedUser")
  addedUser = new EventEmitter<any>();

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
    this.authenticationService.userGroups.subscribe(g => this.groupOptions = g);

    this.newUserForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      passwordConfirm: ['', [Validators.required]]
    }, {validators: this.passwordsMatch});
  }

  passwordsMatch: ValidatorFn = (control: FormGroup): ValidationErrors | null => {
    const password = control.get('password');
    const passwordConfirm = control.get('passwordConfirm')

    return password && passwordConfirm && password.value !== passwordConfirm.value
      ? {'passwordMismatch': true}
      : null;
  }


  submit() {
    if (this.newUserForm.valid && this.selectedGroups.length > 0) {
      let user = new User(this.newUserForm.get('username').value, this.selectedGroups, this.newUserForm.get('password').value);
      this.authenticationService.provisionUser(user).subscribe(res => {
        if (res) {
          this.addedUser.emit(res);
          this.cancel();
        }
      });
    }
  }

  reset() {
    this.newUserForm.reset();
    this.selectedGroups = [];
  }

  cancel() {
    this.reset();
    this.isAddingNewUser.emit(false);
  }
}
