import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import {Route, Routes} from '@angular/router'
import { AuthGuard } from "./_services/authGuard";
import { SearchComponent } from "./search/search.component";
import { DeleteAccountComponent } from "./delete-account/delete-account.component";
import { PasswordresetComponent } from "./passwordreset/passwordreset.component";
import { BugReportComponent } from "./bug-report/bug-report.component";

export const appRoutes: Routes =[
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'myaccount', component: MyAccountComponent, canActivate: [AuthGuard]},
    {path: 'search', component: SearchComponent},
    {path: 'passwordreset', component: PasswordresetComponent},
    {path: 'bugreport', component: BugReportComponent},
    {path: '**', redirectTo:'home'}
]