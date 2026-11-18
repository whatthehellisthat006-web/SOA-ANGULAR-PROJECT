import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vol } from '../model/vol.model';
import { VolService } from '../services/vol';
import { SearchFilterPipe } from '../pipes/search-filter-pipe';

@Component({
  selector: 'app-recherche-par-numero',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe, SearchFilterPipe],
  templateUrl: './recherche-par-numero.html',
  styles: ``,
})
export class RechercheParNumero implements OnInit {
  numeroVol!: string;
  vols: Vol[] = [];
  allVols: Vol[] = [];
  searchTerm!: string;

  constructor(
    private volService: VolService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.volService.listeVols().subscribe(vols => {
      console.log(vols);
      this.vols = vols;
      this.allVols = vols;
      this.cdr.markForCheck();
    });
  }

  // 1) Recherche par numero en utilisant l'API (bouton Rechercher)
  rechercherVols() {
    if (this.numeroVol)
      this.volService.rechercherParNumero(this.numeroVol).subscribe(vols => {
        console.log(vols);
        this.vols = vols;
        this.cdr.markForCheck();
      });
    else
      this.volService.listeVols().subscribe(vols => {
        console.log(vols);
        this.vols = vols;
        this.cdr.markForCheck();
      });
  }

  // 2) Recherche par numero en utilisant l'event keyup
  onKeyUp(filterText: string) {
    this.vols = this.allVols.filter(item =>
      (item.numero ?? '').toLowerCase().includes(filterText.toLowerCase()));
  }
}
