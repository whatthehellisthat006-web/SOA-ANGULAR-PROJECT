import { Routes } from '@angular/router';
import { Vols } from './vols/vols';
import { AddVol } from './add-vol/add-vol';
import { UpdateVol } from './update-vol/update-vol';
import { RechercheParCompagnie } from './recherche-par-compagnie/recherche-par-compagnie';
import { RechercheParNumero } from './recherche-par-numero/recherche-par-numero';
import { ListeCompagnies } from './liste-compagnies/liste-compagnies';
import { Login } from './login/login';
import { Forbidden } from './forbidden/forbidden';
import { volGuard } from './guard/vol.guard';

export const routes: Routes = [
  { path: 'vols', component: Vols },
  { path: 'add-vol', component: AddVol, canActivate: [volGuard] },
  { path: 'updateVol/:id', component: UpdateVol },
  { path: 'rechercheParCompagnie', component: RechercheParCompagnie },
  { path: 'rechercheParNumero', component: RechercheParNumero },
  { path: 'listeCompagnies', component: ListeCompagnies },
  { path: 'login', component: Login },
  { path: 'app-forbidden', component: Forbidden },
  { path: '', redirectTo: 'vols', pathMatch: 'full' }
];
