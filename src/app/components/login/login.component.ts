import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginModel } from '../../models/loginModel';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  providers:[AuthService]
})
export class LoginComponent implements OnInit{

  loginModel:LoginModel
  loginForm:FormGroup
  isActiveButton:boolean = true
  constructor(

    private router:Router,
    private authService:AuthService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService
  ){

  }
  ngOnInit(): void {
 this.createLoginForm(); //oluşturulan methodları burda çağrılır.
  }
  createLoginForm(){
this.loginForm = this.formBuilder.group({
  email:["",(Validators.required)],
  password:["",Validators.required]
})
  }

  login(){
    //console.log('Login button clicked');
    if (this.loginForm.valid) {
      this.isActiveButton = false;

            let  loginModel = Object.assign({},this.loginForm.value)
            this.authService.login(loginModel).subscribe((res)=>{
              //console.log(res);

              if(this.authService.redirectUrl){
                this.router.navigate([this.authService.redirectUrl])
              }else{
                this.router.navigate([""])
              }
              localStorage.setItem("token",res.data.token)
              this.toastr.success(res.message,"Uyarı");
            },(err)=>{
              this.isActiveButton = true;
              this.toastr.error(err.error);

            });

    }
    else{
      this.toastr.error("Eksik Bilgileri Doldurun!","Hata");
    }
  }
}
