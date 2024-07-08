import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { DashoardComponent } from './dashoard/dashoard.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'login', title: 'Login', component: LoginComponent },
    { path: 'register', title: 'Register', component: RegisterComponent},
    { path: 'dashboard', title: 'Dashoard', component: DashoardComponent}
];