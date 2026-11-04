import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Compagnie } from '../model/compagnie.model';
import { VolService } from '../services/vol';
import { UpdateCompagnie } from '../update-compagnie/update-compagnie';

@Component({
  selector: 'app-liste-compagnies',
  imports: [CommonModule, UpdateCompagnie],
  templateUrl: './liste-compagnies.html',
  styles: ``,
})
export class ListeCompagnies implements OnInit {
  compagnies!: Compagnie[];
  updatedCompagnie: Compagnie = { idCompagnie: null!, nom: '', description: '' };
  ajout: boolean = true;

  constructor(private volService: VolService) {}

  ngOnInit(): void {
    this.chargerCompagnies();
  }

  chargerCompagnies(): void {
    this.volService.listeCompagnies().subscribe(cats => {
      this.compagnies = cats._embedded.compagnies;
      console.log(cats);
    });
  }

  compagnieUpdated(comp: Compagnie): void {
    console.log("Compagnie updated event", comp);
    const compagnieToSave = { ...comp };
    if (this.ajout) {
      delete (compagnieToSave as any).idCompagnie;
    }
    this.volService.ajouterCompagnie(compagnieToSave).subscribe(() => {
      this.chargerCompagnies();
      this.updatedCompagnie = { idCompagnie: null!, nom: '', description: '' };
      this.ajout = true;
    });
  }

  updateCompagnie(comp: Compagnie): void {
    this.updatedCompagnie = comp;
    this.ajout = false;
  }
}
