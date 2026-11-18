import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Compagnie } from '../model/compagnie.model';
import { VolService } from '../services/vol';
import { UpdateCompagnie } from '../update-compagnie/update-compagnie';

@Component({
  selector: 'app-liste-compagnies',
  standalone: true,
  imports: [CommonModule, UpdateCompagnie],
  templateUrl: './liste-compagnies.html',
  styles: ``,
})
export class ListeCompagnies implements OnInit {
  compagnies: Compagnie[] = [];
  updatedCompagnie: Compagnie = { idCompagnie: 0, nom: '', description: '' };
  ajout: boolean = true;

  constructor(
    private volService: VolService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.chargerCompagnies();
  }

  chargerCompagnies(): void {
    this.volService.listeCompagnies().subscribe(cats => {
      this.compagnies = cats._embedded.compagnies;
      console.log(cats);
      this.cdr.markForCheck();
    });
  }

  compagnieUpdated(comp: Compagnie): void {
    console.log('Compagnie updated event', comp);
    const obs = this.ajout
      ? this.volService.ajouterCompagnie(comp)
      : this.volService.updateCompagnie(comp);

    obs.subscribe(() => {
      this.chargerCompagnies();
      this.updatedCompagnie = { idCompagnie: 0, nom: '', description: '' };
      this.ajout = true;
      this.cdr.markForCheck();
    });
  }

  updateCompagnie(comp: Compagnie): void {
    this.updatedCompagnie = { ...comp };
    this.ajout = false;
  }
}
