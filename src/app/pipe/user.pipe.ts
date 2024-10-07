import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/userModel';

@Pipe({
  name: 'userPipes'
})
export class UserPipe implements PipeTransform {

  transform(value: UserModel[], searchString:string): UserModel[] {
    if(!searchString){
      return value;
    }

    return value.filter(x=>x.email.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) || x.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()));

  }
}


