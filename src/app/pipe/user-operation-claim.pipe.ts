import { Pipe, PipeTransform } from '@angular/core';
import { OperationClaimForUserListDto } from '../models/dtos/operationClaimForUserListDto';

@Pipe({
  name: 'userOperationClaimPipes'
})
export class UserOperationClaimPipe implements PipeTransform {

  transform(value: OperationClaimForUserListDto[], searchString:string): OperationClaimForUserListDto[] {
    if(!searchString){
      return value;
    }

    return value.filter(x=>x.description.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()) || x.name.toLocaleLowerCase().includes(searchString.toLocaleLowerCase()));

  }

}
