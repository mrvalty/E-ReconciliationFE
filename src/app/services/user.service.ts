import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { UserModel } from '../models/userModel';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { UserDto } from '../models/userDto';
import { ResponseModel } from '../models/responseModel';
import { UserForRegisterToSecondAccountDto } from '../models/dtos/UserForRegisterToSecondAccountDto';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(@Inject('apiUrl')
  private apiUrl:string,
  private httpClient: HttpClient) { }

  getUserList(companyId:string):Observable<ListResponseModel<UserModel>>{
    let api = this.apiUrl + "users/getUserList?companyId=" +companyId;
    return this.httpClient.get<ListResponseModel<UserModel>>(api);
  }

  getbyid(userId:number):Observable<SingleResponseModel<UserDto>>{
    let api = this.apiUrl + "users/getbyid?userid=" + userId;
    return this.httpClient.get<SingleResponseModel<UserDto>>(api);
  }

  update(userInfo : UserDto):Observable<ResponseModel>{
    let api = this.apiUrl + "users/update";
    return this.httpClient.post<ResponseModel>(api,userInfo);
  }
  register(registerDto: UserForRegisterToSecondAccountDto):Observable<ResponseModel>{
    let api = this.apiUrl + "auth/registerSecondAccount";
    return this.httpClient.post<ResponseModel>(api,registerDto);
  }
}
