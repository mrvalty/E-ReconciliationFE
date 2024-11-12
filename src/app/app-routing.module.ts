import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { loginGuard } from './guards/login.guard';
import { RegisterComponent } from './components/register/register.component';
import { ConfirmComponent } from './components/register/confirm/confirm.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { CurrencyAccountComponent } from './components/currency-account/currency-account.component';
import { UserComponent } from './components/user/user.component';
import { UserOperationClaimService } from './services/user-operation-claim.service';
import { UserOperationClaimComponent } from './components/user/user-operation-claim/user-operation-claim.component';
import { CompanyComponent } from './components/company/company.component';

const routes: Routes = [
  {path:'',component:HomeComponent,canActivate:[loginGuard]},
  {path:'user',component:UserComponent,canActivate:[loginGuard]},
  {path:'currency-account',component:CurrencyAccountComponent,canActivate:[loginGuard]},
  {path:'user-operation-claim',component:UserComponent,canActivate:[loginGuard]},
  {path:'user-operation-claim/:value',component:UserOperationClaimComponent,canActivate:[loginGuard]},
  {path:'login',component:LoginComponent},
  {path:'company',component:CompanyComponent,canActivate:[loginGuard]},
  {path:'register',component:RegisterComponent},
  {path:'registerConfirm',component:LoginComponent},
  {path:'registerConfirm/:value',component:ConfirmComponent},
  {path:'forgot-password/:value',component:ForgotPasswordComponent},
  {path:'forgot-password',component:LoginComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
