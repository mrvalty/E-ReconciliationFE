import { CompanyModel } from "../companyModel";
import { RegisterModel } from "../registerModel";

export interface RegisterDto {
  userForRegister:RegisterModel;
  company:CompanyModel;
}
