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

  constructor(
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router:Router

  ) { }




  ngOnInit(): void {
    this.activatedRoute.params.subscribe(p => {
      console.log(p["value"]);
    })
  }

}
