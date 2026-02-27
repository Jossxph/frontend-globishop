import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { VerifyComponent } from './pages/verify/verify.component';
import { RecoverPasswordComponent } from './pages/recover-password/recover-password.component';

export const AUTH_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify', component: VerifyComponent },
    { path: 'recover-password', component: RecoverPasswordComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];
