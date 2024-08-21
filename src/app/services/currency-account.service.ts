import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { CurrencyAccount } from '../models/currencyAccount';
import { ResponseModel } from '../models/responseModel';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CurrencyAccountService {

  constructor(
    @Inject('apiUrl') private apiUrl: string,
    private httpClient: HttpClient
  ) { }


  getList(companyId: string): Observable<ListResponseModel<CurrencyAccount>> {
    let api = this.apiUrl + "CurrencyAccount/getlist?companyId=" + companyId;
    return this.httpClient.get<ListResponseModel<CurrencyAccount>>(api);
  }

  delete(currencyAccount : CurrencyAccount):Observable<ResponseModel>{
    let api = this.apiUrl + "CurrencyAccount/delete";
    return this.httpClient.post<ResponseModel>(api,currencyAccount);
  }

  add(currencyAccount : CurrencyAccount):Observable<ResponseModel>{
    let api = this.apiUrl + "CurrencyAccount/add";
    return this.httpClient.post<ResponseModel>(api,currencyAccount);
  }

  getbyid(currencyId:number):Observable<SingleResponseModel<CurrencyAccount>>{
    let api = this.apiUrl + "CurrencyAccount/getbyid?id=" +currencyId;
    return this.httpClient.get<SingleResponseModel<CurrencyAccount>>(api);
  }

  update(currencyAccount : CurrencyAccount):Observable<ResponseModel>{
    let api = this.apiUrl + "CurrencyAccount/update";
    return this.httpClient.post<ResponseModel>(api,currencyAccount);
  }

  addFromExcel(file:any,companyId : string):Observable<ResponseModel>{
    let api = this.apiUrl + "CurrencyAccount/addFromExcel?companyId=" + companyId;

    const formData = new FormData;
    formData.append("file",file,file.name);

    return this.httpClient.post<ResponseModel>(api,formData);
  }
}
