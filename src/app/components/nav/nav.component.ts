import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaimService } from '../../services/user-operation-claim.service';
import { UserOperationClaimModel } from '../../models/userOperationClaimModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserRelationshipDto } from '../../models/dtos/userRelationshipDto';
import { CompanyService } from '../../services/company.service';
import { CompanyModel } from '../../models/companyModel';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  isAuthenticated: boolean = false;
  jwtHelper: JwtHelperService = new JwtHelperService();
  companyName: string = "";
  userId:string;
  companyId:string;
  companies:CompanyModel[] = [];
  role:number;


  constructor(
    private toastr: ToastrService,
    private router:Router,
    private authService:AuthService,
    private companyService:CompanyService

  ) {

  }
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
    this.getUserCompanyList();
  }

  refresh() {
    if (typeof window !== 'undefined') {
      if (this.isAuthenticated) {
        let token = localStorage.getItem('token');
        let decode = this.jwtHelper.decodeToken(token);
        let name = Object.keys(decode).filter((x) => x.endsWith('/name'))[0];
        let companyName = Object.keys(decode).filter((x) => x.endsWith('/ispersistent'))[0];
        this.companyName = decode[companyName];
        let companyId = Object.keys(decode).filter((x) => x.endsWith('/anonymous'))[0];
        let userId = Object.keys(decode).filter((x) => x.endsWith('/nameidentifier'))[0];
        let role = Object.keys(decode).filter((x) => x.endsWith('/role'))[0];
        this.companyId = decode[companyId];
        this.userId = decode[userId];
        this.role = decode[role];

        console.log(decode);
      }
    }
  }

  getUserCompanyList() {
    this.companyService.getCompanyListByUserid(this.userId).subscribe((res) => {
      this.companies = res.data;
    }, (err) => {
      this.toastr.error(err.message);
    })

  }

  logOut() {
    if(typeof window !== 'undefined'){
      localStorage.removeItem("token");
    }

    this.toastr.success("Çıkış İşlemi Başarılı.");
    this.router.navigateByUrl("/login");
    this.isAuthenticated = false;
  }

}
