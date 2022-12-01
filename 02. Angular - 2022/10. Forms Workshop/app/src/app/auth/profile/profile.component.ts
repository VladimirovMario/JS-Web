import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { appEmailDomains } from 'src/app/shared/constants';
import { customEmailValidator } from 'src/app/shared/validators';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  showEdit: boolean = false;
  
  get user() {
    const { username, email, tel: telephone } = this.authService.user!
    const [ prefix, ...tel ] = telephone.split(' ');
    return {
      username,
      email,
      prefix,
      tel: tel.join(' ')
    };
  }

  form = this.formBuilder.group({
    username: ['', [Validators.required, Validators.minLength(5)]],
    email: ['', [Validators.required, customEmailValidator(appEmailDomains)]],
    prefix: [''],
    tel: [''],
  })

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    ) { 

    this.form.setValue(this.user);

  }

  ngOnInit(): void {
  }
   
  toggleEditMode(): void {
    this.showEdit = !this.showEdit
      // console.log(this.showEdit);
  }

  saveProfile(): void {
    if (this.form.invalid) { return; }
    const {username , email, prefix, tel} = this.form.value;
    // {username: 'Johny', email: 'john.doe@gmail.com', prefix: '00359', tel: '885 888 888'}

    // TODO get the right format of data for the database
    this.authService.user = {
      username,
      email,
      tel: prefix + ' ' + tel
    } as any;

    this.toggleEditMode();
  } 

  cancelEditMode(){    
    // TODO clear the errors that appear
    this.toggleEditMode();
    this.form.setValue(this.user);
    }


}
