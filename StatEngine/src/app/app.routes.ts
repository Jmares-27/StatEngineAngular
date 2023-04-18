import { Routes } from "@angular/router";

import { LoginPageComponent } from "./login-page/login-page.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";

export const appRoutes: Routes = [
    {path:'login', component: LoginPageComponent},
    {path:'landing-page', component: LandingPageComponent},
    {path: '**', component:LandingPageComponent}
]