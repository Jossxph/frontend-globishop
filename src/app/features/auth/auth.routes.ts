import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { authGuard } from '../../core/guards/auth.guard';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

export const AUTH_ROUTES: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'verify', component: VerifyComponent },
    { path: 'recover-password', component: RecoverPasswordComponent },
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];