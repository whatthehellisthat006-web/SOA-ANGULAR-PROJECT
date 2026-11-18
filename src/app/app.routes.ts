import { Routes } from '@angular/router';
import { Vols } from './vols/vols';
import { AddVol } from './add-vol/add-vol';
import { UpdateVol } from './update-vol/update-vol';
import { RechercheParCompagnie } from './recherche-par-compagnie/recherche-par-compagnie';
import { RechercheParNumero } from './recherche-par-numero/recherche-par-numero';
import { ListeCompagnies } from './liste-compagnies/liste-compagnies';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { Register } from './register/register';
import { VerifEmail } from './verif-email/verif-email';
import { authGuard, volGuard } from './guard/vol.guard';

export const routes: Routes = [
  { path: 'vols', component: Vols, canActivate: [authGuard] },
  { path: 'add-vol', component: AddVol, canActivate: [volGuard] },
  { path: 'updateVol/:id', component: UpdateVol, canActivate: [volGuard] },
  { path: 'rechercheParCompagnie', component: RechercheParCompagnie, canActivate: [authGuard] },
  { path: 'rechercheParNumero', component: RechercheParNumero, canActivate: [authGuard] },
  { path: 'listeCompagnies', component: ListeCompagnies, canActivate: [authGuard] },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'verifEmail', component: VerifEmail },
  { path: 'app-forbidden', component: Forbidden, canActivate: [authGuard] },
  { path: '', redirectTo: '/vols', pathMatch: 'full' }
];
