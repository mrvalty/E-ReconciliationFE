import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RegisterDto } from '../../models/dtos/registerDto';
import { DatePipe } from '@angular/common';
import { TermsandCondition } from '../../models/termsandCondition';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registerDto: RegisterDto;

  registerForm: FormGroup;
  termsandCondition: TermsandCondition;

  //#region Değişkenler
  isRegisterActiveButton: boolean = true;
  name: string = "";
  email: string = ""
  password: string = ""
  companyName: string = ""
  address: string = ""
  taxDepartment: string = ""
  taxIdNumber: string = ""
  identifyNumber: string = ""
  //#endregion



  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private datePipe: DatePipe,
    private router: Router
  ) { }


  ngOnInit(): void {
    this.getTermsandCondition();
    this.createRegisterForm();
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      companyName: ["", Validators.required],
      address: ["", Validators.required],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: ["", Validators.maxLength(11)],
      addedAt: [Date.now(),],
      isActive: [true]
    })

  }

  register() {
    //console.log('Login button clicked');
    if (this.registerForm.valid) {
      this.isRegisterActiveButton = false;
      let registerModel = Object.assign({}, this.registerForm.value);
      this.registerDto = {
        "userForRegister": {
          email: registerModel.email,
          name: registerModel.name,
          password: registerModel.password
        },
        "company": {
          name: registerModel.companyName,
          addedAt: this.datePipe.transform(Date(), 'yyyy-MM-dd'),
          address: registerModel.address,
          taxDepartment: registerModel.taxDepartment,
          taxIdNumber: registerModel.taxIdNumber,
          identityNumber: registerModel.identityNumber,
          isActive: true,
          id: 0
        }
      }
      //#region eski kod
      // //Kullanıcının kişisel bilgileri
      // this.registerDto.userForRegister.name = registerModel.name;
      // this.registerDto.userForRegister.email = registerModel.email;
      // this.registerDto.userForRegister.password = registerModel.password;
      // //Şirket Bilgileri
      // this.registerDto.company.name = registerModel.companyName;
      // this.registerDto.company.address = registerModel.address;
      // this.registerDto.company.identityNumber = registerModel.identityNumber;
      // this.registerDto.company.taxDepartment = registerModel.taxDepartment;
      // this.registerDto.company.taxIdNumber = registerModel.taxIdNumber;
      //#endregion

      this.authService.register(this.registerDto).subscribe((res) => {

        if (this.authService.redirectUrl) {
          this.router.navigate([this.authService.redirectUrl])
        }
        else {
          this.router.navigate([""])
        }
        localStorage.setItem("token", res.data.token)
        this.toastr.success(res.message, "Uyarı");
      }, (err) => {
        this.isRegisterActiveButton = true;
        this.toastr.error(err.error);

      });
      console.log(this.registerDto);
    }
    else {
      this.toastr.error("Eksik Bilgileri Doldurun!", "Hata");
    }
  }

  changeInputClass(text: string) {
    if (text != "") {
      return "input-group input-group-outline my-3 is-valid"
    } else {
      return "input-group input-group-outline my-3 is-invalid"
    }

  }

  getTermsandCondition() {
    this.authService.getTermsandCondition().subscribe((res) => {
      this.termsandCondition = res.data;
    }, (err) => {
      this.toastr.error(err.error);
    })
  }

}
