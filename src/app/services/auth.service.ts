import { HttpClient } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { LoginModel } from '../models/loginModel';
import { SingleResponseModel } from '../models/singleResponseModel';
import { TokenModel } from '../models/tokenModel';
import { RegisterDto } from '../models/dtos/registerDto';
import { TermsandCondition } from '../models/termsandCondition';
import { ResponseModel } from '../models/responseModel';
import { ForgotPasswordDto } from '../models/dtos/forgotPasswordDto';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public redirectUrl: string;

  constructor(
    @Inject('apiUrl') private apiUrl:string,
    private httpClient: HttpClient
  )
  { }
  register(registerDto: RegisterDto) {
    let api = this.apiUrl +"auth/register"
    return this.httpClient.post<SingleResponseModel<TokenModel>>(api,registerDto)

  }
  login(loginModel: LoginModel) {
    let api = this.apiUrl + "auth/login" //hangi apiyi çağıracağımızı belirliyoruz.
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
    let api = this.apiUrl + "TermsandCondition/get";
    return this.httpClient.get<SingleResponseModel<TermsandCondition>>(api)
  }

  sendConfirmEmail(email:string){

    let api = this.apiUrl + "auth/sendConfirmEmail?email=" + email;
    return this.httpClient.get<ResponseModel>(api)

  }

  confirmUser(value:string){

    let api = this.apiUrl + "auth/confirmuser?value=" + value;
    return this.httpClient.get<ResponseModel>(api)

  }
  sendForgotPassword(email:string){

    let api = this.apiUrl + "auth/forgotPassword?email=" + email;
    return this.httpClient.get<ResponseModel>(api)

  }

  confirmForgotPasswordValue(value:string){
    let api = this.apiUrl + "auth/forgotPasswordLinkCheck?value=" + value;  //Back-end tarafındaki api/controller ı bağlanır
    return this.httpClient.get(api)
  }

  changePasswordToForgotPassword(forgotPasswordDto:ForgotPasswordDto){
    let api = this.apiUrl + "auth/changePasswordToForgotPassword"; //Back-end tarafındaki api/controller ı bağlanır
    return this.httpClient.post<ResponseModel>(api,forgotPasswordDto)
  }
}
