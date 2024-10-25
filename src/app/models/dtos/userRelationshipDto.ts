import { CompanyModel } from "../companyModel";

export interface UserRelationshipDto{
  id:number;
  adminUserName:string;
  adminMail:string;
  adminAddedAt:string;
  adminIsActive:string;
  userUserId:number;
  userUserName:string;
  userMail:string;
  userAddedAt:string;
  userMailValue:string;
  userIsActive:string;
  companies: CompanyModel[];
}
