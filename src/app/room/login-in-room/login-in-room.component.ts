import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-in-room',
  templateUrl: './login-in-room.component.html',
  styleUrls: ['./login-in-room.component.scss'],
})
export class LoginInRoomComponent implements OnInit {
  redirectTo: string = '';
  public form: FormGroup = new FormGroup({
    name: new FormControl(null, [Validators.required]),
  });

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe((params) => {
      this.redirectTo = params['redirectTo'];
    });
  }

  ngOnInit(): void {
    console.log(this.redirectTo);
  }

  public setUserName() {
    this.userService.userName = this.form.get('name')?.value;
    this.router.navigate([this.redirectTo]);
  }
}
