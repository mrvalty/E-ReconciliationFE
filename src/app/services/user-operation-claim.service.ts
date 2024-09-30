import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { OperationClaimModel } from '../models/operationClaimModel';
import { ListResponseModel } from '../models/listResponseModel';
import { Observable } from 'rxjs';
import { UserOperationClaimModel } from '../models/userOperationClaimModel';

@Injectable({
  providedIn: 'root'
})
export class UserOperationClaimService {

  constructor(@Inject("apiUrl")
  private apiUrl: string,
    private httpClient: HttpClient
  ) { }


  getList(userId: string, companyId: string): Observable<ListResponseModel<UserOperationClaimModel>> {
    let api = this.apiUrl + "UserOperationClaims/getListDto?userId=" + userId + "&companyId=" + companyId;
    return this.httpClient.get<ListResponseModel<UserOperationClaimModel>>(api);
  }

}
