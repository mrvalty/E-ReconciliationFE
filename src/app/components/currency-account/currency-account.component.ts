import { Component, Inject, OnInit } from '@angular/core';
import { CurrencyAccountService } from '../../services/currency-account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { CurrencyAccount } from '../../models/currencyAccount';
import * as XLSX from 'xlsx';
import { SwalService } from '../../services/swal.service';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-currency-account',
  templateUrl: './currency-account.component.html',
  styleUrl: './currency-account.component.css',
})
export class CurrencyAccountComponent implements OnInit {

  @Inject("validHatasi") private validHatasi: string;


  test: string = '';
  currencyAccounts: CurrencyAccount[] = [];
  jwtHelper: JwtHelperService = new JwtHelperService();
  isAuthenticated: boolean;
  companyId: string;
  searchString: string;
  addedForm: FormGroup;
  updatedForm: FormGroup;
file:string;
  code: string = "";
  name: string = "";
  address: string = "";
  taxDepartment: string;
  taxIdNumber: string;
  identityNumber: string;
  email: string;
  authorized: string;

  currencyAccount: CurrencyAccount = {
    address: "",
    authorized: "",
    code: "",
    companyId: 0,
    email: "",
    id: 0,
    identityNumber: "",
    isActive: true,
    name: "",
    taxDepartment: "",
    taxIdNumber: "",
    addedAt: undefined
  };


  constructor(
    private authService: AuthService,
    private currencyAccountService: CurrencyAccountService,
    private swal: SwalService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
    this.getList();
    this.createAddForm();
    this.createUpdateForm();

  }
  //Cari ekleme formu tanımlamak ve ngModel ile verileri alabilmek için
  createAddForm() {
    this.addedForm = this.formBuilder.group({
      companyId: [this.companyId, Validators.required],
      code: [""],
      name: ["", (Validators.required, Validators.minLength(3))],
      address: ["", (Validators.required, Validators.minLength(3))],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: [""],
      email: [""],
      authorized: [""],
      addedAt: [this.datePipe.transform(Date(), 'yyyy-MM-dd')],
      isActive: true
    });
  }

  createUpdateForm() {
    this.updatedForm = this.formBuilder.group({
      id: [0],
      companyId: [this.companyId, Validators.required],
      code: [""],
      name: ["", (Validators.required, Validators.minLength(3))],
      address: ["", (Validators.required, Validators.minLength(3))],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: [""],
      email: [""],
      authorized: [""],
      addedAt: [this.datePipe.transform(Date(), 'yyyy-MM-dd')],
      isActive: true
    });
  }

  refresh() {
    if (typeof window !== 'undefined') {
      if (this.isAuthenticated) {
        let token = localStorage.getItem('token');
        let decode = this.jwtHelper.decodeToken(token);
        let name = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
        let companyName = Object.keys(decode).filter((x) =>
          x.endsWith('/ispersistent')
        )[0];
        let companyId = Object.keys(decode).filter((x) =>
          x.endsWith('/anonymous')
        )[0];
        this.companyId = decode[companyId];
      }
    }
  }

  getList() {
    this.currencyAccountService.getList(this.companyId).subscribe((res) => {
      this.currencyAccounts = res.data;
    });
  }

  deleteInfo(currency: CurrencyAccount) {
    this.swal.callSwal(
      'Cari Bilgisi Sil', `${currency.email} ' i
      silmek istediğinize emin misiniz?`,
      () => {
        //alert('Silme işlemi başarılı');
        this.currencyAccountService.delete(currency).subscribe((res) => {
          this.swal.callToast(res.message, "info");
          this.getList();
        }, (err) => {
          console.log(err.error);
          this.swal.callToast(err.error, "error");
        });
      }
    );
  }

  exportExcel() {
    let element = document.getElementById('excelTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'CariListe.xlsx');
  }


  addCurrencyAccount() {
    if (this.addedForm.valid) {
      let currencyAccountModel = Object.assign({}, this.addedForm.value);

      this.currencyAccountService.add(currencyAccountModel).subscribe((res) => {
        this.swal.callToast(res.message);
        this.getList();
        this.createAddForm();
        document.getElementById("closeCurrencyAccountModal").click();
      }, (err) => {
        this.swal.callToastError(err.message);
      }
      )
    } else {
      this.swal.callToastError(this.validHatasi);
    }


  }

  updateCurrencyAccount() {

    if(this.updatedForm.valid){
      let currencyAccountModel = Object.assign({},this.updatedForm.value);

      this.currencyAccountService.update(currencyAccountModel).subscribe((res) =>{
        document.getElementById("closeCurrencyAccountModal").click();
        this.getList();
        this.swal.callToast(res.message);
      },(err) =>{
        this.swal.callToastError(this.validHatasi);
      })
    }
  }

  getCurrencyAccount(currencyId: number) {
    this.currencyAccountService.getbyid(currencyId).subscribe((res) => {
      this.currencyAccount = res.data;
      this.updatedForm.controls["id"].setValue(res.data.id);
      this.updatedForm.controls["companyId"].setValue(res.data.companyId);
      this.updatedForm.controls["code"].setValue(res.data.code);
      this.updatedForm.controls["name"].setValue(res.data.name);
      this.updatedForm.controls["address"].setValue(res.data.address);
      this.updatedForm.controls["taxDepartment"].setValue(res.data.taxDepartment);
      this.updatedForm.controls["taxIdNumber"].setValue(res.data.taxIdNumber);
      this.updatedForm.controls["identityNumber"].setValue(res.data.identityNumber);
      this.updatedForm.controls["email"].setValue(res.data.email);
      this.updatedForm.controls["authorized"].setValue(res.data.authorized);
      //console.log(res);

    },(err) =>{
      this.toastr.error(err.message);
    }
  )
  }

  changeInputClass(text: string) {
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    } else {
      return "input-group input-group-outline is-invalid my-3"
    }
  }

  excelAddCurrencyAccount(){

  }

  onChange(event:any){
    this.file = event.target.files[0];

  }


  addFromExcelCurrencyAccount() {
    if (this.file !=null || this.file !="") {
      this.currencyAccountService.addFromExcel(this.file,this.companyId).subscribe((res) => {
        this.swal.callToast(res.message);
        this.getList();
        document.getElementById("closeAddFromExcelModal").click();
      }, (err) => {
        this.swal.callToastError(err.message);
      }
      )
    } else {
      this.swal.callToastError(this.validHatasi);
    }


  }

}
