import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { decode } from 'punycode';
import { Router } from '@angular/router';
import { UserOperationClaimService } from '../../services/user-operation-claim.service';
import { UserOperationClaimModel } from '../../models/userOperationClaimModel';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit {

  jwtHelper: JwtHelperService = new JwtHelperService;
  isAuthenticated: boolean = false;
  name: string = "";
  companyName: string = "";
  currentUrl: string = "";
  companyId: string;
  userId: string;
  userOperationClaims: UserOperationClaimModel[] = [];

  currencyAccount = false;
  user = false;
  company = false;
  mailParameter = false;
  mailTemplate = false;
  accountReconciliation = false;
  baBsReconciliation = false;



  constructor(
    private authService: AuthService,
    private router: Router,
    private userOperationClaimService: UserOperationClaimService,
    private toastr: ToastrService

  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.router.routerState.snapshot.url
    this.refresh();
    this.userOperationClaimGetList();
  }

  refresh() {
    if (typeof window !== 'undefined') {
      if (this.isAuthenticated) {
        let token = localStorage.getItem("token");
        let decode = this.jwtHelper.decodeToken(token);
        let name = Object.keys(decode).filter(x => x.endsWith("/name"))[0];
        let companyName = Object.keys(decode).filter(x => x.endsWith("/ispersistent"))[0];
        this.name = decode[name];
        this.companyName = decode[companyName];
        let companyId = Object.keys(decode).filter((x) => x.endsWith('/anonymous'))[0];
        let userId = Object.keys(decode).filter((x) => x.endsWith('/nameidentifier'))[0];
        this.companyId = decode[companyId];
        this.userId = decode[userId];

        //console.log(decode);


      }
    }
  }
  changePage(url: string) {
    this.currentUrl = this.router.routerState.snapshot.url;
    if (url == this.currentUrl) {
      return "nav-link text-white active bg-gradient-primary";
    }
    else {
      return "nav-link text-white";
    }

  }



  userOperationClaimGetList() {
    this.userOperationClaimService.getList(this.userId, this.companyId).subscribe((res) => {
      this.userOperationClaims = res.data;
      //console.log(res.data);

      this.userOperationClaims.forEach(value => {

        if (value.operationClaimId == "1") {
          this.currencyAccount = true;
          this.user = true;
          this.company = true;
          this.mailParameter = true;
          this.mailTemplate = true;
          this.accountReconciliation = true;
          this.baBsReconciliation = true;
        }
        if (value.operationClaimId == "44") { this.currencyAccount = true; }
        if (value.operationClaimId == "45") { this.user = true; }
        if (value.operationClaimId == "46") { this.company = true; }
        if (value.operationClaimId == "47") { this.mailParameter = true; }
        if (value.operationClaimId == "48") { this.mailTemplate = true; }
        if (value.operationClaimId == "49") { this.accountReconciliation = true; }
        if (value.operationClaimId == "50") { this.baBsReconciliation = true; }
      })

    }, (err) => {
      this.toastr.error("Bir hata oluştu.");
    });

  }

}
