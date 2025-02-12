import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { HomepageComponent } from './homepage/homepage.component'; 
import { EmployerRegisterComponent } from './EMP-Components/employer-register/employer-register.component';
import { EmployerListComponent } from './EMP-Components/employer-list/employer-list.component';
import { EmployerEditComponent } from './EMP-Components/employer-edit/employer-edit.component';
import { RegisterCompanyComponent } from './COM-Components/register-company/register-company.component';
import { ListCompanyComponent } from './COM-Components/list-company/list-company.component';
import { UpdateCompanyComponent } from './COM-Components/update-company/update-company.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployerRegisterComponent,
    EmployerListComponent,
    EmployerEditComponent,
    HeaderComponent,
    HomepageComponent,
    RegisterCompanyComponent,
    ListCompanyComponent,
    UpdateCompanyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
