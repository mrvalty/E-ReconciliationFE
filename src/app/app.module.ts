import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './components/register/register.component';
import { APP_BASE_HREF, DatePipe } from '@angular/common';
import { ConfirmComponent } from './components/register/confirm/confirm.component';
import { ForgotPasswordComponent } from './components/login/forgot-password/forgot-password.component';
import { NavComponent } from './components/nav/nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { CurrencyAccountComponent } from './components/currency-account/currency-account.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { CurrencyAccountPipe } from './pipe/currency-account.pipe';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { UserComponent } from './components/user/user.component';
import { UserPipe } from './pipe/user.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    ConfirmComponent,
    ForgotPasswordComponent,
    NavComponent,
    SidebarComponent,
    CurrencyAccountComponent,
    CurrencyAccountPipe,
    UserComponent,
    UserPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      progressBar:true,
      closeButton:true,
    }),
    SweetAlert2Module,
  ],
  providers: [
    {provide :'apiUrl',useValue:'https://localhost:7256/api/'},  //kullanılan apiyi static hale getirmek
    {provide :'validHatasi',useValue:'Zorunlu Alanları Giriniz'},
    {provide:APP_BASE_HREF,useValue:'/'},
    {provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    [DatePipe]
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
