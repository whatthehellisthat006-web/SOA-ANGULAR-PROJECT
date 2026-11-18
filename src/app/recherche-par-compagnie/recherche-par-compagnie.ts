import { CommonModule, DatePipe } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Vol } from '../model/vol.model';
import { Compagnie } from '../model/compagnie.model';
import { VolService } from '../services/vol';

@Component({
  selector: 'app-recherche-par-compagnie',
  standalone: true,
  imports: [FormsModule, CommonModule, DatePipe],
  templateUrl: './recherche-par-compagnie.html',
  styles: ``,
})
export class RechercheParCompagnie implements OnInit {
  vols: Vol[] = [];
  idCompagnie!: number;
  compagnies: Compagnie[] = [];

  constructor(
    private volService: VolService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.volService.listeCompagnies().subscribe(cats => {
      this.compagnies = cats._embedded.compagnies;
      console.log(cats);
      this.cdr.markForCheck();
    });
  }

  onChange(): void {
    if (this.idCompagnie) {
      this.volService.rechercherParCompagnie(this.idCompagnie).subscribe(vols => {
        console.log(vols);
        this.vols = vols;
        this.cdr.markForCheck();
      });
    } else {
      this.vols = [];
    }
  }
}
