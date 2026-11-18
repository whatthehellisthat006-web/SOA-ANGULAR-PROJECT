import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vol } from '../model/vol.model';
import { Compagnie } from '../model/compagnie.model';
import { CompagnieWrapper } from '../model/compagnie-wrapper.model';
import { environment } from '../../environments/environment';
import { AuthService } from './auth';

@Injectable({
  providedIn: 'root'
})
export class VolService {
  apiURL: string = environment.apiURL;
  apiURLComp: string = environment.apiURLComp;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getAuthHeaders(): HttpHeaders {
    let jwt = this.authService.getToken();
    jwt = 'Bearer ' + jwt;
    return new HttpHeaders({ 'Authorization': jwt });
  }

  listeVols(): Observable<Vol[]> {
    let httpHeaders = this.getAuthHeaders();
    return this.http.get<Vol[]>(this.apiURL + '/all', { headers: httpHeaders });
  }

  ajouterVol(vol: Vol): Observable<Vol> {
    let httpHeaders = this.getAuthHeaders();
    return this.http.post<Vol>(this.apiURL + '/addvol', vol, { headers: httpHeaders });
  }

  supprimerVol(id: number): Observable<void> {
    const url = `${this.apiURL}/delvol/${id}`;
    let httpHeaders = this.getAuthHeaders();
    return this.http.delete<void>(url, { headers: httpHeaders });
  }

  consulterVol(id: number): Observable<Vol> {
    const url = `${this.apiURL}/getbyid/${id}`;
    let httpHeaders = this.getAuthHeaders();
    return this.http.get<Vol>(url, { headers: httpHeaders });
  }

  updateVol(vol: Vol): Observable<Vol> {
    let httpHeaders = this.getAuthHeaders();
    return this.http.put<Vol>(this.apiURL + '/updatevol', vol, { headers: httpHeaders });
  }

  listeCompagnies(): Observable<CompagnieWrapper> {
    let httpHeaders = this.getAuthHeaders();
    return this.http.get<CompagnieWrapper>(this.apiURLComp, { headers: httpHeaders });
  }

  ajouterCompagnie(comp: Compagnie): Observable<Compagnie> {
    const payload: any = { ...comp };
    if (!payload.idCompagnie || payload.idCompagnie === 0) {
      delete payload.idCompagnie;
    }
    let httpHeaders = this.getAuthHeaders();
    return this.http.post<Compagnie>(this.apiURLComp, payload, { headers: httpHeaders });
  }

  updateCompagnie(comp: Compagnie): Observable<Compagnie> {
    const url = `${this.apiURLComp}/${comp.idCompagnie}`;
    let httpHeaders = this.getAuthHeaders();
    return this.http.put<Compagnie>(url, comp, { headers: httpHeaders });
  }

  rechercherParCompagnie(idCompagnie: number): Observable<Vol[]> {
    const url = `${this.apiURL}/volcompagnie/${idCompagnie}`;
    let httpHeaders = this.getAuthHeaders();
    return this.http.get<Vol[]>(url, { headers: httpHeaders });
  }

  rechercherParNumero(numero: string): Observable<Vol[]> {
    const url = `${this.apiURL}/volsByNumero/${encodeURIComponent(numero)}`;
    let httpHeaders = this.getAuthHeaders();
    return this.http.get<Vol[]>(url, { headers: httpHeaders });
  }
}
