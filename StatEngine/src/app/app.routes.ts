import { HomeComponent } from "./home/home.component";
import { RegisterComponent } from "./register/register.component";
import { LoginComponent } from "./login/login.component";
import {Route, Routes} from '@angular/router'
import { SearchComponent } from "./search/search.component";
import { DeleteAccountComponent } from "./delete-account/delete-account.component";


export const appRoutes: Routes =[
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'search', component: SearchComponent},
    {path: 'DeleteAccount', component: DeleteAccountComponent},
    {path: '**', redirectTo:'home'}
]