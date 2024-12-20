import { Component, Inject, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import * as XLSX from 'xlsx';
import { AuthService } from '../../services/auth.service';
import { CurrencyAccountService } from '../../services/currency-account.service';
import { SwalService } from '../../services/swal.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaimService } from '../../services/user-operation-claim.service';
import { UserOperationClaimModel } from '../../models/userOperationClaimModel';
import { CurrencyAccount } from '../../models/currencyAccount';
import { UserModel } from '../../models/userModel';
import { UserService } from '../../services/user.service';
import { UserDto } from '../../models/dtos/userDto';
import { error } from 'console';
import { UserForRegisterAccountDto } from '../../models/dtos/userForRegisterAccountDto';
import { UserRelationshipDto } from '../../models/dtos/userRelationshipDto';
import { AdminCompaniesForUserDto } from '../../models/dtos/adminCompaniesForUserDto';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit {
  [x: string]: any;
  @Inject("validHatasi") private validHatasi: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  userOperationClaims: UserOperationClaimModel[] = [];
  users: UserModel[] = [];
  userForRegisterToSecondAccountDto: UserForRegisterAccountDto;
  usersRelationShipDto: UserRelationshipDto[] = [];
  userRelationShipDto: UserRelationshipDto;
  adminCompaniesForUserDto: AdminCompaniesForUserDto[] = [];

  operationAdd = false;
  operationUpdate = false;
  operationDelete = false;
  operationGet = false;
  operationList = false;
  searchString: string;
  isAuthenticated: boolean;
  companyId: string;
  userId: string;
  title = "Kulanıcı Listesi";
  userIsActived: string;
  activeUser: boolean;
  //passiveList: boolean = false;

  //Form Gruplarını Tanımlama
  updatedForm: FormGroup;
  addedForm: FormGroup;
  //NgModel ile verileri almak için değişkenleri tanımlama
  name: string = "";
  email: string = "";
  password: string = "";
  // role:number;

  userInfo: UserDto = {
    name: "",
    email: "",
    id: 0,
    isActive: true,
    addedAt: '',
    password: ""
  };
  selectCompany: number = 0;

  constructor(
    private authService: AuthService,
    private currencyAccountService: CurrencyAccountService,
    private swal: SwalService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe,
    private toastr: ToastrService,
    private userOperationClaimService: UserOperationClaimService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
    this.userOperationClaimGetList();
    //this.getUserList();
    this.getAdminUsersList();

    //#region Tanımlanan Form gruplarını çağırma
    this.createUpdateForm();
    this.createAddForm();
    //#endregion


  }

  exportExcel() {
    let element = document.getElementById('excelTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
    XLSX.writeFile(wb, 'KullanıcıListesi.xlsx');
  }

  refresh() {
    if (typeof window !== 'undefined') {
      if (this.isAuthenticated) {
        let token = localStorage.getItem('token');
        let decode = this.jwtHelper.decodeToken(token);
        let name = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
        let companyName = Object.keys(decode).filter((x) => x.endsWith('/ispersistent'))[0];
        let companyId = Object.keys(decode).filter((x) => x.endsWith('/anonymous'))[0];
        let userId = Object.keys(decode).filter((x) => x.endsWith('/nameidentifier'))[0];
        // let role = Object.keys(decode).filter((x) => x.endsWith('/role'))[0];
        this.companyId = decode[companyId];
        this.userId = decode[userId];
        // this.role = decode[role];

        //console.log(decode);

      }
    }
  }

  clearInput() {
    this.name = "";
    this.email = "";
    this.password = "";
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
        if (value.operationClaimId == "33") { this.operationUpdate = true; }

        if (value.operationClaimId == "52") { this.operationAdd = true; }

        if (value.operationClaimId == "51") { this.operationList = true; }
      })

    }, (err) => {
      this.toastr.error("Bir hata oluştu.");
    });

  }

  getUserList() {
    this.userService.getUserList(this.companyId).subscribe((res) => {
      this.users = res.data;
      //console.log(res.data);
    }, (err) => {
      //this.toastr.error(err.error);
      console.log(err.error);
    })
  }

  getAdminUsersList() {
    this.userService.getAdminUserList(this.userId).subscribe((res) => {
      this.usersRelationShipDto = res.data;
      //console.log(this.usersRelationShipDto);
    }, (err) => {
      //this.toastr.error(err.error);
      console.log(err.error);
    })
  }

  userCompanyAdd(userUserId: number, companyId: number) {

  }

  getUser(userId: number) {
    this.userService.getbyid(userId).subscribe((res) => {
      this.updatedForm.controls["name"].setValue(res.data.name);
      this.updatedForm.controls["id"].setValue(res.data.id);
      this.updatedForm.controls["isActive"].setValue(res.data.isActive);
      this.updatedForm.controls["email"].setValue(res.data.email);
      //this.updatedForm.controls["password"].setValue(res.data.password);

      //console.log(res.data.password);

    }, (err) => {
      this.toastr.error(err.message);
    }
    )
  }
  getUserCompanyList(userId: number) {
    this.userService.getUserCompanyList(userId).subscribe((res) => {
      this.usersRelationShipDto = res.data;
      this.getAdminCompanyList(this.userId, userId);
    }, (err) => {
      this.toastr.error(err.message);
    })

  }
  createUpdateForm() {
    this.updatedForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ["", Validators.required],
      email: ["", Validators.required],
      isActive: [true],
      password: ["",]
    });
  }
  createAddForm() {
    this.addedForm = this.formBuilder.group({
      id: [0, Validators.required],
      name: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required],
      companyId: [this.companyId, Validators.required],
      adminUserId: [this.userId, Validators.required]
    })

  }
  // changeStatus(id:number) {
  //   this.userService.changeStatus(id).subscribe((res)=>{
  //     this.swal.callToast(res.message,'success');
  //     this.userGetList();
  //   },(err) => {
  //     this.swal.callToastError(this.validHatasi);
  //   })
  // }
  changeStatus(id: number) {
    this.swal.callSwal("Durumu Değiştir", "Durumu pasif/aktif güncellemek istediğinize emin misiniz?", () => {
      this.userService.changeStatus(id).subscribe((res) => {
        this.swal.callToast(res.message, 'success');
        this.getUserList();
      }, (err) => {
        this.swal.callToastError(this.validHatasi);
      })
    });
  }

  changeStatusUserCompany(userId: number, companyId: number) {
    this.swal.callSwal("Bağlantıyı Pasife Al", "Şirket ile bağlantıyı pasife almak istiyor musunuz?", () => {
      this.userService.deleteUserCompanyId(userId, companyId).subscribe((res) => {
        this.swal.callToast(res.message, 'success');
        this.getUserCompanyList(userId);
      }, (err) => {
        this.swal.callToastError(this.validHatasi);
      })
    })
  }


  updateUser() {
    if (this.updatedForm.valid) {
      let userModel = Object.assign({}, this.updatedForm.value);
      this.userService.update(userModel).subscribe((res) => {
        this.createUpdateForm();
        this.getAdminUsersList();
        this.swal.callToast(res.message);
        document.getElementById("updateUserModal").click();
      }, (err) => {
        this.swal.callToastError(this.validHatasi);
      })
    }

  }

  addUser() {
    if (this.addedForm.valid) {
      let userModel = Object.assign({}, this.addedForm.value);
      this.userService.register(userModel).subscribe((res) => {
        this.swal.callToast(res.message);
        this.createAddForm();
        this.clearInput();
        this.getAdminUsersList();
        document.getElementById("addUserModal").click();
      }, (err) => {
        this.toastr.error(err.error);
      })
    }
    else {
      this.toastr.error(this.validHatasi);
    }
  }

  changeInputClass(text: string) {
    if (text != "") {
      return "input-group input-group-outline is-valid my-3"
    } else {
      return "input-group input-group-outline is-invalid my-3"
    }
  }

  getAdminCompanyList(adminUserId: string, userUserId: number) {
    this.userService.getAdminCompaniesForUser(adminUserId, userUserId).subscribe((res) => {
      this.adminCompaniesForUserDto = res.data;
      //console.log(this.adminCompaniesForUserDto);
    }, (err) => {
      this.toastr.error(err.message);
    })

  }
}
