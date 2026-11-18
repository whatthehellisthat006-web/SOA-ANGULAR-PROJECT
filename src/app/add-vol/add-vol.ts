import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Vol } from '../model/vol.model';
import { Compagnie } from '../model/compagnie.model';
import { VolService } from '../services/vol';

@Component({
  selector: 'app-add-vol',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-vol.html',
  styles: ``,
})
export class AddVol implements OnInit {
  newVol = new Vol();
  compagnies: Compagnie[] = [];
  newIdCompagnie!: number;
  newCompagnie!: Compagnie;
  message: string = '';

  constructor(
    private volService: VolService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.volService.listeCompagnies().subscribe({
      next: cats => {
        console.log(cats);
        this.compagnies = cats._embedded.compagnies;
        if (this.compagnies && this.compagnies.length > 0) {
          this.newIdCompagnie = this.compagnies[0].idCompagnie;
        }
        this.cdr.markForCheck();
      },
      error: err => {
        console.error('Erreur chargement compagnies', err);
      }
    });
  }

  addVol(): void {
    if (!this.compagnies || this.compagnies.length === 0) {
      this.message = 'Erreur : aucune compagnie chargée. Vérifiez le backend.';
      return;
    }
    if (!this.newIdCompagnie) {
      this.message = 'Erreur : veuillez sélectionner une compagnie.';
      return;
    }
    this.newCompagnie = this.compagnies.find(comp => comp.idCompagnie == this.newIdCompagnie)!;
    this.newVol.compagnie = this.newCompagnie;
    if (!this.newVol.idVol) {
      delete (this.newVol as any).idVol;
    }
    this.volService.ajouterVol(this.newVol).subscribe({
      next: vol => {
        console.log(vol);
        this.message = 'Vol ajouté avec succès !';
        this.router.navigate(['/vols']);
      },
      error: err => {
        console.error('Erreur ajout vol', err);
        this.message = "Erreur lors de l'ajout : " + (err.status === 0 ? 'CORS / backend indisponible' : err.message);
        this.cdr.markForCheck();
      }
    });
  }
}
