import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Vol } from '../model/vol.model';
import { Compagnie } from '../model/compagnie.model';
import { CompagnieWrapper } from '../model/compagnie-wrapper.model';
import { environment } from '../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class VolService {
  private apiURL = environment.apiURL;

  constructor(private http: HttpClient) {}

  listeVols(): Observable<Vol[]> {
    return this.http.get<Vol[]>(this.apiURL);
  }

  ajouterVol(vol: Vol): Observable<Vol> {
    return this.http.post<Vol>(this.apiURL, vol, httpOptions);
  }

  supprimerVol(id: number): Observable<void> {
    const url = `${this.apiURL}/${id}`;
    return this.http.delete<void>(url, httpOptions);
  }

  consulterVol(id: number): Observable<Vol> {
    const url = `${this.apiURL}/${id}`;
    return this.http.get<Vol>(url);
  }

  updateVol(vol: Vol): Observable<Vol> {
    return this.http.put<Vol>(this.apiURL, vol, httpOptions);
  }

  listeCompagnies(): Observable<CompagnieWrapper> {
    return this.http.get<CompagnieWrapper>(environment.apiURLRest + '/comp');
  }

  rechercherParCompagnie(idCompagnie: number): Observable<Vol[]> {
    const url = `${this.apiURL}/volcompagnie/${idCompagnie}`;
    return this.http.get<Vol[]>(url);
  }

  rechercherParNumero(numero: string): Observable<Vol[]> {
    const url = `${this.apiURL}/volsByNumero/${numero}`;
    return this.http.get<Vol[]>(url);
  }

  ajouterCompagnie(comp: Compagnie): Observable<Compagnie> {
    return this.http.post<Compagnie>(environment.apiURLRest + '/comp', comp, httpOptions);
  }
}
