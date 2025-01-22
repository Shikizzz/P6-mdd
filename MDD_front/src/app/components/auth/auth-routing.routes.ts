import { Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { RegisterComponent } from "./register/register.component";
import { HomeComponent } from "./home/home.component";

export const routes: Routes = [
    { title: 'Home', path: '', component: HomeComponent },
    { title: 'Login', path: 'login', component: LoginComponent },
    { title: 'Register', path: 'register', component: RegisterComponent }
];