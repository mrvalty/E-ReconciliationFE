import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserOperationClaimService } from '../../services/user-operation-claim.service';
import { UserOperationClaimModel } from '../../models/userOperationClaimModel';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  isAuthenticated: boolean = false;
  jwtHelper: JwtHelperService = new JwtHelperService();
  companyName: string = "";


  constructor(
    private toastr: ToastrService,
    private router:Router,
    private authService:AuthService

  ) {

  }
  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.refresh();
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

        //console.log(this.companyName);
      }
    }
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
