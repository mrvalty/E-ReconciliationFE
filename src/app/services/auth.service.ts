import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterDto } from '../models/dtos/registerDto';
import { TermsandCondition } from '../models/termsandCondition';
import { ResponseModel } from '../models/responseModel';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string;

  constructor(private httpClient: HttpClient) { }
  register(registerDto: RegisterDto) {
    let api = "https://localhost:7256/api/auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,registerDto)

  }
  login(loginModel: LoginModel) {
    let api = "https://localhost:7256/api/auth/login" //hangi apiyi çağıracağımızı belirliyoruz.
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api, loginModel)
  }

  isAuthenticated() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  getTermsandCondition(){
    let api = "https://localhost:7256/api/TermsandCondition/get";
    return this.httpClient.get<SingleResponseModel<TermsandCondition>>(api)
  }

  sendConfirmEmail(email:string){

    let api = "https://localhost:7256/api/auth/sendConfirmEmail?email=" + email;
    return this.httpClient.get<ResponseModel>(api)

  }
}
