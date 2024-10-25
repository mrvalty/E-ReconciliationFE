import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDto } from '../models/dtos/userDto';
import { ResponseModel } from '../models/responseModel';
import { UserForRegisterAccountDto } from '../models/dtos/userForRegisterAccountDto';
import { OperationClaimForUserListDto } from '../models/dtos/operationClaimForUserListDto';
import { UserRelationshipDto } from '../models/dtos/userRelationshipDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('apiUrl')
  private apiUrl:string,
  private httpClient: HttpClient) { }

  getUserList(companyId:string):Observable<ListResponseModel<UserModel>>{
    let api = this.apiUrl + "users/getUserList?companyId=" + companyId;
    return this.httpClient.get<ListResponseModel<UserModel>>(api);
  }

  getAdminUserList(adminUserId:string):Observable<ListResponseModel<UserRelationshipDto>>{
    let api = this.apiUrl + "users/getAdminUserList?adminUserId=" + adminUserId;
    return this.httpClient.get<ListResponseModel<UserRelationshipDto>>(api);
  }

  getbyid(userId:number):Observable<SingleResponseModel<UserDto>>{
    let api = this.apiUrl + "users/getbyid?userid=" + userId;
    return this.httpClient.get<SingleResponseModel<UserDto>>(api);
  }

  update(userInfo : UserDto):Observable<ResponseModel>{
    let api = this.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(api,userInfo);
  }
  register(registerDto: UserForRegisterAccountDto):Observable<ResponseModel>{
    let api = this.apiUrl + "auth/registerSecondAccount";
    return this.httpClient.post<ResponseModel>(api,registerDto);
  }

  changeStatus(id:number):Observable<ResponseModel>{
    let api = this.apiUrl + "users/changeStatus?id=" + id;
    return this.httpClient.get<ResponseModel>(api);
  }

  getOperationClaimForUser(value: string, companyId:string):Observable<ListResponseModel<OperationClaimForUserListDto>>{
    let api = this.apiUrl + "users/getOperationClaimUser?value=" + value + "&companyId=" + companyId;
    return this.httpClient.get<ListResponseModel<OperationClaimForUserListDto>>(api)
  }

  updateOperationClaim(operationClaimForUserListDto: OperationClaimForUserListDto):Observable<ResponseModel>{
    let api = this.apiUrl + "users/updateOperationClaim";
    return this.httpClient.post<ResponseModel>(api,operationClaimForUserListDto);
  }

}
