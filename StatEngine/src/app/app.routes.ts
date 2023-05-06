import { Routes } from "@angular/router";

import { LoginPageComponent } from "./login-page/login-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { HomePageComponent } from "./home-page/home-page.component";
import { RegisterPageComponent } from "./register-page/register-page.component";
import { SearchPlayerComponent } from "./search-player/search-player.component";
import { BugReportComponent } from "./bug-report/bug-report.component";
export const appRoutes: Routes = [
    {path:'login', component: LoginPageComponent},
    {path:'register-page', component: RegisterPageComponent},
    {path:'landing-page', component: LandingPageComponent},
    //{path: '**', component: HomePageComponent},
    {path: 'home-page', component: HomePageComponent},
    {path: 'search-player', component: SearchPlayerComponent},
    {path: 'bug-report', component:BugReportComponent}
]