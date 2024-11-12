import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class SwalService {

  constructor() { }

  callSwal(title:string,text:string,callBack:()=>void){
    Swal.fire({
      title:title,
      text:text,
      icon:'question',
      showConfirmButton:true,
      confirmButtonText:"Kaydet",
      showCancelButton:true,
      cancelButtonText:"İptal"
    }).then(res=>{
      if(res.isConfirmed){
        //işlemler yapılır.
        callBack();
      }
    })
  }
  callToast(title:string,icon:SweetAlertIcon="success"){
    Swal.fire({
      title:title,
      timer:3000,
      icon:'success',
      showCancelButton:false,
      showCloseButton:false,
      toast:true,
      position: 'top-right',
      showConfirmButton:false

    })
  }
  callToastError(title:string,icon:SweetAlertIcon="error"){
    Swal.fire({
      title:title,
      timer:3000,
      icon:icon,
      showCancelButton:false,
      showCloseButton:false,
      toast:true,
      position: 'top-right',
      showConfirmButton:false

    })
  }

}
export type SweetAlertIcon = 'success' | 'error' | 'warning' | 'info' | 'question'

