import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import { MyAccountComponent } from "./my-account/my-account.component";
import {Route, Routes} from '@angular/router'
import { AuthGuard } from "./_services/authGuard";

import { DeleteAccountComponent } from "./delete-account/delete-account.component";
import { PasswordresetComponent } from "./passwordreset/passwordreset.component";
import { BugReportComponent } from "./bug-report/bug-report.component";
import { BugReportSuccessComponent } from "./bug-report-success/bug-report-success.component";
import { FavoritesComponent } from "./favorites/favorites.component";
import { UserComponent } from "./user/user.component";

export const appRoutes: Routes =[
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'myaccount', component: MyAccountComponent, canActivate: [AuthGuard]},
    {path: 'passwordreset', component: PasswordresetComponent, canActivate: [AuthGuard]},
    {path: 'bugreport', component: BugReportComponent, canActivate: [AuthGuard]},
    {path: 'bugreportsuccess', component: BugReportSuccessComponent, canActivate: [AuthGuard]},
    {path: 'favorites', component:FavoritesComponent, canActivate: [AuthGuard]},
    {path: 'user/:userid', component:UserComponent},
    {path: '**', redirectTo:'home'}
]