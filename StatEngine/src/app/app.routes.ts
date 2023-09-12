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
import { BugReportSuccessComponent } from "./bug-report-success/bug-report-success.component";
import { ViewFriendlistComponent } from "./view-friendlist/view-friendlist.component";

export const appRoutes: Routes =[
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'myaccount', component: MyAccountComponent, canActivate: [AuthGuard]},
    {path: 'search', component: SearchComponent, canActivate: [AuthGuard]},
    {path: 'passwordreset', component: PasswordresetComponent},
    {path: 'bugreport', component: BugReportComponent, canActivate: [AuthGuard]},
    {path: 'bugreportsuccess', component: BugReportSuccessComponent, canActivate: [AuthGuard]},
    {path: 'viewfriendlist', component: ViewFriendlistComponent, canActivate: [AuthGuard]},
    {path: '**', redirectTo:'home'}
]