import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForgotPasswordDto } from '../../../models/dtos/forgotPasswordDto';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.css'
})
export class ForgotPasswordComponent implements OnInit {

  isSuccess = true;
  isActive = false;
  message: string = "";
  password: string = "";
  isForgotPasswordActiveButton: boolean = true;
  forgotPasswordDto: ForgotPasswordDto;
  value: string = "";


  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastr:ToastrService

  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      this.confirmMail(p["value"]);
      this.value = p["value"];
    })
  }

  confirmMail(value: string) {
    this.authService.confirmForgotPasswordValue(value).subscribe((res) => {
      if (res) {
        this.isActive = true;
        this.isSuccess = true;
      }

    }, (err) => {
      this.isActive = true;
      this.isSuccess = false;
      this.message = err.error;
    })
  }
  changeInputClass(text: string) {

    if (text != "") {
      return "input-group input-group-outline my-3 is-valid"
    } else {
      return "input-group input-group-outline my-3 is-invalid"
    }

  }

  changePassword() {
    this.forgotPasswordDto = {
      password: this.password,
      value: this.value
    }
    this.authService.changePasswordToForgotPassword(this.forgotPasswordDto).subscribe((res) =>{
      this.router.navigateByUrl("/login");
      this.toastr.success(res.message)
    },(err)=>{
      this.toastr.error(err.error);
    })
  }

}
