import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as XLSX from 'xlsx';
import { JwtHelperService } from '@auth0/angular-jwt';
import { SwalService } from '../../services/swal.service';
import { UserOperationClaimModel } from '../../models/userOperationClaimModel';
import { UserOperationClaimService } from '../../services/user-operation-claim.service';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../services/user.service';
import { CompanyModel } from '../../models/companyModel';
import { CompanyService } from '../../services/company.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { CompanyDto } from '../../models/dtos/companyDto';


@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit {

  @Inject("validHatasi") private validHatasi: string;
  title: string = "Şirket Listesi"
  searchString: string = ""
  jwtHelper: JwtHelperService = new JwtHelperService();
  userOperationClaims: UserOperationClaimModel[] = [];
  companies: CompanyModel[] = [];


  operationAdd = false;
  operationUpdate = false;
  operationDelete = false;
  operationGet = false;
  operationList = false;
  isAuthenticated: boolean;
  companyId: string;
  userId: string;
  addForm: FormGroup;
  updateForm: FormGroup;
  name: string = "";
  address: string = "";
  taxDepartment: string;
  taxIdNumber: string;
  identityNumber: string;
  companyDto: CompanyModel;



  constructor(
    private authService: AuthService,
    private userOperationClaimService: UserOperationClaimService,
    private toastr: ToastrService,
    private userService: UserService,
    private companyService: CompanyService,
    private swal: SwalService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
  ) { }


  ngOnInit(): void {
    this.refresh();
    this.userOperationClaimGetList();
    this.getUserCompanyList();
    this.createAddForm();
    this.createUpdateForm();
  }

  exportExcel() {
    let element = document.getElementById('excelTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'ŞirketListesi.xlsx');
  }


  refresh() {
    this.isAuthenticated = this.authService.isAuthenticated();
    if (typeof window !== 'undefined') {
      if (this.isAuthenticated) {
        let token = localStorage.getItem('token');
        let decode = this.jwtHelper.decodeToken(token);
        let name = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
        let companyName = Object.keys(decode).filter((x) => x.endsWith('/ispersistent'))[0];
        let companyId = Object.keys(decode).filter((x) => x.endsWith('/anonymous'))[0];
        let userId = Object.keys(decode).filter((x) => x.endsWith('/nameidentifier'))[0];
        this.companyId = decode[companyId];
        this.userId = decode[userId];

        //console.log(decode);

      }
    }
  }

  userOperationClaimGetList() {
    this.userOperationClaimService.getList(this.userId, this.companyId).subscribe((res) => {
      this.userOperationClaims = res.data;
      //console.log(res.data);

      this.userOperationClaims.forEach(value => {

        if (value.operationClaimId == "1") {
          this.operationAdd = true;
          this.operationDelete = true;
          this.operationUpdate = true;
          this.operationGet = true;
          this.operationList = true;
        }
        if (value.operationClaimId == "53") { this.operationAdd = true; }

        if (value.operationClaimId == "54") { this.operationDelete = true; }

        if (value.operationClaimId == "28") { this.operationUpdate = true; }

        if (value.operationClaimId == "55") { this.operationList = true; }

        if (value.operationClaimId == "1053") { this.operationGet = true; }
      })

    }, (err) => {
      this.toastr.error("Bir hata oluştu.");
    });

  }

  getUserCompanyList() {
    this.companyService.getCompanyListByUserid(this.userId).subscribe((res) => {
      this.companies = res.data;
    }, (err) => {
      this.toastr.error(err.message);
    })

  }

  changeStatusCompany(company: CompanyModel) {
    this.swal.callSwal("Şirket Durum Değiştir?", "Şirketi aktif/pasif olarak değiştirmek istiyor musunuz?", () => {
      this.companyService.changeStatusCompany(company).subscribe((res) => {
        this.getUserCompanyList();
        this.toastr.warning(res.message)
      }, (err) => {
        this.toastr.error(err.error)
      })
    })
  }

  createAddForm() {
    this.addForm = this.formBuilder.group({
      name: ["", Validators.required],
      address: ["", Validators.required],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: [""],
      isActive: [true],
      addedAt: [this.datePipe.transform(Date(), 'yyyy-MM-dd')],
      userId: [this.userId],
      id: 0
    })

  }

  add() {
    if (this.addForm.valid) {
      let companyModel = Object.assign({}, this.addForm.value);
      this.companyService.addCompany(companyModel).subscribe((res) => {
        this.toastr.success(res.message);
        this.getUserCompanyList();
        document.getElementById("closeAddModal").click();
        this.createAddForm();
      }, (err) => {
        //console.log(err);
        this.toastr.error(err.error)
      })
    } else {
      this.toastr.error(this.validHatasi);
    }

  }

  createUpdateForm() {
    this.updateForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ["", Validators.required],
      address: ["", Validators.required],
      taxDepartment: [""],
      taxIdNumber: [""],
      identityNumber: [""],
      isActive: [true],
      addedAt: [this.datePipe.transform(Date(), 'yyyy-MM-dd')],
    })
  }

  update() {
    if (this.updateForm.valid) {
      let companyModel = Object.assign({}, this.updateForm.value);
      this.companyService.updateCompany(companyModel).subscribe((res) => {

        this.toastr.success(res.message);
        this.getUserCompanyList();
        this.createUpdateForm();
        document.getElementById("closeUpdateModal").click();
      }, (err) => {
        console.log(err);
        this.toastr.error(err.error)
      })
    } else {
      this.toastr.error(this.validHatasi);
    }
  }

  getCompany(companyId: number) {
    this.companyService.getCompany(companyId).subscribe((res) => {
      this.companyDto = res.data;
      this.updateForm.controls["id"].setValue(res.data.id);
      this.updateForm.controls["name"].setValue(res.data.name);
      this.updateForm.controls["address"].setValue(res.data.address);
      this.updateForm.controls["taxDepartment"].setValue(res.data.taxDepartment);
      this.updateForm.controls["taxIdNumber"].setValue(res.data.taxIdNumber);
      this.updateForm.controls["identityNumber"].setValue(res.data.identityNumber);
      console.log(res);
    }, (err) => {
      this.toastr.error("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin");
    })
  }



  changeInputClass(text: string) {
    if (text != "") {
      return "input-group input-group-outline my-3 is-valid"
    } else {
      return "input-group input-group-outline my-3 is-invalid"
    }
  }
}
