import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { formatDate } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      rememberme: ['']
    });

    // reset login status
    this.authenticationService.logout();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  // convenience getter for easy access to form fields
  get form() { return this.loginForm.controls; }

  login() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.authenticationService.login(this.form.email.value, this.form.password.value)
      .pipe()
      .subscribe(
        data => {
          let lastLoginDate = formatDate(new Date(), 'dd-MM-yyyy hh:mm:ss a', 'en-US');
          localStorage.setItem("lastLoginDate", JSON.stringify(lastLoginDate));
          this.router.navigate([this.returnUrl]);
        },
        error => {
          this.error = error;
        });
  }
}