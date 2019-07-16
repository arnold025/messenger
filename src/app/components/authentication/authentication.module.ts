import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BaseComponent } from './base/base.component';

const childrenRoutes: Routes = [
  {path: '', component: BaseComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: LoginComponent }
];

const routes: Routes = [
  { path: '', children: childrenRoutes }
];

@NgModule({
  declarations: [LoginComponent, RegisterComponent, BaseComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthenticationModule { }
