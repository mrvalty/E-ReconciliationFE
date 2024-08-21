import { Pipe, PipeTransform } from '@angular/core';
import { log } from 'console';
import { CurrencyAccount } from '../models/currencyAccount';

@Pipe({
  name: 'currencyAccountPipes'
})
export class CurrencyAccountPipe implements PipeTransform {

  transform(value: CurrencyAccount[], searchString:string): CurrencyAccount[]{
    if(!searchString){
      return value;
    }

  console.log(value);

  return value.filter(x=>x.email.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) || x.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()));


    // return value.filter(x=>{
    //   const code = x.code.toLowerCase().toString().includes(searchString.toLocaleLowerCase())
    //   const name = x.name.toLowerCase().toString().includes(searchString.toLocaleLowerCase())
    //   const address = x.address.toLowerCase().toString().includes(searchString.toLocaleLowerCase())
    //   // const taxDepartment = x.taxDepartment.toLowerCase().toString().includes(searchString.toLocaleLowerCase())
    //   // const taxIdNumber = x.taxIdNumber.toLowerCase().toString().includes(searchString.toLocaleLowerCase())
    //   // const identityNumber = x.identityNumber.toLowerCase().toString().includes(searchString.toLocaleLowerCase())
    //   const email = x.email.toLowerCase().toString().includes(searchString.toLocaleLowerCase())
    //   const authorized = x.authorized.toLowerCase().toString().includes(searchString.toLocaleLowerCase())
    //   //const addedAt = x.addedAt.toLowerCase().toString().includes(searchString.toLocaleLowerCase())




    // })
  }

}
