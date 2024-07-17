import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
 styleClass =""

 changeStyleClass(text:string){
  return ("fixed-plugin " + text);
 }
}
