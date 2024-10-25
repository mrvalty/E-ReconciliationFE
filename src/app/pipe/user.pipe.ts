import { Pipe, PipeTransform } from '@angular/core';
import { UserModel } from '../models/userModel';
import { UserRelationshipDto } from '../models/dtos/UserRelationshipDto';

@Pipe({
  name: 'userPipes'
})
export class UserPipe implements PipeTransform {

  transform(value: UserRelationshipDto[], searchString:string): UserRelationshipDto[] {
    if(!searchString){
      return value;
    }

    return value.filter(x=>x.userMail.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) || x.userUserName.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()));

  }
}


