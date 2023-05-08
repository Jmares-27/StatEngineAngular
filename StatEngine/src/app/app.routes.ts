import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import {Route, Routes} from '@angular/router'

export const appRoutes: Routes =[
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'myaccount', component: MyAccountComponent},
    {path: '**', redirectTo:'home'}
]