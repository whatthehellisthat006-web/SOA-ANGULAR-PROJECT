import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Vol } from '../model/vol.model';
import { Compagnie } from '../model/compagnie.model';
import { VolService } from '../services/vol';

@Component({
  selector: 'app-recherche-par-compagnie',
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './recherche-par-compagnie.html',
  styles: ``,
})
export class RechercheParCompagnie implements OnInit {
  vols!: Vol[];
  idCompagnie!: number;
  compagnies!: Compagnie[];

  constructor(private volService: VolService) {}

  ngOnInit(): void {
    this.volService.listeCompagnies().subscribe(cats => {
      this.compagnies = cats._embedded.compagnies;
      console.log(cats);
    });
  }

  onChange(): void {
    if (this.idCompagnie) {
      this.volService.rechercherParCompagnie(this.idCompagnie).subscribe(vols => {
        this.vols = vols;
      });
    } else {
      this.vols = [];
    }
  }
}
