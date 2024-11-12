import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { UserRelationshipDto } from '../models/dtos/userRelationshipDto';
import { CompanyModel } from '../models/companyModel';
import { ResponseModel } from '../models/responseModel';
import { CompanyDto } from '../models/dtos/companyDto';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(@Inject('apiUrl')
  private apiUrl:string,
  private httpClient: HttpClient) { }

  getCompanyListByUserid(userId:string):Observable<ListResponseModel<CompanyModel>>{
    let api = this.apiUrl + "company/getCompanyListByUserid?userId=" + userId;
    return this.httpClient.get<ListResponseModel<CompanyModel>>(api);
  }

  changeStatusCompany(company:CompanyModel):Observable<ResponseModel>{
    let api = this.apiUrl + "company/changeStatusCompany";
    return this.httpClient.post<ResponseModel>(api,company);
  }

  addCompany(company: CompanyDto):Observable<ResponseModel>{
    let api = this.apiUrl + "company/addCompanyAndUserCompany";
    return this.httpClient.post<ResponseModel>(api,company);
  }

  updateCompany(company: CompanyModel):Observable<ResponseModel>{
    let api = this.apiUrl + "company/updateCompany";
    return this.httpClient.post<ResponseModel>(api,company);
  }

  getCompany(companyId:number):Observable<SingleResponseModel<CompanyModel>>{
    let api = this.apiUrl + "company/getcompany?companyId=" +companyId;
    return this.httpClient.get<SingleResponseModel<CompanyModel>>(api);
  }

}
