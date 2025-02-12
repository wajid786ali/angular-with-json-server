import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component'; 
import { EmployerRegisterComponent } from './EMP-Components/employer-register/employer-register.component';
import { EmployerListComponent } from './EMP-Components/employer-list/employer-list.component';
import { EmployerEditComponent } from './EMP-Components/employer-edit/employer-edit.component';
import { RegisterCompanyComponent } from './COM-Components/register-company/register-company.component';
import { ListCompanyComponent } from './COM-Components/list-company/list-company.component';
import { UpdateCompanyComponent } from './COM-Components/update-company/update-company.component';

const routes: Routes = [
  { path: '', redirectTo: 'employer-register', pathMatch: 'full' },
  { path: 'home', component: HomepageComponent },
  { path: 'employer-edit/:id', component: EmployerEditComponent },
  { path: 'employer-register', component: EmployerRegisterComponent },
  { path: 'employer-list', component: EmployerListComponent },
  { path: 'company-edit/:id', component: UpdateCompanyComponent },
  { path: 'company-register', component: RegisterCompanyComponent },
  { path: 'company-list', component: ListCompanyComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
