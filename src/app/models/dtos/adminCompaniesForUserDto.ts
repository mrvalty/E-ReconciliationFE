import { CompanyModel } from "../companyModel";

export interface AdminCompaniesForUserDto {
  isThere: boolean;
  company: CompanyModel;
}
