import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ValidateTokenGuard } from './guards/validate-token.guard';
import { IsLoggedGuard } from './guards/is-logged.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( module => module.AuthModule ),
    canActivate: [ IsLoggedGuard ],
    canLoad: [ IsLoggedGuard ]
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then( module => module.ProtectedModule ),
    canActivate: [ ValidateTokenGuard ],
    canLoad: [ ValidateTokenGuard ]
  },
  {
    path: '**',
    redirectTo: 'auth'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
