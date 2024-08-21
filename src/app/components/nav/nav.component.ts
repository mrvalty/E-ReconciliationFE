import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit {

  isAuthenticated: boolean = false;

  constructor(private toastr: ToastrService,
    private router:Router
  ) {

  }
  ngOnInit(): void {
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
