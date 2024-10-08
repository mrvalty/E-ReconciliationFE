import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { AuthService } from '../../../services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { OperationClaimForUserListDto } from '../../../models/dtos/operationClaimForUserListDto';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { SwalService } from '../../../services/swal.service';

@Component({
  selector: 'app-user-operation-claim',
  templateUrl: './user-operation-claim.component.html',
  styleUrl: './user-operation-claim.component.css'
})
export class UserOperationClaimComponent implements OnInit {
  @Inject("validHatasi") private validHatasi: string;
  jwtHelper: JwtHelperService = new JwtHelperService();
  operationClaimForUserListDto: OperationClaimForUserListDto[] = [];

  searchString: string;
  title: string = "Kullanıcı Yetki Listesi";
  companyId: string;
  value: string;
  isAuthenticated: boolean;
  userId: string;
  selectCompany:string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private authService: AuthService,
    private toastr: ToastrService,
    private swal:SwalService
  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
    this.activatedRoute.params.subscribe(p => {
      this.value = p["value"];
      this.getUserOperationClaim(p["value"], this.companyId);
    })
  }

  refresh() {
    if (this.isAuthenticated) {
      let token = localStorage.getItem('token');
      let decode = this.jwtHelper.decodeToken(token);
      let name = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
      let companyName = Object.keys(decode).filter((x) => x.endsWith('/ispersistent'))[0];
      let companyId = Object.keys(decode).filter((x) => x.endsWith('/anonymous'))[0];
      let userId = Object.keys(decode).filter((x) => x.endsWith('/nameidentifier'))[0];
      this.companyId = decode[companyId];
      this.userId = decode[userId];
    }
  }
  getUserOperationClaim(value: string, companyId: string) {

    this.userService.getOperationClaimForUser(value, companyId).subscribe((res) => {
      this.operationClaimForUserListDto = res.data;
      this.title = res.data[0].userName + " Kullanıcı Yetkileri";
      console.log(res.data);

    }, (err) => {
      this.swal.callToastError("Bir hata ile karşılaştık. Biraz sonra tekrar deneyin")
    })
  }
  updateUserOperationClaim(operationClaim:OperationClaimForUserListDto){
    this.userService.updateOperationClaim(operationClaim).subscribe((res)=>{
      this.toastr.warning(res.message);
      this.getUserOperationClaim(this.value, this.companyId);
    }, (err) => {
      this.toastr.error(err.error)
    })

  }
}
