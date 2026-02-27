import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VerifyComponent } from './verify/verify.component';
import { authGuard } from '../../core/guards/auth.guard';
import { RecoverPasswordComponent } from './recover-password/recover-password.component';

export const AUTH_ROUTES: Routes = [
    // RUTA PARA INICIAR SESIÓN (PANTALLA DE ACCESO)
    { path: 'login', component: LoginComponent },

    // PANTALLA DE REGISTRO DE NUEVOS USUARIOS
    { path: 'register', component: RegisterComponent },

    // PANTALLA PARA INGRESAR EL CÓDIGO DE VERIFICACIÓN QUE LLEGA AL CORREO
    { path: 'verify', component: VerifyComponent },

    // FLUJO DE RECUPERACIÓN DE CONTRASEÑA (WIZARD DE 3 PASOS) :V
    { path: 'recover-password', component: RecoverPasswordComponent },

    // SI ENTRAN A "/AUTH" SIN NADA MÁS, LOS REDIRIGE AL LOGIN POR DEFECTO XD
    { path: '', redirectTo: 'login', pathMatch: 'full' }
];