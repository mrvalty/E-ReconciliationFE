import { Pipe, PipeTransform } from '@angular/core';
import { CompanyModel } from '../models/companyModel';

@Pipe({
  name: 'companyPipes'
})
export class CompanyPipe implements PipeTransform {

  transform(value: CompanyModel[], searchString: string): CompanyModel[] {
    if(!searchString){
      return value;
    }

    return value.filter(x=>x.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase())
    || x.address.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()));

  }

}
