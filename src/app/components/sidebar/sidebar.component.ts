import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from '../../services/auth.service';
import { decode } from 'punycode';
import { Router } from '@angular/router';

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

  constructor(
    private authService: AuthService,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.isAuthenticated = this.authService.isAuthenticated();
    this.router.routerState.snapshot.url
    this.refresh();
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

}
