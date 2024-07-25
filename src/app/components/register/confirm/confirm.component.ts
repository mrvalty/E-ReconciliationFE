import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute, Route, Router } from '@angular/router';

@Component({
  selector: 'app-confirm',
  templateUrl: './confirm.component.html',
  styleUrl: './confirm.component.css'
})
export class ConfirmComponent implements OnInit {

  isSuccess = true;
  isActive = false;
  message:string="";

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router

  ) { }




  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {

      this.confirmMail(p["value"]);
    })
  }

  confirmMail(value: string)
  {
    this.authService.confirmUser(value).subscribe((res) => {
      this.isActive = true;
      this.isSuccess = true;
    },(err)=>{
      this.isActive = true;
      this.isSuccess = false;
      this.message = err.error;
    })
  }

}
